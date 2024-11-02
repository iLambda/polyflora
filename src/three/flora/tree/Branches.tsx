import { ReactNode } from 'react';
import { Array, Literal, Number, Static, Union } from 'runtypes';
import { Articulations, ArticulationsParameters } from '../gen/Articulations';
import { Skeleton } from '../gen/Skeleton';
import { Limb, LimbProps } from '../gen/Limb';
import Rand from 'rand-seed';
import { Cross, CrossDirection } from '../gen/Cross';
import { Layers } from 'three';

export type BranchesParameters = Static<typeof BranchesParameters>;
export const BranchesParameters = ArticulationsParameters.extend({
    /* The number of length segments */
    segmentsLength: Number,
    /* The number of length segments */
    segmentsRadius: Number,

    /* The curvature of the limbs */
    curvature: Number,
    /* The minimul crinkling angle of a branch */
    crinklingMin: Number,
    /* The minimul crinkling angle of a branch */
    crinklingMax: Number,

    /* The min length of a branch (in %) */
    minLength: Number,
    /* The max length of a branch (in %) */
    maxLength: Number,
    /* The min radius of a branch (in %) */
    minRadius: Number,
    /* The min radius of a branch (in %) */
    maxRadius: Number,
    /* The min width of a cross geometry plane (in %) */
    minCrossWidth: Number,
    /* The max width of a cross geometry plane (in %) */
    maxCrossWidth: Number,

    /* The bend direction */
    bendDirection: Union(Literal('up'), Literal('down'), Literal('normal')),
    /* The bend amount */
    bendAmount: Number,
    
    /* The mode of geometry rendering */
    geometryMode: Array(Union(Literal('detailed'), Literal('cross-x'), Literal('cross-y'))),
});

export type BranchesProps = BranchesParameters & {
    /* The seed of the generated skeleton */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;

    /* The curvature of the parent trunk */
    parentLimbCurvature: number;
    /* The base radius of the parent trunk */
    parentLimbBaseRadius: number;
    /* The base length of the parent trunk */
    referenceLength: number;

    /* The texture used for branches */
    textureBranchURL: string;
    /* The texture used for bark */
    textureBarkURL : string;
    
    /* The UV bark tiling */
    tilingBarkU: number,
    /* The UV bark tiling */
    tilingBarkV: number,
    
    /* The UV cross tiling */
    tilingCrossU: number,
    /* The UV cross tiling */
    tilingCrossV: number,

    /* The layers */
    layers?: Layers;

    /* The shading used */
    shading: LimbProps['shading'];
    
    /* The children */
    children?: ReactNode | ReactNode[] | BranchChildrenCallback;
};
type BranchChildrenCallback = (index: number) => ReactNode;

const rngFromTo = (rng: Rand, from: number, to: number) => Math.abs(to - from) * rng.next() + Math.min(from, to);

export const Branches = (props: BranchesProps) => {
    // Return node 
    return (
        <Articulations 
            distribution='random'
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
            {([_, radius], branchId) => {
                // Create rng object
                const rng = new Rand(`${props.seed}:${props.name}:${branchId}`);
                const skeletonSizeLength = props.referenceLength * rngFromTo(rng, props.minLength, props.maxLength);
                // Return node
                return (
                    <group key={branchId}>
                        {/* <JointReferenceFrame radius={radius} /> */}
                        <Skeleton
                            bendAmount={props.bendAmount}
                            bendDirection={props.bendDirection}
                            crinklingMin={props.crinklingMin}
                            crinklingMax={props.crinklingMax}
                            segmentsLength={props.segmentsLength}
                            sizeLength={skeletonSizeLength}
                            seed={props.seed}
                            name={`${props.name}:${branchId}`}
                        >
                            {/* Check if limb or cross */}
                            {
                                props.geometryMode.includes('detailed') 
                                && (<Limb 
                                        curvature={props.curvature}
                                        layers={props.layers}
                                        shading={props.shading}
                                        segmentsRadius={props.segmentsRadius}
                                        sizeRadius={radius * rngFromTo(rng, props.minRadius, props.maxRadius)}
                                        tilingU={props.tilingBarkU}
                                        tilingV={props.tilingBarkV}
                                        textureURL={props.textureBarkURL}
                                    />)
                            }
                            {
                                (props.geometryMode.includes('cross-x') || props.geometryMode.includes('cross-y'))
                                && (<Cross 
                                        layers={props.layers}
                                        shading={props.shading}
                                        textureURL={props.textureBranchURL}
                                        crossMode='quad'
                                        crossPlanes={
                                              (props.geometryMode.includes('cross-x') ? CrossDirection.CROSS_HORIZONTAL : 0)
                                            | (props.geometryMode.includes('cross-y') ? CrossDirection.CROSS_VERTICAL : 0)
                                        }
                                        tilingU={props.tilingCrossU}
                                        tilingV={props.tilingCrossV}
                                        width={skeletonSizeLength * rngFromTo(rng, props.minCrossWidth, props.maxCrossWidth)}
                                    />)
                            }
                            { 
                                typeof props.children === 'function'
                                    ? props.children(branchId)
                                    : props.children
                            }
                        </Skeleton>
                    </group>
                );
            }}
        </Articulations>
    );
};