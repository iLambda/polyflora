import { Billboard, Instance, Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Suspense, useState } from 'react';
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
            <Instance 
                scale={1}
                color={colorOutside}
            />
            {
                hasRim && (
                    <Instance
                        scale={Math.max(radius - thickness, 0) / radius}
                        color={colorInside}
                    />
                )
            }
            {
                label && showLabel && (
                    <Billboard>
                        <Suspense>
                            <Text 
                                font='font/sans-serif.normal.600.woff'
                                fontSize={radius*1.5} 
                                color={hovered ? 'white' : 'black'}
                                characters='XYZ+-'
                            >
                                {label}
                            </Text>
                        </Suspense>
                    </Billboard>
                )
            }
        </group>
    );
};
