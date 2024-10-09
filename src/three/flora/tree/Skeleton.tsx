import { deg2rad } from '@utils/math';
import Rand from 'rand-seed';
import { ReactNode, useMemo } from 'react';
import { Number, Record, Static } from 'runtypes';
import * as THREE from 'three';
import { SkeletonData } from './SkeletonData';
import { NonEmptyArray } from '@utils/types';
import { SkeletonProvider } from './SkeletonContext';

/* The parameters of a skeleton */
export type SkeletonParameters = Static<typeof SkeletonParameters>;
export const SkeletonParameters = Record({
    /* The number of length segments */
    segmentsLength: Number,
    /* The full height of the bone in world space */
    sizeLength: Number,
});

/* The props of a skeleton */
type SkeletonProps = SkeletonParameters & {
    /* The seed of the generated skeleton */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;

    /* The children */
    children?: ReactNode | ReactNode[];
};

export const Skeleton = (props: SkeletonProps) => {
    /* Clamp parameters */
    const lengthSegments = Math.max(1, props.segmentsLength);
    const lengthSize = Math.max(0.1, props.sizeLength);
    /* Create the skeleton */
    const skeleton = useMemo(() : SkeletonData => {
        // Prepare data
        const lengthStep = lengthSize / lengthSegments;
        const rng = new Rand(`${props.seed}:${props.name}`);
        const joints = new Array(lengthSegments) as NonEmptyArray<THREE.Matrix4Tuple>;
        // Allocate temporary objects
        const tmpMatrix = new THREE.Matrix4();
        const tmpEuler = new THREE.Euler();
        const segmentToObject = new THREE.Matrix4();
        // For each segment
        for (let i = 0; i < lengthSegments; i++) {
            // Apply growth rotation
            tmpEuler.set((rng.next() * 2 - 1) * deg2rad(8), 0,
                         (rng.next() * 2 - 1) * deg2rad(8));
            tmpMatrix.makeRotationFromEuler(tmpEuler);
            segmentToObject.multiply(tmpMatrix);
            // Apply translation
            tmpMatrix.makeTranslation(0, lengthStep, 0);
            segmentToObject.multiply(tmpMatrix);
            // Save this matrix 
            joints[i] = segmentToObject.toArray();
        }
        // Return the skeleton
        return { joints, segmentSize: lengthStep };

    }, [lengthSegments, lengthSize, props.name, props.seed]);
    
    /* Return */
    return (
        <SkeletonProvider skeleton={skeleton}>
            { props.children }
        </SkeletonProvider>
    );
};