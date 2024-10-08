import { useLoader } from '@react-three/fiber';
import { deg2rad } from '@utils/math';
import { useInstance } from '@utils/react/hooks/refs';
import { useInterleavedBufferAttribute } from '@utils/react/hooks/three';
import { memo, useMemo, useRef } from 'react';
import { Number, Record, Static } from 'runtypes';

import * as THREE from 'three';

/* The parameters for generating a specific trunk */
export type TrunkParameters = Static<typeof TrunkParameters>;
export const TrunkParameters = Record({
    // The number of segments
    segmentsLength: Number,
    segmentsRadius: Number,
    // The size of the trunk
    sizeLength: Number,
    sizeRadius: Number,
    // The UV tiling
    tilingU: Number,
    tilingV: Number,
});
/* The props */
type TrunkProps = TrunkParameters & {};

/* Buffer sizes and strides */
const BUFFER_SIZE_XYZ = 3;
const BUFFER_SIZE_NOR = 3;
const BUFFER_SIZE_UV = 2;
const BUFFER_STRIDE = BUFFER_SIZE_XYZ + BUFFER_SIZE_NOR + BUFFER_SIZE_UV;
const BUFFER_OFFSET_XYZ = 0;
const BUFFER_OFFSET_NOR = BUFFER_OFFSET_XYZ + BUFFER_SIZE_XYZ;
const BUFFER_OFFSET_UV = BUFFER_OFFSET_NOR + BUFFER_SIZE_NOR;

/* Return the geometry */
export const Trunk = memo((props: TrunkProps) => {

    /* Get the texture */
    const colorMap = useLoader(THREE.TextureLoader, 'Wood03.png');
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    
    /* Clamp the props */
    const segmentsLength = Math.max(1, props.segmentsLength);
    const segmentsRadius = Math.max(3, props.segmentsRadius);
    const sizeLength = Math.max(0.1, props.sizeLength);
    const sizeRadius = Math.max(0.01, props.sizeRadius);

    /* Generate the index list */
    const indices = useMemo(() => {
        /* Compute number of triangles */
        const nTris = segmentsLength * segmentsRadius * 2;
        /* Preallocate indices array */
        const indices = new Array<number>(3 * nTris).fill(0);
        /* First, fill all the full segments */
        for (let l = 0; l < segmentsLength; l++) {
            for (let r = 0; r < segmentsRadius; r++) {
                /* Compute current tri number */
                const quadIdx = (l * segmentsRadius) + r;
                /* Setup first triangle */
                indices[6 * quadIdx + 0] = (l * (segmentsRadius + 1))       + r;
                indices[6 * quadIdx + 1] = ((l + 1) * (segmentsRadius + 1)) + r;
                indices[6 * quadIdx + 2] = (l * (segmentsRadius + 1))       + ((r + 1) % (segmentsRadius + 1));
                /* Setup second triangle */
                indices[6 * quadIdx + 3] = (l * (segmentsRadius + 1))       + ((r + 1) % (segmentsRadius + 1));
                indices[6 * quadIdx + 4] = ((l + 1) * (segmentsRadius + 1)) + r;
                indices[6 * quadIdx + 5] = ((l + 1) * (segmentsRadius + 1)) + ((r + 1) % (segmentsRadius + 1));
            }
        }
        /* Done */
        return new THREE.Uint16BufferAttribute(indices, 1);
    }, [segmentsLength, segmentsRadius]);

    /* Reallocate buffer only if size changed */
    const nVertices = (segmentsLength + 1) * (segmentsRadius + 1);
    const buffer = useMemo(() => new Float32Array(nVertices * BUFFER_STRIDE), [nVertices]);
    
    /* Recompute contents only if needed */
    const bufferDirtyRef = useRef(false);
    const geometryData = useMemo(() => {
        /* Compute the angle step */
        const angleStep = (2 * Math.PI) / segmentsRadius;
        const lengthStep = sizeLength / segmentsLength;
        /* Temporary variables */
        const tmpXYZ = new THREE.Vector3();
        const tmpNOR = new THREE.Vector3();
        const tmpUV = new THREE.Vector2();
        const tmpMatrix = new THREE.Matrix4();
        const tmpMatrixRot = new THREE.Matrix3();
        /* The current reference frame 
            - translation = ring center 
            - rotation = growth rotation */
        const segmentToWorld = new THREE.Matrix4();
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
                    tmpXYZ.multiplyScalar(sizeRadius * Math.pow(1.0 - (l / segmentsLength), 0.85)); // TODO : change radius depending on l
                }
                else {
                    // Local position & normal
                    tmpXYZ.set(0, 0, 0);
                    tmpNOR.set(0, 1, 0);
                }
                /* Convert local position to world space */
                tmpXYZ.applyMatrix4(segmentToWorld);
                /* Convert local vertex to object space */
                tmpMatrixRot.setFromMatrix4(segmentToWorld);
                tmpNOR.applyNormalMatrix(tmpMatrixRot);
                /* Fill UVs */
                tmpUV.set(props.tilingV * (l / segmentsLength), props.tilingU * (r / segmentsRadius));
                /* Fill buffer */
                const vertIdx = (l * (segmentsRadius + 1)) + r;
                tmpXYZ.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_XYZ);
                tmpNOR.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_NOR);
                tmpUV.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_UV);
            }
            /* Apply a small growth rotation. 
             * TODO : make PARAMETRABLE */ 
            tmpMatrix.identity();
            tmpMatrix.makeRotationFromEuler(new THREE.Euler(
                (Math.random() * 2 - 1) * deg2rad(8), 0, 
                (Math.random() * 2 - 1) * deg2rad(8)));
            segmentToWorld.multiply(tmpMatrix);
            /* Apply our translation */
            tmpMatrix.makeTranslation(0, lengthStep, 0);
            segmentToWorld.multiply(tmpMatrix);
        }
        /* Recomputed ; we are dirty */
        bufferDirtyRef.current = true;
        /* Return the data */
        return buffer;
    }, [buffer, segmentsLength, segmentsRadius, sizeLength, sizeRadius, props.tilingU, props.tilingV]);

    /* Make the interleaved buffer and mark it dirty */
    const interleavedBuffer = useMemo(() => new THREE.InterleavedBuffer(geometryData, BUFFER_STRIDE), [geometryData]);
    interleavedBuffer.count = nVertices;
    interleavedBuffer.needsUpdate ||= bufferDirtyRef.current;

    /* Make the geometry */
    const geometry = useInstance(THREE.BufferGeometry);
    geometry.setAttribute('position', useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_XYZ, BUFFER_OFFSET_XYZ));
    geometry.setAttribute('normal',   useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_NOR, BUFFER_OFFSET_NOR));
    geometry.setAttribute('uv',       useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_UV,  BUFFER_OFFSET_UV));
    geometry.setIndex(indices);
    
    /* Clear dirty flag */
    bufferDirtyRef.current = false;
    
    /* Return object */
    return (
        <mesh geometry={geometry}>
            <meshPhongMaterial map={colorMap} color='#ffffff'/>
        </mesh>
    );
});