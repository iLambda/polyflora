import { CameraControls } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from './viewer/Grid';
import { Lighting, LightingSettings } from './viewer/Lighting';
import { Record, Static } from 'runtypes';
import { MutableRefObject, Suspense, useEffect, useMemo } from 'react';

import { useReactiveRef } from '@utils/react/hooks/state';
import * as THREE from 'three';
import { useFlora } from '@app/state/Flora';
import { Trunk } from './flora/tree/Trunk';
import { Branches } from './flora/tree/Branches';

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
                    {/* The trunk skeleton */}
                    <Trunk
                        bendAmount={floraSnapshot.trunk.bendAmount}
                        bendDirection={floraSnapshot.trunk.bendDirection}
                        segmentsLength={floraSnapshot.trunk.segmentsLength}
                        sizeLength={floraSnapshot.trunk.sizeLength}
                        crinklingMin={floraSnapshot.trunk.crinklingMin}
                        crinklingMax={floraSnapshot.trunk.crinklingMax}
                        curvature={floraSnapshot.trunk.curvature}
                        segmentsRadius={floraSnapshot.trunk.segmentsRadius}
                        sizeRadius={floraSnapshot.trunk.sizeRadius}
                        tilingU={floraSnapshot.trunk.tilingU}
                        tilingV={floraSnapshot.trunk.tilingV}
                        textureURL={floraSnapshot.trunk.textureURL}
                        seed={floraSnapshot.seed}
                        shading={floraSnapshot.shading}
                        name='trunk'>

                        <Branches 
                            distribution='random'
                            bendAmount={floraSnapshot.branch.bendAmount}
                            bendDirection={floraSnapshot.branch.bendDirection}
                            minCrossWidth={floraSnapshot.branch.minCrossWidth}
                            maxCrossWidth={floraSnapshot.branch.maxCrossWidth}
                            crinklingMin={floraSnapshot.branch.crinklingMin}
                            crinklingMax={floraSnapshot.branch.crinklingMax}
                            curvature={floraSnapshot.branch.curvature}
                            segmentsRadius={floraSnapshot.branch.segmentsRadius}
                            segmentsLength={floraSnapshot.branch.segmentsLength}
                            geometryMode={useMemo(() => [...floraSnapshot.branch.geometryMode], [floraSnapshot.branch.geometryMode])}
                            minAngle={floraSnapshot.branch.minAngle}
                            minLength={floraSnapshot.branch.minLength}
                            minRadius={floraSnapshot.branch.minRadius}
                            maxAngle={floraSnapshot.branch.maxAngle}
                            minPosition={floraSnapshot.branch.minPosition}
                            maxPosition={floraSnapshot.branch.maxPosition}
                            maxLength={floraSnapshot.branch.maxLength}
                            maxRadius={floraSnapshot.branch.maxRadius}
                            nArticulations={floraSnapshot.branch.nArticulations}
                            parentLimbCurvature={floraSnapshot.trunk.curvature}
                            parentLimbBaseRadius={floraSnapshot.trunk.sizeRadius}
                            referenceLength={floraSnapshot.trunk.sizeLength}
                            textureBarkURL={floraSnapshot.trunk.textureURL}
                            textureBranchURL={floraSnapshot.branch.textureURL}
                            tilingBarkU={floraSnapshot.trunk.tilingU}
                            tilingBarkV={floraSnapshot.trunk.tilingV}
                            tilingCrossU={1}
                            tilingCrossV={1}
                            shading={floraSnapshot.shading}
                            seed={floraSnapshot.seed}
                            name='branches'
                        >
                        </Branches>

                    </Trunk>
                </Suspense>
            </group>
        </>
    );
};