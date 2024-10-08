import { CameraControls } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from './viewer/Grid';
import { Lighting, LightingSettings } from './viewer/Lighting';
import { Record, Static } from 'runtypes';
import { Trunk } from './flora/tree/Trunk';
import { MutableRefObject, Suspense, useEffect } from 'react';

import { useReactiveRef } from '@utils/react/hooks/state';
import * as THREE from 'three';
import { useFlora } from '@app/state/flora';

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
    // The environment
    environment: EnvironmentSettings,
    
    // The view controller reference
    controllerRef?: ((v: ViewController) => void) | MutableRefObject<ViewController | null>;
};

export type ViewController = {
    fitToView: () => void;
};

export const View = (props: ViewerProps) => {
    /* Declare references */
    const [controlsRef, controls] = useReactiveRef<CameraControls>();
    const [mainGroupRef, mainGroup] = useReactiveRef<THREE.Group>();

    /* Get flora state */
    const [floraSnapshot] = useFlora();

    /* Return the view controller */
    const controllerRef = props.controllerRef;
    useEffect(() => {
        // If not set, return
        if (!controls) { return; }
        if (!mainGroup) { return; }
        if (!controllerRef) { return; }

        // Make view controller
        const controller : ViewController = {
            // Fit to view function
            fitToView: () => {
                controls.fitToSphere(mainGroup, true);
            },
        };
        
        // Set the view controller
        if (typeof controllerRef === 'function') { controllerRef?.(controller); } 
        else if (typeof controllerRef === 'object') { controllerRef.current = controller; }
    }, [controls, mainGroup, controllerRef]);
    
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
            <group ref={mainGroupRef}>
                <Suspense>
                    <Trunk 
                        segmentsLength={floraSnapshot.trunk.segmentsLength}
                        segmentsRadius={floraSnapshot.trunk.segmentsRadius}
                        sizeLength={floraSnapshot.trunk.sizeLength}
                        sizeRadius={floraSnapshot.trunk.sizeRadius}
                        tilingU={floraSnapshot.trunk.tilingU}
                        tilingV={floraSnapshot.trunk.tilingV}
                    />
                </Suspense>
            </group>
        </>
    );
};