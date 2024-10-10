import { useReactiveRef } from '@utils/react/hooks/state';
import { useVector3 } from '@utils/react/hooks/three';
import { useMemo } from 'react';
import * as THREE from 'three';

type JointProps = {
    radius?: number;
    widthSegments?: number;
    heightSegments?: number;
    direction: THREE.Vector3Tuple;
    color?: THREE.Color;
};

export const Joint = (props: JointProps) => {
    // Defaulting props
    const color = props.color ?? 'red';
    const radius = props.radius ?? 0.25;
    const wSegments = props.widthSegments ?? 8;
    const hSegments = props.heightSegments ?? 8;
    const direction = useVector3(...props.direction);

    // Getting ref to helper
    const [setHelperRef, helperRef] = useReactiveRef<THREE.ArrowHelper>(); 
    helperRef?.setColor(color);
    helperRef?.setDirection(direction);
    
    // Return 
    return (
        <>
            <arrowHelper ref={setHelperRef} />
            <mesh>
                <sphereGeometry args={useMemo(() => [radius, wSegments, hSegments], [radius, wSegments, hSegments])} />
                <meshPhongMaterial color={color}/>
            </mesh>
        </>
    );
};