import { Grid } from '@react-three/drei';
import { ColorSource } from '@utils/datatypes/color';
import { useColor } from '@utils/react/hooks/three';
import { memo } from 'react';
import { Literal, Union, Record, Static, Number } from 'runtypes';

/* The environment settings. These are to be serialized */
export type EnvironmentSettings = Static<typeof EnvironmentSettings>;
export const EnvironmentSettings = Record({
    /* The grid settings */
    grid: Record({
        visibility: Union(Literal('shown'), Literal('hidden')) 
    }),
    /* The lighting settings */
    lighting: Record({
        // Ambient light (intensity + color)
        ambient: Record({
            intensity: Number,
            color: ColorSource,
        }),
        // Sun light (angle + intensity + color)
        sun: Record({
            intensity: Number,
            color: ColorSource,
        })
    })
});

/* The props */
type EnvironmentProps = EnvironmentSettings & {
    
};
/* The node */
export const Environment = memo((props: EnvironmentProps) => {
    
    /* Setup the environment */
    return (
        <>
            {/* Return the grid */ }
            <Grid 
                visible={props.grid?.visibility === 'shown'}
                position={[0, -0.01, 0]} 
                args={[10, 10]}
                cellSize={1} 
                cellThickness={0.5}
                cellColor='#3f3f3f'
                sectionSize={10}
                sectionThickness={1}
                sectionColor='#3f3f3f'
                fadeDistance={250}
                fadeStrength={2}
                fadeFrom={0}
                followCamera={false}
                infiniteGrid={true}
            />

            {/* Setup lighting */}
            <ambientLight 
                intensity={props.lighting?.ambient.intensity}
                color={useColor(props.lighting?.ambient.color)}
            />
            <directionalLight 
                intensity={props.lighting?.sun.intensity}
                color={useColor(props.lighting?.sun.color)} 
                position={[10, 10, 10]} 
            />
        </>
    )
});