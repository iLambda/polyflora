import { CameraMolecule } from '@app/state/Camera';
import { rem } from '@mantine/core';
import { Html, Line, OrthographicCamera, View } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useInstance } from '@utils/react/hooks/refs';
import { useMolecule } from 'bunshi/react';
import { CSSProperties, useMemo } from 'react';
import * as THREE from 'three';

const OrientationCubeView = () => {
    /* Get the camera store data */
    const cameraStore = useMolecule(CameraMolecule);
    /* Allocate a vector */
    const tmpVec = useInstance(THREE.Vector3);

    /* Each frame, position camera */
    useFrame(({ camera }) => {
        // Wait till we have ref
        if (!camera) { return; }
        // Compute position of the camera
        tmpVec.set(0, 0, 2);
        tmpVec.applyQuaternion(cameraStore.rotation);
        tmpVec.multiplyScalar(1);
        // Set it
        camera.position.copy(tmpVec);
        camera.quaternion.copy(cameraStore.rotation);
    });

    const len = 0.75;
    const [points, colors] = useMemo(() => {
        return [
            [[0, len, 0], [0, 0, 0], [len, 0, 0], [0, 0, 0], [0, 0, len], [0, 0, 0]],
            [[0, 255, 0], [0, 255, 0], [255, 0, 0], [255, 0, 0], [0, 0, 255], [0, 0, 255]],
        ] as [THREE.Vector3Tuple[], THREE.Vector3Tuple[]];
    }, [len]);

    /* Return contents of the view */
    return (
        <>
            <OrthographicCamera makeDefault zoom={55}/>
            <ambientLight color='white' intensity={0} />
            <directionalLight color='white' intensity={4} position={[-5, 6, 10]} />
            <directionalLight color='white' intensity={4} position={[5, -6, -10]} />

            <Line 
                points={points}
                vertexColors={colors}
                lineWidth={2}
                segments
            />
            <mesh position={[0, len - 0.15/2, 0]}>
                <sphereGeometry args={[0.15]} />
                <meshBasicMaterial color={'#00ff00'} />
                <Html>
                    <p style={{ transform: 'translateX(-50%) translateY(-50%)', color: 'black', fontWeight: 600 }}>Y</p>
                </Html>
            </mesh>
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color='#ffffff' />
            </mesh> */}
        </>
    );
};

type OrientationCubeProps = {
    style?: CSSProperties;
    className?: string;
    size?: string;
};
export const OrientationCube = (props: OrientationCubeProps) => {
    /* Get size */
    const size = props.size ?? rem(100);
    /* Return component */
    return (
        <div
            className={props.className} 
            style={{
                ...props.style,
            }}
        >
            <View style={{ width: size, height: size }} frames={0}>
                <OrientationCubeView />
            </View>
        </div>
    );
};