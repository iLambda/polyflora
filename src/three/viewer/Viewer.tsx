import * as THREE from 'three';
import { OrbitControlsExp } from 'three-stdlib';
import { OrbitControls, PerspectiveCamera, useCamera } from '@react-three/drei';
import { useInstance } from '@utils/react/hooks/refs';
import { deg2rad } from '@utils/math';

type ViewerProps = {
    reverseOrbit?: boolean
};

export const Viewer = (props: ViewerProps) => {

    /* Return the control */
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh>
                <boxGeometry args={[10, 10, 10]} />
                <meshPhongMaterial />
            </mesh>
            {/* The orbit controls  */}
            <OrbitControls makeDefault
                enablePan={false}
                reverseOrbit={!!props.reverseOrbit}
                target={[0, 0, 0]}
                minPolarAngle={0} 
                maxPolarAngle={deg2rad(130)}
                minDistance={15}
                maxDistance={40}
            />
        </>
    );
};