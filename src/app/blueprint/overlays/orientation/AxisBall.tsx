import { Billboard, Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

type AxisBallProps = {
    radius: number;
    thickness?: number;
    label?: string;
    colorOutside: THREE.ColorRepresentation;
    colorInside?: THREE.ColorRepresentation;
} & GroupProps;

export const AxisBall = ({ radius, thickness, colorOutside, colorInside, label, ...props }: AxisBallProps) => {
    const hasRim = thickness !== undefined;
    return (
        <group {...props}>
            <mesh>
                <sphereGeometry args={[radius]} />
                <meshBasicMaterial color={colorOutside} side={THREE.BackSide} />
            </mesh>
            {
                hasRim && (
                    <mesh>
                        <sphereGeometry args={[Math.max(radius - thickness, 0)]} />
                        <meshBasicMaterial color={colorInside} side={THREE.BackSide} />
                    </mesh>
                )
            }
            {
                label && (
                    <Billboard>
                        <Text fontSize={radius*1.5} fontWeight={600} color='black'>{label}</Text>
                    </Billboard>
                )
            }
        </group>
    );
};
