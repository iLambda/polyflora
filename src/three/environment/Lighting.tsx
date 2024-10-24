import { ColorSource } from '@utils/datatypes/color';
import { useReactiveRef } from '@utils/react/hooks/state';
import { useColor } from '@utils/react/hooks/three';
import { memo } from 'react';
import { Record, Static, Number } from 'runtypes';
import * as THREE from 'three';

/* The lighting settings. These are to be serialized */
export type LightingSettings = Static<typeof LightingSettings>;
export const LightingSettings = Record({
    // Ambient light (intensity + color)
    ambient: Record({
        intensity: Number,
        color: ColorSource,
    }),
    // Sun light (angle + intensity + color)
    sun: Record({
        intensity: Number,
        color: ColorSource,
    }),
});

/* The props */
type LightingProps = LightingSettings & {};

/* The node */
export const Lighting = memo((props: LightingProps) => {
    /* Setup refs */
    const [directionalLightRef, directionalLight] = useReactiveRef<THREE.DirectionalLight>();
    if (directionalLight) {
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.bottom = -100;
    }

    /* Setup the lighting */
    return (
        <>
            {/* Setup lighting */}
            <ambientLight 
                intensity={props.ambient.intensity}
                color={useColor(props.ambient.color)}
            />
            <directionalLight 
                ref={directionalLightRef}
                intensity={props.sun.intensity}
                color={useColor(props.sun.color)} 
                position={[100, 40 , 0]}
                rotation={[0, 0, -Math.PI/8]}
                castShadow  
            />
            {/* {directionalLight && (
                <>
                    <directionalLightHelper args={[directionalLight, 2, 'yellow']} />
                </>
            )} */}
        </>
    );
});