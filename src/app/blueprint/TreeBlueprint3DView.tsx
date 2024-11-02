import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from '../../three/environment/Grid';
import { Lighting, LightingSettings } from '../../three/environment/Lighting';
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
import { Leaves } from '@three/flora/tree/Leaves';
import { useLayers } from '@utils/react/hooks/three';
import { Layers } from '@three/Layers';

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

    /* Layers */
    const environmentLayers = useLayers(Layers.Environment);
    const floraLayers = useLayers(Layers.Flora);

    /* Return the control */
    return (
        <>
            {/* The clear color */}
            <color attach='background' args={['#2b2b2b']} />

            {/* The environment (grid, shadows, etc) */}
            <Grid {...props.environment.grid} layers={environmentLayers} />
            <Lighting {...props.environment.lighting} layers={environmentLayers} />

            {/* The camera */}
            <PerspectiveCamera makeDefault 
                fov={60} 
                near={0.1} 
                far={1000} 
                position={[25, 50, 25]} 
                layers={useLayers([ Layers.Flora, Layers.Environment ])}
            />

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
                        crinklingMin={floraSnapshot.trunk.crinklingMin}
                        crinklingMax={floraSnapshot.trunk.crinklingMax}
                        curvature={floraSnapshot.trunk.curvature}
                        layers={floraLayers}
                        segmentsLength={floraSnapshot.trunk.segmentsLength}
                        sizeLength={floraSnapshot.trunk.sizeLength}
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
                            crinklingMin={floraSnapshot.branch.crinklingMin}
                            crinklingMax={floraSnapshot.branch.crinklingMax}
                            curvature={floraSnapshot.branch.curvature}
                            geometryMode={useMemo(() => [...floraSnapshot.branch.geometryMode], [floraSnapshot.branch.geometryMode])}
                            layers={floraLayers}
                            minCrossWidth={floraSnapshot.branch.minCrossWidth}
                            maxCrossWidth={floraSnapshot.branch.maxCrossWidth}
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
                            segmentsRadius={floraSnapshot.branch.segmentsRadius}
                            segmentsLength={floraSnapshot.branch.segmentsLength}
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
                            { floraSnapshot.leaves.enabled.includes('branches') &&
                                <Leaves
                                    distribution={floraSnapshot.leaves.distribution}
                                    layers={floraLayers}
                                    minAngle={floraSnapshot.leaves.minAngle} 
                                    maxAngle={floraSnapshot.leaves.maxAngle}
                                    minPosition={floraSnapshot.leaves.minPosition} 
                                    maxPosition={floraSnapshot.leaves.maxPosition}
                                    minSize={floraSnapshot.leaves.minSize}
                                    maxSize={floraSnapshot.leaves.maxSize}
                                    nArticulations={floraSnapshot.leaves.nArticulations}
                                    orientationSpace={floraSnapshot.leaves.orientationSpace}
                                    palette={floraSnapshot.leaves.palette}
                                    parentLimbBaseRadius={0}
                                    parentLimbCurvature={0}
                                    sizeHeight={floraSnapshot.leaves.sizeHeight} 
                                    sizeWidth={floraSnapshot.leaves.sizeWidth}
                                    texturePivotU={floraSnapshot.leaves.texturePivotU} 
                                    texturePivotV={floraSnapshot.leaves.texturePivotV}
                                    textureURL={floraSnapshot.leaves.textureURL}
                                    shading={floraSnapshot.shading}
                                    seed={floraSnapshot.seed}
                                    name='leaves'
                                /> 
                            }
                        </Branches>
                    </Trunk>
                </Suspense>
            </group>
        </>
    );
};