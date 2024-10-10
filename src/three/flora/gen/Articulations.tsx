import { Literal, Number, Record, Static } from 'runtypes';
import { useParentSkeleton } from './SkeletonContext';
import { memo, ReactNode, useMemo } from 'react';

import * as THREE from 'three';
import { SkeletonData } from './SkeletonData';
import Rand, { PRNG } from 'rand-seed';
import { Triplet } from '@utils/types';
import { deg2rad } from '@utils/math';
    
export type ArticulationsParameters = Static<typeof ArticulationsParameters>;
export const ArticulationsParameters = Record({
    // The distribution we use
    distribution: Literal('random'),
    // The minimum angle variation of the distribution
    minAngle: Number,
    // The maximum angle of the distribution
    maxAngle: Number,
    // The minimum position of the distribution
    minPosition: Number,
    // The maximum positionof the distribution
    maxPosition: Number,

    // The number of branches we want to spawn
    nArticulations: Number,
});

type BranchChildren = ((data: [distanceAlong: number, radius: number], index: number) => ReactNode);
export type ArticulationsProps = ArticulationsParameters & {
    /* The seed of the generated skeleton */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;
    
    // The curvature of the parent trunk
    parentLimbCurvature: number;
    // The base radius of the parent trunk
    parentLimbBaseRadius: number;

    /* The children */
    children?: ReactNode | ReactNode[] | BranchChildren;
};


export const Articulations = memo((props: ArticulationsProps) => {
    /* Get the skeleton */
    const skeleton = useParentSkeleton();
    if (!skeleton) { 
        throw new Error('No parent skeleton was found. Try adding a <Skeleton/> or a <SkeletonProvider />'); 
    }

    /* Prepare the data */
    const minPosition = THREE.MathUtils.clamp(props.minPosition, 0, 1);
    const maxPosition = THREE.MathUtils.clamp(props.maxPosition, 0, 1);
    const minAngle = THREE.MathUtils.clamp(props.minAngle, 0, 180);
    const maxAngle = THREE.MathUtils.clamp(props.maxAngle, 0, 180);
    const baseSeed = `${props.seed}:${props.name}`;
    const nArticulations = Math.max(0, props.nArticulations);
    
    /* Compute all the normalized coordinates */
    const randomCoords = useMemo(() => {
        // Allocate temporary data 
        const rng = new Rand(`${baseSeed}`, PRNG.mulberry32);
        const coords = new Array<Triplet<number>>(nArticulations);
        // Compute coords
        for (let i = 0; i < nArticulations; i++) {
            coords[i] = [
                // The position coordinate
                // i / (nArticulations - 1),
                ((maxPosition - minPosition) * rng.next()) + minPosition,
                // The azimutal angle coordinate
                2.0 * Math.PI * rng.next(),
                // The altitude angle coordinate
                rng.next() * deg2rad(maxAngle - minAngle) + deg2rad(minAngle),
            ];
        }
        // Return coords
        return coords;
    }, [baseSeed, nArticulations, minPosition, maxPosition, minAngle, maxAngle]);

    /* Then compute the final positions/rotations */
    const worldCoordinates = useMemo(() => SkeletonData.along(skeleton, randomCoords, props.parentLimbCurvature), [skeleton, randomCoords, props.parentLimbCurvature]);
    const children = props.children;
    const nodes = useMemo(() => {
        const array = new Array<ReactNode>(worldCoordinates.length);
        for (let i = 0; i < worldCoordinates.length; i++) {
            /* Get initial data */
            const [pos, rot, curvilinearLength, radius] = worldCoordinates[i]!;
            /* Create it all */
            array[i] = (
                <group position={pos} quaternion={rot} key={i}>
                    { 
                        typeof children === 'function'
                            ? children([curvilinearLength, props.parentLimbBaseRadius * radius], i)
                            : children
                    }
                </group>
            );
        }
        return array;
    }, [children, props.parentLimbBaseRadius, worldCoordinates]);
    
    /* Return the node */
    return nodes;
});