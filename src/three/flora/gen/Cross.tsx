import { useLoader } from '@react-three/fiber';
import { useInterleavedBufferAttribute } from '@utils/react/hooks/three';
import { memo, useMemo, useRef } from 'react';
import { Number, Record, Static, String } from 'runtypes';

import * as THREE from 'three';
import { useParentSkeleton } from './SkeletonContext';
import { SkeletonData } from './SkeletonData';
import { Line } from '@react-three/drei';


/* The direction a cross is going */
// eslint-disable-next-line react-refresh/only-export-components
export enum CrossDirection {
    CROSS_HORIZONTAL = 1 << 0,
    CROSS_VERTICAL = 1 << 1,
    CROSS_BOTH = 0b11,
}

/* The parameters for generating a specific cross */
export type CrossParameters = Static<typeof CrossParameters>;
export const CrossParameters = Record({
    // The width of the cross
    width: Number,
    // The UV tiling
    tilingU: Number,
    tilingV: Number,
    // The material data
    textureURL: String,
    // Cross mode
    crossMode: Number,
});
/* The props */
export type CrossProps = CrossParameters & {
    shading: 'shaded' | 'wireframe' | 'skeletal';
};


/* Buffer sizes and strides */
const BUFFER_SIZE_XYZ = 3;
const BUFFER_SIZE_NOR = 3;
const BUFFER_SIZE_UV = 2;
const BUFFER_STRIDE = BUFFER_SIZE_XYZ + BUFFER_SIZE_NOR + BUFFER_SIZE_UV;
const BUFFER_OFFSET_XYZ = 0;
const BUFFER_OFFSET_NOR = BUFFER_OFFSET_XYZ + BUFFER_SIZE_XYZ;
const BUFFER_OFFSET_UV = BUFFER_OFFSET_NOR + BUFFER_SIZE_NOR;

