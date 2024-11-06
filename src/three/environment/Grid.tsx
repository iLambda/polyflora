import { Grid as GridPlane } from '@react-three/drei';
import { memo } from 'react';
import { Literal, Union, Record, Static } from 'runtypes';
import * as THREE from 'three';

/* The grid settings. These are to be serialized */
export type GridSettings = Static<typeof GridSettings>;
export const GridSettings = Record({
    visibility: Union(Literal('shown'), Literal('hidden')), 
});

/* The props */
type GridProps = GridSettings & {
    layers?: THREE.Layers
};

/* The node */
export const Grid = memo((props: GridProps) => {
    /* Return the grid */
    return (
        <GridPlane 
            visible={props.visibility === 'shown'}
            position={[0, -0.01, 0]} 
            args={[10, 10]}
            cellSize={1} 
            cellThickness={0.5}
            cellColor='#454545'
            sectionSize={10}
            sectionThickness={1}
            sectionColor='#454545'
            fadeDistance={250}
            side={THREE.DoubleSide}
            fadeStrength={2}
            fadeFrom={0}
            followCamera={false}
            infiniteGrid={true}
            layers={props.layers}
        />
    );
});