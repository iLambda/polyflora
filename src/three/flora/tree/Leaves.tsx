import { createInstances, useTexture } from '@react-three/drei';
import { Articulations, ArticulationsParameters } from '@three/flora/gen/Articulations';
import { LimbProps } from '@three/flora/gen/Limb';
import { useConstantWithInit } from '@utils/react/hooks/refs';
import Rand from 'rand-seed';
import { Array, Number, Static, String } from 'runtypes';
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

    /* The plane subdivision */
    // subdivisions: Number,
    /* The bending of the plane */
    // bendX: Number,
    /* The bending of the plane */
    // bendY: Number,

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

export const Leaves = (props: LeavesProps) => {
    // Create the leaves instances we use in this node
    const [LeafInstances, Leaf] = useConstantWithInit(() => createInstances()); 
    // Get the texture
    const texture = useTexture(props.textureURL);

    // Return node
    return (
        <LeafInstances>
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
                    // Create rng object
                    const rng = new Rand(`${props.seed}:${props.name}:${branchId}`);
                    // Compute attributes
                    const colorID = Math.floor(props.palette.length * rng.next()) % props.palette.length;
                    // Return the instance 
                    return (
                        <Leaf
                            key={branchId}
                            color={props.palette[colorID]}
                            rotation={[Math.PI/2, 0, 0]}
                            position={[
                                props.texturePivotV * props.sizeHeight, 0, 
                                props.texturePivotU * props.sizeWidth,
                            ]}

                        />
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