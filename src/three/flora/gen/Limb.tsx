import { useLoader } from '@react-three/fiber';
import { useInterleavedBufferAttribute } from '@utils/react/hooks/three';
import { memo, useMemo, useRef } from 'react';
import { Number, Record, Static, String } from 'runtypes';

import * as THREE from 'three';
import { useParentSkeleton } from './SkeletonContext';
import { SkeletonData } from './SkeletonData';
import { Line } from '@react-three/drei';

/* The parameters for generating a specific limb */
export type LimbParameters = Static<typeof LimbParameters>;
export const LimbParameters = Record({
    // The number of segments
    segmentsRadius: Number,
    // The size of the limb
    sizeRadius: Number,
    // The UV tiling
    tilingU: Number,
    tilingV: Number,
    // The curvature of the limb
    curvature: Number,
    // The material data
    textureURL: String,
});
/* The props */
export type LimbProps = LimbParameters & {
    shading: 'shaded' | 'wireframe' | 'skeletal';
};

/* Buffer sizes and strides */
const BUFFER_SIZE_XYZ = 3;
const BUFFER_SIZE_NOR = 3;
const BUFFER_SIZE_UV = 2;
const BUFFER_STRIDE = BUFFER_SIZE_XYZ + BUFFER_SIZE_NOR + BUFFER_SIZE_UV;
const BUFFER_OFFSET_XYZ = 0;
const BUFFER_OFFSET_NOR = BUFFER_OFFSET_XYZ + BUFFER_SIZE_XYZ;
const BUFFER_OFFSET_UV = BUFFER_OFFSET_NOR + BUFFER_SIZE_NOR;

/* Helper */
// eslint-disable-next-line react-refresh/only-export-components
export const calculateRadiusForJoint = (segment: number, nSegments: number, curvature: number) =>
    Math.pow(1.0 - (segment / nSegments), curvature);

