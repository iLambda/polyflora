import { ColorSource } from '@utils/datatypes/color';
import { useColor } from '@utils/react/hooks/three';
import { memo } from 'react';
import { Record, Static, Number } from 'runtypes';

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
    /* Setup the lighting */
    return (
        <>
            {/* Setup lighting */}
            <ambientLight 
                intensity={props.ambient.intensity}
                color={useColor(props.ambient.color)}
            />
            <directionalLight 
                intensity={props.sun.intensity}
                color={useColor(props.sun.color)} 
                position={[10, 11, 13]} 
            />
        </>
    );
});