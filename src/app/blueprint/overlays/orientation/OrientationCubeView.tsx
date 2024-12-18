import { AxisBall } from '@app/blueprint/overlays/orientation/AxisBall';
import { CameraMolecule } from '@app/state/Camera';
import { Instances, Line, MeshDiscardMaterial, OrthographicCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useInstance } from '@utils/react/hooks/refs';
import { Triplet } from '@utils/types';
import { useMolecule } from 'bunshi/react';
import { useMemo, useState } from 'react';
import * as THREE from 'three';

const primaryAxisColors = ['#8A2E2B', '#318A2B', '#2B508A'].map(v => new THREE.Color(v)) as Triplet<THREE.Color>;
const secondaryAxisColors = ['#5B1F1D', '#215B1D', '#1D355B'].map(v => new THREE.Color(v)) as Triplet<THREE.Color>;

const makePos = (axis: 0|1|2, sign: -1|1, scale: number) : THREE.Vector3Tuple => [+(axis === 0) * sign * scale, +(axis === 1) * sign * scale, +(axis === 2) * sign * scale];
const makeColors = (axis: 0|1|2) : [THREE.Color, THREE.Color] => [ primaryAxisColors[axis], primaryAxisColors[axis] ];
const makeAxis = (len: number, axis: 0|1|2) : [THREE.Vector3Tuple, THREE.Vector3Tuple] => [
    makePos(axis, 1, len),
    [0, 0, 0],
];

type OrientationCubeViewProps = {
    onDirectionChanged?: (dir: THREE.Vector3Tuple) => void;
};
export const OrientationCubeView = (props: OrientationCubeViewProps) => {
    /* Get the camera store data */
    const cameraStore = useMolecule(CameraMolecule);
    /* Allocate a vector */
    const tmpVec = useInstance(THREE.Vector3);

    /* Check if hovered */
    const [hovered, setHovered] = useState(false);

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
    
    const len = 0.45;
    const radius = 0.15;
    const thickness = 0.025;

    /* Prepare points and axes */    
    const axes = useMemo(() => ['X', 'Y', 'Z'] as const, []);
    const [points, colors] = useMemo(() => {
        return [
            [...makeAxis(len, 0), ...makeAxis(len, 1), ...makeAxis(len, 2)],
            [...makeColors(0), ...makeColors(1), ...makeColors(2)],
        ] as [THREE.Vector3Tuple[], THREE.Color[]];
    }, []);

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
            <Instances limit={24}>
                <sphereGeometry args={[radius]} />
                <meshBasicMaterial side={THREE.BackSide} />
                {
                    axes.map((label, idx) => {
                        const axis = idx as 0|1|2;
                        return (
                            <group key={label}>
                                <AxisBall 
                                    position={makePos(axis, 1, len+radius)} 
                                    colorOutside={primaryAxisColors[axis]} 
                                    radius={radius} 
                                    label={label}
                                    onClick={() => props.onDirectionChanged?.(makePos(axis, 1, 1)) }
                                />
                                <AxisBall 
                                    position={makePos(axis, -1, len+radius)} 
                                    colorOutside={primaryAxisColors[axis]} 
                                    colorInside={secondaryAxisColors[axis]} 
                                    radius={radius} 
                                    thickness={thickness} 
                                    labelHoverOnly
                                    label={`-${label}`}
                                    onClick={() => props.onDirectionChanged?.(makePos(axis, -1, 1)) }
                                />
                            </group>
                        );
                    })
                }
            </Instances>
            <mesh 
                onPointerOver={() => setHovered(true)} 
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[len + 2*radius + 0.05]} />
                {
                    hovered 
                        ? <meshBasicMaterial color='#404040' side={THREE.BackSide} />
                        : <MeshDiscardMaterial />
                }
            </mesh>
        </>
    );
};
