import { CameraControls } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from './viewer/Grid';
import { Lighting, LightingSettings } from './viewer/Lighting';
import { Record, Static } from 'runtypes';
import { Trunk } from './flora/tree/Trunk';
import { Suspense } from 'react';

import { useReactiveRef } from '@utils/react/hooks/state';
import { useBox3 } from '@utils/react/hooks/three';

/* The environment settings. These are to be serialized */
export type EnvironmentSettings = Static<typeof EnvironmentSettings>;
export const EnvironmentSettings = Record({
    /* The grid settings */
    grid: GridSettings,
    /* The lighting settings */
    lighting: LightingSettings,
});

/* The properties of the viewer */
type ViewerProps = {
    environment: EnvironmentSettings,
};

export const View = (props: ViewerProps) => {
    /* The camera control */
    const [controlsRef, controls] = useReactiveRef<CameraControls>();
    /* Setup its boundaries */
    const bounds = useBox3(0, 0.01, 0, 0, 45, 0);
    controls?.setBoundary(bounds);

    /* Return the control */
    return (
        <>
            {/* The environment (grid, shadows, etc) */}
            <Grid {...props.environment.grid} />
            <Lighting {...props.environment.lighting} />

            {/* The orbit controls */}
            <CameraControls makeDefault
                ref={controlsRef}
                minPolarAngle={0} 
                maxPolarAngle={deg2rad(130)}
                minDistance={5}
                maxDistance={250}       
            />
            
            {/* Generating the tree */ }
            <Suspense>
                <Trunk 
                        segmentsLength={4}
                        segmentsRadius={6}
                        sizeLength={45}
                        sizeRadius={0.5}
                        tilingU={1}
                        tilingV={8.0}
                    />
            </Suspense>
        </>
    );
};