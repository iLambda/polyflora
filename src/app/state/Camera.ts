import { blueprintScope } from '@app/state/Blueprint';
import { useFrame } from '@react-three/fiber';
import { molecule } from 'bunshi';
import { useMolecule } from 'bunshi/react';
import * as THREE from 'three';

export type CameraStore = {
    position: THREE.Vector3,
    rotation: THREE.Quaternion,
};

export const CameraMolecule = molecule<CameraStore>((mol, scope) => {
    /* This molecule has a blueprint scope */
    scope(blueprintScope);
    /* We simply return empty camera data */
    return {
        position: new THREE.Vector3(),
        rotation: new THREE.Quaternion(),
    };
});

export const CameraTracker = () => {
    /* Set camera data */
    const cameraStore = useMolecule(CameraMolecule);
    useFrame(({ camera }) => {
        cameraStore.position.copy(camera.position);
        cameraStore.rotation.copy(camera.quaternion);
    });
    /* No component */
    return null;
};