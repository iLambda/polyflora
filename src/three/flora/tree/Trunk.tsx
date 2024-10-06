import { deg2rad } from '@utils/math';
import { useInstance } from '@utils/react/hooks/refs';
import { useMemo, useRef } from 'react';
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

/* Buffer sizes and strides */
const BUFFER_SIZE_XYZ = 3;
const BUFFER_SIZE_UV = 2;
const BUFFER_STRIDE = BUFFER_SIZE_XYZ + BUFFER_SIZE_UV;
const BUFFER_OFFSET_XYZ = 0;
const BUFFER_OFFSET_UV = BUFFER_SIZE_XYZ;

/* Return the geometry */
export const Trunk = (props: TrunkProps) => {
    /* Clamp the props */
    const segmentsLength = Math.max(1, props.segmentsLength);
    const segmentsRadius = Math.max(3, props.segmentsRadius);
    const sizeLength = Math.max(0.1, props.sizeLength);
    const sizeRadius = Math.max(0.01, props.sizeRadius);

    /* Generate the index list */
    const indices = useMemo(() => {
        /* Compute number of triangles */
        const trisSegmentPointy = segmentsRadius;
        const trisSegmentsFull = (segmentsLength - 1) * segmentsRadius * 2;
        const nTris = trisSegmentPointy + trisSegmentsFull;
        /* Preallocate indices array */
        const indices = new Array<number>(3 * nTris).fill(0);
        /* First, fill all the full segments */
        for (let l = 0; l < segmentsLength - 1; l++) {
            for (let r = 0; r < segmentsRadius; r++) {
                /* Compute current vertex number */
                const vertIdx = (l * segmentsRadius) + r;
                /* Setup first triangle */
                indices[6 * vertIdx + 0] = (l * segmentsRadius)       + r;
                indices[6 * vertIdx + 1] = ((l + 1) * segmentsRadius) + r;
                indices[6 * vertIdx + 2] = (l * segmentsRadius)       + ((r + 1) % segmentsRadius);
                /* Setup second triangle */
                indices[6 * vertIdx + 3] = (l * segmentsRadius)       + ((r + 1) % segmentsRadius);
                indices[6 * vertIdx + 4] = ((l + 1) * segmentsRadius) + r;
                indices[6 * vertIdx + 5] = ((l + 1) * segmentsRadius) + ((r + 1) % segmentsRadius);
            }
        }
        /* Then, fill the pointy segments */
        for (let r = 0; r < segmentsRadius; r++) {
            /* Add last triangle */
            indices[3 * (trisSegmentsFull + r) + 0] = ((segmentsLength - 1) * segmentsRadius) + r;
            indices[3 * (trisSegmentsFull + r) + 1] = (segmentsLength * segmentsRadius);
            indices[3 * (trisSegmentsFull + r) + 2] = ((segmentsLength - 1) * segmentsRadius) + ((r + 1) % segmentsRadius);
        }
        /* Done */
        return new THREE.Uint16BufferAttribute(indices, 1);
    }, [segmentsLength, segmentsRadius]);

    /* Reallocate buffer only if size changed */
    const nVertices = (segmentsLength * segmentsRadius) + 1;
    const buffer = useMemo(() => new Float32Array(nVertices * BUFFER_STRIDE), [nVertices]);
    /* Recompute contents only if needed */
    const bufferDirtyRef = useRef(false);
    const geometryData = useMemo(() => {
        /* Compute the angle step */
        const angleStep = (2 * Math.PI) / segmentsRadius;
        const lengthStep = sizeLength / segmentsLength;
        /* Temporary variables */
        const tmpVec = new THREE.Vector3();
        const tmpUV = new THREE.Vector2();
        const tmpMatrix = new THREE.Matrix4();
        /* The current reference frame 
            - translation = ring center 
            - rotation = growth rotation */
        const segmentToWorld = new THREE.Matrix4();
        /* For each segment*/
        for (let l = 0; l < segmentsLength + 1; l++) {
            /* For each point along the radius */
            for (let r = 0; r < segmentsRadius; r++) {
                /* Are we drawing a circle or are we at the endpoint ? */
                const notEndpoint = l < segmentsLength;
                if (notEndpoint) {
                    /* In the segment frame coordinates: 
                        - draw each point of the circle 
                        - don't forget to multiply by radius 
                        - TODO : add variability */
                    tmpVec.set(Math.cos(angleStep*r), 0, Math.sin(angleStep*r));
                    tmpVec.multiplyScalar(sizeRadius); // TODO : change radius depending on l
                } else {
                    /* The endpoint */
                    tmpVec.set(0, 0, 0);
                }
                /* Now, use the segment to world matrix to offset/rotate it */
                tmpVec.applyMatrix4(segmentToWorld);
                /* Fill buffer */
                const vertIdx = (l * segmentsRadius) + (notEndpoint ? r : 0);
                tmpVec.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_XYZ);
                tmpUV.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_UV);
            }
            /* Apply a small growth rotation. 
             * TODO : make PARAMETRABLE */ 
            tmpMatrix.identity();
            tmpMatrix.makeRotationFromEuler(new THREE.Euler(
                (Math.random() * 2 - 1) * deg2rad(20), 0, 
                (Math.random() * 2 - 1) * deg2rad(20)));
            segmentToWorld.multiply(tmpMatrix);
            /* Apply our translation */
            tmpMatrix.makeTranslation(0, lengthStep, 0);
            segmentToWorld.multiply(tmpMatrix);
        }
        /* Recomputed ; we are dirty */
        bufferDirtyRef.current = true;
        /* Return the data */
        return buffer;
    }, [buffer, segmentsLength, segmentsRadius, sizeLength, sizeRadius]);

    /* Make the interleaved buffer and mark it dirty */
    const interleavedBuffer = useInstance(THREE.InterleavedBuffer, geometryData, BUFFER_STRIDE);
    interleavedBuffer.set(geometryData, 0);
    interleavedBuffer.count = nVertices;
    interleavedBuffer.needsUpdate ||= bufferDirtyRef.current;

    /* Make the geometry */
    const geometry = useInstance(THREE.BufferGeometry);
    geometry.setAttribute('position', useInstance(THREE.InterleavedBufferAttribute, interleavedBuffer, BUFFER_SIZE_XYZ, BUFFER_OFFSET_XYZ));
    geometry.setAttribute('uv',       useInstance(THREE.InterleavedBufferAttribute, interleavedBuffer, BUFFER_SIZE_UV,  BUFFER_OFFSET_UV));
    geometry.setIndex(indices);
    if (bufferDirtyRef.current) {
        geometry.computeVertexNormals();
    }
    
    /* Clear dirty flag */
    bufferDirtyRef.current = false;

    return (
        // <boxGeometry args={[10, 10, 10]} />
        //<sphereGeometry args={[10, 8, 8]} />
        <mesh geometry={geometry}>
            <meshPhongMaterial color='#ffffff'/>
        </mesh>
    );
};