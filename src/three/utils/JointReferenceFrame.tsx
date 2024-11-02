import { useReactiveRef } from '@utils/react/hooks/state';
import { useVector3 } from '@utils/react/hooks/three';
import { useMemo } from 'react';
import * as THREE from 'three';

type JointReferenceFrameProps = {
    radius?: number;
    widthSegments?: number;
    heightSegments?: number;
    color?: THREE.Color;
};

export const JointReferenceFrame = (props: JointReferenceFrameProps) => {
    // Defaulting props
    const color = props.color ?? 'red';
    const radius = props.radius ?? 0.25;
    const wSegments = props.widthSegments ?? 8;
    const hSegments = props.heightSegments ?? 8;

    const x = useVector3(1, 0, 0);
    const y = useVector3(0, 1, 0);
    const z = useVector3(0, 0, 1);

    // Getting ref to helper X
    const [setHelperRefX, helperRefX] = useReactiveRef<THREE.ArrowHelper>(); 
    helperRefX?.setColor('red');
    helperRefX?.setDirection(x);
    // Getting ref to helper Y
    const [setHelperRefY, helperRefY] = useReactiveRef<THREE.ArrowHelper>(); 
    helperRefY?.setColor('green');
    helperRefY?.setDirection(y);
    // Getting ref to helper Z
    const [setHelperRefZ, helperRefZ] = useReactiveRef<THREE.ArrowHelper>(); 
    helperRefZ?.setColor('blue');
    helperRefZ?.setDirection(z);
    
    // Return 
    return (
        <>
            <arrowHelper ref={setHelperRefX} />
            <arrowHelper ref={setHelperRefY} />
            <arrowHelper ref={setHelperRefZ} />
            <mesh>
                <sphereGeometry args={useMemo(() => [radius, wSegments, hSegments], [radius, wSegments, hSegments])} />
                <meshPhongMaterial color={color}/>
            </mesh>
        </>
    );
};