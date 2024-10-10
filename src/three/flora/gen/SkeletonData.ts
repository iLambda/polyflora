import { NonEmptyReadonlyArray, Pair } from '@utils/types';
import * as THREE from 'three';
import { calculateRadiusForJoint } from './Limb';

/* The data contained in a skeleton */
export type SkeletonData = {
    // The joints rotation data
    joints: NonEmptyReadonlyArray<THREE.Matrix4Tuple>;
    // The size of each segment
    segmentSize: number;
};

/* A few helpers for skeleton data */
export const SkeletonData = {
    /* Get the number of segments in the skeleton */
    getNSegments: (data: SkeletonData) : number => data.joints.length,
    /* Get the length of a segment */
    getSizeSegment: (data: SkeletonData) : number => data.segmentSize,
    /* Get the total length */
    getSizeTotal: (data: SkeletonData) : number => data.joints.length * data.segmentSize,

    /* Get the center of each joint (including the origin !) */
    centers: (data: SkeletonData) : THREE.Vector3Tuple[] => {
        // Allocate array
        const array = new Array<THREE.Vector3Tuple>(data.joints.length + 1);
        // Prepare temp objects
        const tmpVec = new THREE.Vector3();
        const tmpMat = new THREE.Matrix4();
        // Go through each element
        array[0] = [0, 0, 0];
        for (let i = 0; i < data.joints.length; i++) {
            // Setup mat
            tmpMat.fromArray(data.joints[i]!);
            tmpVec.set(0, 0, 0);
            tmpVec.applyMatrix4(tmpMat);
            // Save result
            array[i + 1] = [tmpVec.x, tmpVec.y, tmpVec.z];
        }
        // Return
        return array;
    },
    
    /* Get positions and reference axes along skeleton using normalized coordinates */
    along: (data: SkeletonData, ts: [position: number, azimutalAngle: number, altitudeAngle: number][], curvature: number) 
                : [position: THREE.Vector3Tuple, orientation: THREE.QuaternionTuple, curvilinearLength: number, parentRadius: number][] => 
    {
        // If empty, return empty
        if (ts.length === 0) { return []; }
        // Go through all parameters and multiply by nsegments
        const clampedTs = ts.map(([t, _]) => THREE.MathUtils.clamp(t, 0, 1));
        const coords = clampedTs.map((t) : Pair<number> => {
            // The joint id is given by the integer part, and the 
            // along joint percent is given by the fractional part
            const jointIdx = Math.floor(t * data.joints.length);
            const alongJointPercent = (t * data.joints.length) % 1;
            // We need to be careful if we obtained 1 in normalized coordinates; 
            // instead of seeing it as (data.joints.length, 0), 
            // we see it as (data.joints.length - 1, 1)
            return jointIdx === data.joints.length 
                ? [data.joints.length - 1, 1]
                : [jointIdx, alongJointPercent]; 
        });
        // Then, find the matrices and do our thing 
        const upAxis =  {x:0, y:1, z:0};
        const fwdAxis = {x:0, y:0, z:1};
        const tmpMat = new THREE.Matrix4();
        const tmpXYZ = new THREE.Vector3();
        const tmpQuat = new THREE.Quaternion();
        const tmpQuatRot = new THREE.Quaternion();
        return coords.map(([jointIdx, alongJointPercent], i) => {
            // Compute the position 
            const yPos = (1.0 - alongJointPercent) * data.segmentSize;
            // Compute the position in local ref
            tmpMat.fromArray(data.joints[jointIdx]!);
            tmpXYZ.set(0, -yPos, 0);
            tmpXYZ.applyMatrix4(tmpMat);
            // Compute the rotation in local ref 
            tmpQuat.setFromRotationMatrix(tmpMat);
            tmpQuatRot.setFromAxisAngle(upAxis, ts[i]![1]);
            tmpQuat.multiply(tmpQuatRot);
            // Then put Z forward
            tmpQuatRot.setFromAxisAngle(fwdAxis, ts[i]![2]);
            tmpQuat.multiply(tmpQuatRot);
            // Compute radius in local ref
            const startRadius = calculateRadiusForJoint(jointIdx, data.joints.length, curvature);
            const endRadius = calculateRadiusForJoint(jointIdx + 1, data.joints.length, curvature);
            const radius = THREE.MathUtils.lerp(startRadius, endRadius, alongJointPercent);
            
            // Return
            return [tmpXYZ.toArray(), tmpQuat.toArray(), clampedTs[i]! * data.segmentSize, radius] as const;
            
        });
    },

};