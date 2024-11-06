import { PivotControls, useFBO } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Layers } from '@three/Layers';
import { useReactiveRef } from '@utils/react/hooks/state';
import { useLayers } from '@utils/react/hooks/three';
import { useRef } from 'react';
import * as THREE from 'three';

type CaptureProps = {
    textureWidth: number;
    textureHeight: number;    
};

export const Capture = (props: CaptureProps) => {
    /* Create refs */
    const [cameraRef, camera] = useReactiveRef<THREE.OrthographicCamera>();
    //const [boxHelperRef, boxHelper] = useReactiveRef<THREE.Box3Helper>();
    /* Get bounding box */
    //const box = useBoundingBox(props.target, true);
    const clearAlphaRef = useRef(1);
    /* Create render target */
    const renderTarget = useFBO(props.textureWidth, props.textureHeight, {
        stencilBuffer: false,
        depth: true,
        colorSpace: THREE.SRGBColorSpace,
    });
    
    useFrame((state) => {
        // Ensure camera is here
        if (!camera) { return; }
        // Render scene
        const { gl, scene } = state;

        // Save current state data
        clearAlphaRef.current = gl.getClearAlpha();

        // Render on RT
        gl.setRenderTarget(renderTarget);
        gl.setClearAlpha(0);
        gl.render(scene, camera);
        // Reset for render on screen
        gl.setRenderTarget(null);
        gl.setClearAlpha(clearAlphaRef.current);
    });

    /* Layers */
    const environmentLayers = useLayers([ Layers.Environment ]);
    const captureLayers = useLayers([ Layers.Capture ]);

    return (
        <>
            {/* <box3Helper ref={boxHelperRef} args={[box, 0xFFFFFF]} layers={environmentLayers}  /> */}

            <PivotControls scale={100} depthTest fixed lineWidth={2}>
                <mesh layers={environmentLayers}>
                    <boxGeometry args={[40, 40, 40]} />
                    <meshBasicMaterial map={renderTarget.texture} alphaTest={0.5} />
                </mesh>
            </PivotControls>

            <ambientLight color='white' layers={captureLayers} />
            
            <PivotControls rotation={[0, -Math.PI / 2, 0]} scale={75} depthTest={false} fixed lineWidth={2}>
                <orthographicCamera 
                    ref={cameraRef} 
                    zoom={0.05} 
                    layers={useLayers([ Layers.Flora, Layers.Capture ])}
                />
            </PivotControls>
            { camera && <cameraHelper args={[camera]} layers={environmentLayers} /> }
        </>
    );
};