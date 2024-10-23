import { createInstances, useTexture } from '@react-three/drei';
import { Articulations, ArticulationsParameters } from '@three/flora/gen/Articulations';
import { LimbProps } from '@three/flora/gen/Limb';
import { useConstantWithInit } from '@utils/react/hooks/refs';
import { useReactiveRef } from '@utils/react/hooks/state';
import Rand from 'rand-seed';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Array, Literal, Number, Static, String, Union } from 'runtypes';
import * as THREE from 'three';

export type LeavesParameters = Static<typeof LeavesParameters>;
const LeavesParameters = ArticulationsParameters.extend({
    /* The texture pivot U coord */
    texturePivotU: Number,
    /* The texture pivot V coord */
    texturePivotV: Number,
    /* The texture used for leaves */
    textureURL : String,

    /* The base size X */
    sizeWidth: Number,
    /* The base size Y */
    sizeHeight: Number,

    /* The plane subdivision */
    // subdivisions: Number,
    /* The bending of the plane */
    // bendX: Number,
    /* The bending of the plane */
    // bendY: Number,

    /* The space in which the rotations happen */
    orientationSpace: Union(Literal('local'), Literal('world')),

    /* The color palette */
    palette: Array(String),

});

export type LeavesProps = LeavesParameters & {
    /* The seed of the generated leaves */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;
    
    /* The curvature of the parent limb */
    parentLimbCurvature: number;
    /* The base radius of the parent limb */
    parentLimbBaseRadius: number;
    
    /* The shading used */
    shading: LimbProps['shading'];
};

const ParentRotationMode = (props: { children?: ReactNode | ReactNode[], orientationSpace: LeavesParameters['orientationSpace'] }) => {
    // Make state
    const [groupRef, group] = useReactiveRef<THREE.Group>();
    const [quaternion, setQuaternion] = useState<THREE.Quaternion>(() => new THREE.Quaternion());
    // Set parent world rotation
    useEffect(() => {
        if (!group) { return; }
        if (!group.parent) { return; }
        
        const parentInvQuat = new THREE.Quaternion();
        group.parent.getWorldQuaternion(parentInvQuat);
        parentInvQuat.invert();
        setQuaternion(parentInvQuat);
    }, [group]);

    // Get default identity
    const quatIdentity = useConstantWithInit(() => new THREE.Quaternion().identity());
    // Return component
    return (
        <group ref={groupRef} quaternion={props.orientationSpace === 'world' ? quaternion : quatIdentity}>
            { props.children }
        </group>
    );
};

export const Leaves = (props: LeavesProps) => {
    // Create the leaves instances we use in this node
    const [LeafInstances, Leaf] = useConstantWithInit(() => createInstances()); 
    // Get the texture and a few refs
    const texture = useTexture(props.textureURL);
    const meshRef = useRef<THREE.InstancedMesh | null>(null);

    // Return node
    return (
        <LeafInstances ref={meshRef}>
            <meshLambertMaterial 
                map={texture} 
                side={THREE.DoubleSide}
                alphaTest={0.5}
            />
            <planeGeometry 
                args={[props.sizeWidth, props.sizeHeight]} 
            />
            <Articulations 
                distribution={props.distribution}
                minAngle={props.minAngle}
                maxAngle={props.maxAngle}
                minPosition={props.minPosition}
                maxPosition={props.maxPosition}
                nArticulations={props.nArticulations}
                parentLimbCurvature={props.parentLimbCurvature}
                parentLimbBaseRadius={props.parentLimbBaseRadius}
                seed={props.seed}
                name={props.name}
            >
                {([_distanceAlong, _radius], branchId) => {
                    // Create rng object and references 
                    const rng = new Rand(`${props.seed}:${props.name}:${branchId}`);
                    // Compute attributes
                    const colorID = Math.floor(props.palette.length * rng.next()) % props.palette.length;
                    // Return the instance 
                    return (
                        <ParentRotationMode key={branchId} orientationSpace={props.orientationSpace}>
                            <Leaf
                                color={props.palette[colorID]}
                                
                                rotation={[Math.PI/2, 0, 0]}
                                // position={[
                                //     props.texturePivotV * props.sizeHeight, 0, 
                                //     props.texturePivotU * props.sizeWidth,
                                // ]}

                            />
                        </ParentRotationMode>
                        /* <JointReferenceFrame 
                            key={branchID} 
                            radius={_radius + 0.25} 
                        /> */
                    );
                }}
            </Articulations>
        </LeafInstances>
    );
};