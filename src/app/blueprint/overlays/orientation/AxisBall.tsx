import { Billboard, Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

type AxisBallProps = {
    radius: number;
    thickness?: number;
    label?: string;
    labelHoverOnly?: boolean;
    colorOutside: THREE.ColorRepresentation;
    colorInside?: THREE.ColorRepresentation;
} & GroupProps;

export const AxisBall = (props: AxisBallProps) => {
    /* Destruct props */
    const { 
        radius, thickness, 
        colorOutside, colorInside, 
        label, labelHoverOnly = false, 
        onPointerOver, onPointerOut,
        ...groupProps 
    } = props;
    /* Hovering state */
    const [hovered, setHovered] = useState(false);
    /* Precompute conditions */
    const hasRim = thickness !== undefined;
    const showLabel = (labelHoverOnly && hovered) || !labelHoverOnly;
    /* Return elements */
    return (
        <group
            onPointerOver={(e) => { setHovered(true); onPointerOver?.(e); }} 
            onPointerOut={(e) => { setHovered(false); onPointerOut?.(e); } }
            {...groupProps}
        >
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
                label && showLabel && (
                    <Billboard>
                        <Text 
                            font='font/sans-serif.normal.600.woff'
                            fontSize={radius*1.5} 
                            color={hovered ? 'white' : 'black'}
                        >
                            {label}
                        </Text>
                    </Billboard>
                )
            }
        </group>
    );
};
