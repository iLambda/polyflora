import Rand from 'rand-seed';
import { memo, ReactNode, useMemo } from 'react';
import { Literal, Number, Record, Static, Union } from 'runtypes';
import * as THREE from 'three';
import { SkeletonData } from './SkeletonData';
import { assertExhaustive, NonEmptyArray } from '@utils/types';
import { SkeletonProvider } from './SkeletonContext';
import { deg2rad } from '@utils/math';

/* The parameters of a skeleton */
export type SkeletonParameters = Static<typeof SkeletonParameters>;
export const SkeletonParameters = Record({
    /* The number of length segments */
    segmentsLength: Number,
    /* The full height of the bone in world space */
    sizeLength: Number,

    /* The minimul crinkling angle of a branch */
    crinklingMin: Number,
    /* The minimul crinkling angle of a branch */
    crinklingMax: Number,

    /* The bend direction */
    bendDirection: Union(Literal('up'), Literal('down'), Literal('normal')),
    /* The bend amount */
    bendAmount: Number,
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

const randSymmetrical = (rng: Rand, min: number, max: number) => {
    const rand = rng.next() * 2 - 1;
    return (min + (max - min) * Math.abs(rand)) * Math.sign(rand);
};

export const Skeleton = memo((props: SkeletonProps) => {
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
            // Apply bending
            switch(props.bendDirection) {
                // normal
                case 'normal': {
                    tmpEuler.set(0, 0, deg2rad(props.bendAmount / lengthSegments));
                    tmpMatrix.makeRotationFromEuler(tmpEuler);
                    segmentToObject.multiply(tmpMatrix);
                    break;
                }

                // up
                case 'up': {
                    if (i === 0) {
                        tmpEuler.set(0, 0, -deg2rad(props.bendAmount));
                    } else {
                        tmpEuler.set(0, 0, deg2rad(props.bendAmount / lengthSegments));
                    }

                    tmpMatrix.makeRotationFromEuler(tmpEuler);
                    segmentToObject.multiply(tmpMatrix);
                    break;
                }
                // down
                case 'down': {
                    if (i === 0) {
                        tmpEuler.set(0, 0, deg2rad(props.bendAmount));
                    } else {
                        tmpEuler.set(0, 0, deg2rad(props.bendAmount / lengthSegments));
                    }

                    tmpMatrix.makeRotationFromEuler(tmpEuler);
                    segmentToObject.multiply(tmpMatrix);
                    break;
                }

                // exhaustive
                default: assertExhaustive(props.bendDirection);

            }
            // Apply growth rotation
            tmpEuler.set(randSymmetrical(rng, deg2rad(props.crinklingMin), deg2rad(props.crinklingMax)), 0,
                         randSymmetrical(rng, deg2rad(props.crinklingMin), deg2rad(props.crinklingMax)));
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

    }, [lengthSegments, lengthSize, props.name, props.seed, props.crinklingMin, props.crinklingMax, props.bendAmount, props.bendDirection]);
    
    /* Return */
    return (
        <SkeletonProvider skeleton={skeleton}>
            { props.children }
        </SkeletonProvider>
    );
});