/* Return the geometry */
export const Limb = memo((props: LimbProps) => {

    /* Get the skeleton */
    const skeleton = useParentSkeleton();
    if (!skeleton) { 
        throw new Error('No parent skeleton was found. Try adding a <Skeleton/> or a <SkeletonProvider />'); 
    }
    
    /* Get the texture */
    const colorMap = useLoader(THREE.TextureLoader, props.textureURL);
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    
    /* Clamp the props */
    const segmentsLength = SkeletonData.getNSegments(skeleton);
    const segmentsRadius = Math.max(3, props.segmentsRadius);
    const sizeRadius = Math.max(0.01, props.sizeRadius);
    const curvature = Math.max(0.01, props.curvature);

    /* Reallocate indices only if size changed */
    const nTris = segmentsLength * segmentsRadius * 2;
    const ALLOC_TRIS_INCREMENTS = 32;
    const allocTris = Math.ceil(nTris / ALLOC_TRIS_INCREMENTS) * ALLOC_TRIS_INCREMENTS; 
    const indexBuffer = useMemo(() => new Uint16Array(allocTris * 3), [allocTris]);
    const indexBufferDirtyRef = useRef(false);
    
    /* Generate the index list */
    const indices = useMemo(() => {
        /* First, fill all the full segments */
        for (let l = 0; l < segmentsLength; l++) {
            for (let r = 0; r < segmentsRadius; r++) {
                /* Compute current tri number */
                const quadIdx = (l * segmentsRadius) + r;
                /* Setup first triangle */
                indexBuffer[6 * quadIdx + 0] = (l * (segmentsRadius + 1))       + r;
                indexBuffer[6 * quadIdx + 1] = ((l + 1) * (segmentsRadius + 1)) + r;
                indexBuffer[6 * quadIdx + 2] = (l * (segmentsRadius + 1))       + ((r + 1) % (segmentsRadius + 1));
                /* Setup second triangle */
                indexBuffer[6 * quadIdx + 3] = (l * (segmentsRadius + 1))       + ((r + 1) % (segmentsRadius + 1));
                indexBuffer[6 * quadIdx + 4] = ((l + 1) * (segmentsRadius + 1)) + r;
                indexBuffer[6 * quadIdx + 5] = ((l + 1) * (segmentsRadius + 1)) + ((r + 1) % (segmentsRadius + 1));
            }
        }
        /* Mark dirty */
        indexBufferDirtyRef.current = true;
        /* Done */
        return indexBuffer;
    }, [segmentsLength, segmentsRadius, indexBuffer]);

    /* Reallocate buffer only if size changed */
    const nVertices = (segmentsLength + 1) * (segmentsRadius + 1);
    const ALLOC_VERT_INCREMENTS = 32;
    const allocVertices = Math.ceil(nVertices / ALLOC_VERT_INCREMENTS) * ALLOC_VERT_INCREMENTS; 
    const buffer = useMemo(() => new Float32Array(allocVertices * BUFFER_STRIDE), [allocVertices]);
    
    /* Recompute contents only if needed */
    const bufferDirtyRef = useRef(false);
    const geometryData = useMemo(() => {
        /* Compute the angle step */
        const angleStep = (2 * Math.PI) / segmentsRadius;
        /* Temporary variables */
        const tmpXYZ = new THREE.Vector3();
        const tmpNOR = new THREE.Vector3();
        const tmpUV = new THREE.Vector2();
        const tmpMatrixRot = new THREE.Matrix3();
        /* The current reference frame 
            - translation = ring center 
            - rotation = growth rotation */
        const segmentToObject = new THREE.Matrix4();
        /* For each segment*/
        for (let l = 0; l < segmentsLength + 1; l++) {
            /* For each point along the radius */
            for (let r = 0; r < segmentsRadius + 1; r++) {
                /* Plot a circle if not at endpoint */
                if (l < segmentsLength) {
                    // Local position & normal
                    tmpXYZ.set(Math.cos(angleStep*r), 0, Math.sin(angleStep*r));
                    tmpNOR.copy(tmpXYZ);
                    // Scale positition by the falloff-ed radius
                    tmpXYZ.multiplyScalar(sizeRadius * calculateRadiusForJoint(l, segmentsLength, curvature));
                }
                else {
                    // Local position & normal
                    tmpXYZ.set(0, 0, 0);
                    tmpNOR.set(0, 1, 0);
                }
                /* Convert local position to world space */
                tmpXYZ.applyMatrix4(segmentToObject);
                /* Convert local vertex to object space */
                tmpMatrixRot.setFromMatrix4(segmentToObject);
                tmpNOR.applyNormalMatrix(tmpMatrixRot);
                /* Fill UVs */
                tmpUV.set(props.tilingV * (l / segmentsLength), props.tilingU * (r / segmentsRadius));
                /* Fill buffer */
                const vertIdx = (l * (segmentsRadius + 1)) + r;
                tmpXYZ.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_XYZ);
                tmpNOR.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_NOR);
                tmpUV.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_UV);
            }
            /* Get next rotation (break if we are on tip of skeleton) */
            if (l < segmentsLength) { 
                segmentToObject.fromArray(skeleton.joints[l]!);
            }
        }
        /* Recomputed ; we are dirty */
        bufferDirtyRef.current = true;
        /* Return the data */
        return buffer;
    }, [buffer, skeleton.joints, segmentsLength, segmentsRadius, sizeRadius, curvature, props.tilingU, props.tilingV]);

    /* Make the interleaved buffer and mark it dirty */
    const interleavedBuffer = useMemo(() => new THREE.InterleavedBuffer(geometryData, BUFFER_STRIDE), [geometryData]);
    interleavedBuffer.count = nVertices;
    interleavedBuffer.needsUpdate ||= bufferDirtyRef.current;

    /* Make the geometry 
        NOTE : (cf https://github.com/mrdoob/three.js/issues/20933)
        ThreeJS is weird if the indices buffer gets changed, especially wrt wireframes.
        Technically it works all ok, but wireframe data breaks. We would wish to not have to reallocate 
        a whole geometry, but since the official solution is preallocate an array large enough (lol), we
        deal with it by preallocating large enough arrays in chunks, and recreating if needed.
    
    */
    // Try update index buffer attribute
    const indexBufferAttribute = useMemo(() => new THREE.BufferAttribute(indices, 1), [indices]);
    indexBufferAttribute.needsUpdate ||= indexBufferDirtyRef.current;
    // Make actual geom
    const geometry = useMemo(() => (new THREE.BufferGeometry()).setIndex(indexBufferAttribute), [indexBufferAttribute]);
    geometry.setAttribute('position', useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_XYZ, BUFFER_OFFSET_XYZ, bufferDirtyRef.current));
    geometry.setAttribute('normal',   useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_NOR, BUFFER_OFFSET_NOR, bufferDirtyRef.current));
    geometry.setAttribute('uv',       useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_UV,  BUFFER_OFFSET_UV, bufferDirtyRef.current));
    geometry.setDrawRange(0, 3 * nTris);
    
    /* Clear dirty flag */
    bufferDirtyRef.current = false;
    indexBufferDirtyRef.current = false;
    
    /* Make the list of points to draw the skeleton */
    const jointCenters = useMemo(() => SkeletonData.centers(skeleton), [skeleton]);
    const lineData = useMemo(() => 
        jointCenters.flatMap((center, i) => i === 0 ? [] : [jointCenters[i - 1]!, center]  )
    , [jointCenters]);
    
    /* Return object */
    return (
        <>
            <mesh geometry={geometry} visible={props.shading === 'shaded'}>
                <meshLambertMaterial map={colorMap} />
            </mesh>
            <mesh geometry={geometry} visible={props.shading === 'wireframe'}>
                <meshBasicMaterial color='white' wireframe />
            </mesh>
            <Line 
                visible={props.shading === 'skeletal'}
                points={lineData}
                color='white'
                lineWidth={2}
            />
        </>
    );
});