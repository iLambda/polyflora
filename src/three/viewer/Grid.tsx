import { Grid as GridPlane } from '@react-three/drei';
import { memo } from 'react';
import { Literal, Union, Record, Static } from 'runtypes';

/* The grid settings. These are to be serialized */
export type GridSettings = Static<typeof GridSettings>;
export const GridSettings = Record({
    visibility: Union(Literal('shown'), Literal('hidden')), 
});

/* The node */
export const Grid = memo((props: GridSettings) => {
    /* Return the grid */
    return (
        <GridPlane 
            visible={props.visibility === 'shown'}
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
    );
});