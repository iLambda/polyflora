import { CameraControls } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from '../../three/viewer/Grid';
import { Lighting, LightingSettings } from '../../three/viewer/Lighting';
import { Record, Static } from 'runtypes';
import { MutableRefObject, Suspense, useEffect, useMemo } from 'react';

import { useReactiveRef } from '@utils/react/hooks/state';
import * as THREE from 'three';
import { Trunk } from '../../three/flora/tree/Trunk';
import { Branches } from '../../three/flora/tree/Branches';
import { useMolecule } from 'bunshi/react';
import { TreeBlueprintMolecule } from '@app/blueprint/TreeBlueprintState';
import { useSnapshot } from 'valtio';
import { useBlueprintDocumentID } from '@app/state/Blueprint';

/* The environment settings. These are to be serialized */
export type EnvironmentSettings = Static<typeof EnvironmentSettings>;
export const EnvironmentSettings = Record({
    /* The grid settings */
    grid: GridSettings,
    /* The lighting settings */
    lighting: LightingSettings,
});

/* The properties of the viewer */
type TreeBlueprint3DViewProps = {
    // The environment
    environment: EnvironmentSettings,
    // The view controller reference
    controllerRef?: ((v: TreeBlueprint3DViewController) => void) | MutableRefObject<TreeBlueprint3DViewController | null>;
};

export type TreeBlueprint3DViewController = {
    fitToView: () => void;
};

export const TreeBlueprint3DView = (props: TreeBlueprint3DViewProps) => {
    /* Declare references */
    const [controlsRef, controls] = useReactiveRef<CameraControls>();
    const [mainGroupRef, mainGroup] = useReactiveRef<THREE.Group>();

    /* Get flora state */
    const floraStore = useMolecule(TreeBlueprintMolecule);
    const floraSnapshot = useSnapshot(floraStore);

    /* Return the view controller */
    const controllerRef = props.controllerRef;
    useEffect(() => {
        // If not set, return
        if (!controls) { return; }
        if (!mainGroup) { return; }
        if (!controllerRef) { return; }

        // Make view controller
        const controller : TreeBlueprint3DViewController = {
            // Fit to view function
            fitToView: () => {
                controls.fitToSphere(mainGroup, true);
            },
        };
        
        // Set the view controller
        if (typeof controllerRef === 'function') { controllerRef?.(controller); } 
        else if (typeof controllerRef === 'object') { controllerRef.current = controller; }
    }, [controls, mainGroup, controllerRef]);

    /* Restore and/or store the camera data */
    useEffect(() => {
        /* If there are no controls, return */
        if (!controls) { return; }
        /* Restore the data */
        controls.setPosition(...floraStore.env.camera.position);
        controls.setTarget(...floraStore.env.camera.target);
        /* Cleanup function just saves it */
        return () => {
            // Create vectors 
            const position = new THREE.Vector3();
            const target = new THREE.Vector3();
            // Set them
            controls.getPosition(position);
            controls.getTarget(target);
            // Save em
            floraStore.env.camera.position = position.toArray();
            floraStore.env.camera.target = target.toArray();
        };
    }, [floraStore, controls]);

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
            <group ref={mainGroupRef} 
                // Force refresh when document changed to avoid weird effect
                key={useBlueprintDocumentID() ?? ''}
            >
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