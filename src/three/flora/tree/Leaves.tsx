import { createInstances, useTexture } from '@react-three/drei';
import { Articulations, ArticulationsParameters } from '@three/flora/gen/Articulations';
import { LimbProps } from '@three/flora/gen/Limb';
import { useConstantWithInit } from '@utils/react/hooks/refs';
import { useReactiveRef } from '@utils/react/hooks/state';
import Rand from 'rand-seed';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Array, Literal, Number, Static, String, Union } from 'runtypes';
import * as THREE from 'three';

export type LeavesParameters = Static<typeof LeavesParameters>;
export const LeavesParameters = ArticulationsParameters.extend({
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
    /* The size variation (min) */
    minSize: Number,
    /* The size variation (max) */
    maxSize: Number,


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

export type LeavesProps = Omit<LeavesParameters, 'palette'> & {
    /* The seed of the generated leaves */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;
    
    /* The curvature of the parent limb */
    parentLimbCurvature: number;
    /* The base radius of the parent lim b */
    parentLimbBaseRadius: number;
    
    /* The shading used */
    shading: LimbProps['shading'];
    /* The color palette */
    palette: readonly string[];
    
    /* The layers */
    layers?: THREE.Layers;
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

const rngFromTo = (rng: Rand, from: number, to: number) => Math.abs(to - from) * rng.next() + Math.min(from, to);

export const Leaves = (props: LeavesProps) => {
    /* Create the leaves instances we use in this node */
    const [LeafInstances, Leaf] = useConstantWithInit(() => createInstances()); 
    /* Get the texture and a few refs */
    const texture = useTexture(props.textureURL);
    const meshRef = useRef<THREE.InstancedMesh | null>(null);

    /* Modify the shader to use the absolute value of the normal */
    const onBeforeCompile = useCallback((parameters: THREE.WebGLProgramParametersWithUniforms) => {
        parameters.fragmentShader = parameters.fragmentShader.replace(
            // Inject ourself in the lambert lighting calculation
            `#include <lights_lambert_pars_fragment>`, 
            // ... and take the absolute value during irradience calc, so normal orientation is ignored
            `#include <lights_lambert_pars_fragment>

            void RE_Direct_Lambert_Foliage( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

                float dotNL = saturate( abs(dot( geometryNormal, directLight.direction )) );
                vec3 irradiance = dotNL * directLight.color;

                reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

            }
            #undef  RE_Direct
            #define RE_Direct				RE_Direct_Lambert_Foliage`,
        );
    }, []);

    // Return node
    return (
        <LeafInstances ref={meshRef} castShadow receiveShadow layers={props.layers}>
            <meshLambertMaterial 
                map={texture} 
                side={THREE.DoubleSide}
                alphaTest={0.5}
                onBeforeCompile={onBeforeCompile}
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
                    const scale = rngFromTo(rng, props.minSize, props.maxSize);
                    // Return the instance 
                    return (
                        <ParentRotationMode key={branchId} orientationSpace={props.orientationSpace}>
                            <Leaf
                                color={props.palette[colorID]}
                                rotation={[Math.PI/2, 0, 0]}
                                position={[
                                    ((1 - props.texturePivotU) - 0.5) * props.sizeWidth * scale,
                                    0,
                                    -(props.texturePivotV - 0.5) * props.sizeHeight * scale,
                                ]}
                                scale={scale}
                            />
                        </ParentRotationMode>
                    );
                }}
            </Articulations>
        </LeafInstances>
    );
};