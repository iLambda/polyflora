import { deg2rad } from '@utils/math';
import { useMemo } from 'react';
import { Number, Record, Static } from 'runtypes';

import * as THREE from 'three';

/* The grid settings. These are to be serialized */
export type TrunkSettings = Static<typeof TrunkSettings>;
export const TrunkSettings = Record({
    // The number of segments
    segmentsLength: Number,
    segmentsRadius: Number,
    // The size of the trunk
    sizeLength: Number,
    sizeRadius: Number,
});

/* The props */
type TrunkProps = TrunkSettings & {};

/* Return the geometry */
export const Trunk = (props: TrunkProps) => {
    /* Clamp the props */
    const segmentsLength = Math.max(1, props.segmentsLength);
    const segmentsRadius = Math.max(3, props.segmentsRadius);
    const sizeLength = Math.max(0.1, props.sizeLength);
    const sizeRadius = Math.max(0.1, props.sizeRadius);

    /* When size or segments are changed, we recompute it all */
    const geometry = useMemo(() => {
        /* Create the arrays */
        const data = new Array(segmentsLength + 1).fill(0).map(idx => 
                    new Array(idx < segmentsLength ? segmentsRadius : 1) .fill(0).map(_ => 
                    [0, 0, 0] as THREE.Vector3Tuple));
        
        /* Compute the angle step */
        const angleStep = (2 * Math.PI) / segmentsRadius;
        const lengthStep = sizeLength / segmentsLength;
        /* Temporary variables */
        const tmpVec = new THREE.Vector3();
        const tmpMatrix = new THREE.Matrix4();
        /* The current reference frame 
            - translation = ring center 
            - rotation = growth rotation */
        const segmentToWorld = new THREE.Matrix4();
        /* For each segment*/
        for (let l = 0; l < segmentsLength + 1; l++) {
            /* For each segment */
            for (let r = 0; r < segmentsRadius; r++) {
                /* Are we drawing a circle or the endpoint ? */
                const isEndpoint = !(l < segmentsLength);
                if (isEndpoint) {
                    /* In the segment frame coordinates: 
                        - draw each point of the circle 
                        - don't forget to multiply by radius 
                        - TODO : add variability */
                    tmpVec.set(Math.cos(angleStep*r), 0, Math.sin(angleStep*r));
                    tmpVec.multiplyScalar(sizeRadius);
                } else {
                    /* The endpoint */
                    tmpVec.set(0, 0, 0);
                }
                /* Now, use the segment to world matrix to offset/rotate it */
                tmpVec.applyMatrix4(segmentToWorld);
                /* Set it in the data */
                tmpVec.toArray(data[l]![r]!);
                /* If this is the endpoint, we break the loop */
                if (isEndpoint) {
                    break;
                }
            }

            /* Apply a small growth rotation */
            tmpMatrix.identity();
            tmpMatrix.makeRotationFromEuler(new THREE.Euler(
                (Math.random() * 2 - 1) * deg2rad(5), 0, 
                (Math.random() * 2 - 1) * deg2rad(5)));
            segmentToWorld.multiply(tmpMatrix);

            /* Apply our translation */
            tmpMatrix.makeTranslation(0, lengthStep, 0);
            segmentToWorld.multiply(tmpMatrix);
        }

        /* Return the data */
        return data;       

    }, [segmentsLength, segmentsRadius, sizeLength, sizeRadius]);

    return (
        // <boxGeometry args={[10, 10, 10]} />
        <sphereGeometry args={[10, 8, 8]} />
    );
};