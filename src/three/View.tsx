import * as THREE from 'three';
import { CameraControls, OrbitControls, PerspectiveCamera, useCamera } from '@react-three/drei';
import { useInstance } from '@utils/react/hooks/refs';
import { deg2rad } from '@utils/math';
import { Environment, EnvironmentSettings } from './viewer/Environment';

type ViewerProps = {
    environment: EnvironmentSettings,
};

export const View = (props: ViewerProps) => {

    /* Return the control */
    return (
        <>
            {/* The environment (grid, shadows, etc) */}
            <Environment {...props.environment} />

            <mesh>
                <boxGeometry args={[10, 10, 10]} />
                <meshPhongMaterial />
            </mesh>

            <OrbitControls makeDefault
                enablePan={true}
                minPolarAngle={0} 
                maxPolarAngle={deg2rad(130)}
                minDistance={15}
                maxDistance={250}
            />
        </>
    );
};