/* Return the geometry */
export const Cross = memo((props: CrossProps) => {
    /* Get the skeleton */
    const skeleton = useParentSkeleton();
    if (!skeleton) { 
        throw new Error('No parent skeleton was found. Try adding a <Skeleton/> or a <SkeletonProvider />'); 
    }
    
    /* Get the texture */
    const colorMap = useLoader(THREE.TextureLoader, props.textureURL);
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    
    /* Clamp the props */
    const segmentsLength = SkeletonData.getNSegments(skeleton);
    const crossWidth = Math.max(0.1, props.width);
    
    /* Compute the number of planes */
    const enableVert = (props.crossMode & CrossDirection.CROSS_VERTICAL) !== 0;
    const enableHoriz = (props.crossMode & CrossDirection.CROSS_HORIZONTAL) !== 0;
    const crossPlanes = useMemo(() => [enableVert ? [0] : [], enableHoriz ? [1] : []].flat(), [enableVert, enableHoriz]);
    const nCrossPlanes = crossPlanes.length;
    
    /* Reallocate indices only if size changed */
    const nTris = nCrossPlanes * segmentsLength * 2;
    const ALLOC_TRIS_INCREMENTS = 32;
    const allocTris = Math.ceil(nTris / ALLOC_TRIS_INCREMENTS) * ALLOC_TRIS_INCREMENTS; 
    const indexBuffer = useMemo(() => new Uint16Array(allocTris * 3), [allocTris]);
    const indexBufferDirtyRef = useRef(false);
    /* Generate the index list */
    const indices = useMemo(() => {
        /* First, fill all the full segments */
        for (let d = 0 ; d < nCrossPlanes; d++) {
            for (let l = 0; l < segmentsLength; l++) {
                const vertIdx = (d * 2 * (segmentsLength + 1)) + (2 * l);
                /* Setup first triangle */
                indexBuffer[6 * ((d * segmentsLength) + l) + 0] = vertIdx;
                indexBuffer[6 * ((d * segmentsLength) + l) + 1] = vertIdx + 1;
                indexBuffer[6 * ((d * segmentsLength) + l) + 2] = vertIdx + 2;
                /* Setup second triangle */
                indexBuffer[6 * ((d * segmentsLength) + l) + 3] = vertIdx + 1;
                indexBuffer[6 * ((d * segmentsLength) + l) + 4] = vertIdx + 3;
                indexBuffer[6 * ((d * segmentsLength) + l) + 5] = vertIdx + 2;
            }
        }
        /* Mark dirty */
        indexBufferDirtyRef.current = true;
        /* Done */
        return indexBuffer;
    }, [segmentsLength, nCrossPlanes, indexBuffer]);

    /* Reallocate buffer only if size changed */
    const nVertices = nCrossPlanes * (segmentsLength + 1) * 2;
    const ALLOC_VERT_INCREMENTS = 16;
    const allocVertices = Math.ceil(nVertices / ALLOC_VERT_INCREMENTS) * ALLOC_VERT_INCREMENTS; 
    const buffer = useMemo(() => new Float32Array(allocVertices * BUFFER_STRIDE), [allocVertices]);
    /* Recompute contents only if needed */
    const bufferDirtyRef = useRef(false);
    const geometryData = useMemo(() => {
        /* Temporary variables */
        const tmpXYZ = new THREE.Vector3();
        const tmpNOR = new THREE.Vector3();
        const tmpUV = new THREE.Vector2();
        const tmpMatrixRot = new THREE.Matrix3();
        /* The current reference frame 
            - translation = ring center 
            - rotation = growth rotation */
        const segmentToObject = new THREE.Matrix4();
        /* For each vert/horizontal */
        for (let d = 0; d < nCrossPlanes; d++) {
            // Reset seg2obj matrix
            segmentToObject.identity();
            // Now generate the actual geometry 
            for (let l = 0; l < segmentsLength + 1; l++) {
                // Generate vertices 2 by 2
                for (let s = 0; s < 2; s ++) {
                    /* Compute the left side vertex */
                    tmpXYZ.set(crossPlanes[d]!, 0, (1 - crossPlanes[d]!));
                    tmpXYZ.multiplyScalar((crossWidth/2) * ((2*s) - 1));
                    tmpNOR.set((1-crossPlanes[d]!), 0, crossPlanes[d]!);
                    /* Convert local position to world space */
                    tmpXYZ.applyMatrix4(segmentToObject);
                    /* Convert local vertex to object space */
                    tmpMatrixRot.setFromMatrix4(segmentToObject);
                    tmpNOR.applyNormalMatrix(tmpMatrixRot);
                    /* Fill UVs */
                    tmpUV.set(props.tilingV * s, props.tilingU * (l / segmentsLength));
                    /* Fill buffer */
                    const vertIdx = (d * 2 * (segmentsLength + 1)) + (2 * l) + s;
                    tmpXYZ.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_XYZ);
                    tmpNOR.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_NOR);
                    tmpUV.toArray(buffer, (BUFFER_STRIDE * vertIdx) + BUFFER_OFFSET_UV);   
                }
                /* Get next rotation (break if we are on tip of skeleton) */
                if (l < segmentsLength) { 
                    segmentToObject.fromArray(skeleton.joints[l]!);
                }
            }
        }
        /* Recomputed ; we are dirty */
        bufferDirtyRef.current = true;
        /* Return the data */
        return buffer;
    }, [buffer, skeleton.joints, crossPlanes, nCrossPlanes, segmentsLength, crossWidth, props.tilingU, props.tilingV]);


    /* Make the interleaved buffer and mark it dirty */
    const interleavedBuffer = useMemo(() => new THREE.InterleavedBuffer(geometryData, BUFFER_STRIDE), [geometryData]);
    interleavedBuffer.count = nVertices;
    interleavedBuffer.needsUpdate ||= bufferDirtyRef.current;

    /* Make the geometry 
        NOTE : (cf https://github.com/mrdoob/three.js/issues/20933)
        ThreeJS is weird if the indices buffer gets changed, especially wrt wireframes.
        Technically it works all ok, but wireframe data breaks. We would wish to not have to reallocate 
        a whole geometry, but since the official solution is preallocate an array large enough (lol), we
        deal with it by preallocating large enough arrays in chunks, and recreating if needed.
    
    */
    // Try update index buffer attribute
    const indexBufferAttribute = useMemo(() => new THREE.BufferAttribute(indices, 1), [indices]);
    indexBufferAttribute.needsUpdate ||= indexBufferDirtyRef.current;
    // Make actual geom
    const geometry = useMemo(() => (new THREE.BufferGeometry()).setIndex(indexBufferAttribute), [indexBufferAttribute]);
    geometry.setAttribute('position', useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_XYZ, BUFFER_OFFSET_XYZ, bufferDirtyRef.current));
    geometry.setAttribute('normal',   useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_NOR, BUFFER_OFFSET_NOR, bufferDirtyRef.current));
    geometry.setAttribute('uv',       useInterleavedBufferAttribute(interleavedBuffer, BUFFER_SIZE_UV,  BUFFER_OFFSET_UV, bufferDirtyRef.current));
    geometry.setDrawRange(0, 3 * nTris);
    
    /* Clear dirty flag */
    bufferDirtyRef.current = false;
    indexBufferDirtyRef.current = false;
    
    /* Make the list of points to draw the skeleton */
    const jointCenters = useMemo(() => SkeletonData.centers(skeleton), [skeleton]);
    const lineData = useMemo(() => 
        jointCenters.flatMap((center, i) => i === 0 ? [] : [jointCenters[i - 1]!, center]  )
    , [jointCenters]);
    
    /* Return object */
    return (
        <>
            <mesh geometry={geometry} visible={props.shading === 'shaded'}>
                <meshLambertMaterial map={colorMap} alphaTest={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh geometry={geometry} visible={props.shading === 'wireframe'}>
                <meshBasicMaterial color='white' wireframe />
            </mesh>
            <Line 
                key='line'
                points={lineData}
                color='white'
                lineWidth={2}
                visible={props.shading === 'skeletal'}
            />
        </>
    );
});