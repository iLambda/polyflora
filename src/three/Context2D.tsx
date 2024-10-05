import { ReactNode, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReactiveRef } from '@utils/react/hooks/state';
import { useControls } from 'leva';

import * as THREE from 'three';
import { Viewer } from './viewer/Viewer';
import { useInstance } from '@utils/react/hooks/refs';
import { PerspectiveCamera } from '@react-three/drei';

type Context2DProps = {
    filtering?: 'nearest' | 'linear';
    children?: ReactNode | ReactNode[];
};

export const Context2D = (props: Context2DProps) => {

    /* Make the renderer, and a canvas ref */
    const [canvasRef, canvas] = useReactiveRef<HTMLCanvasElement>();
    const gl = useCallback((canvas: HTMLCanvasElement | OffscreenCanvas) => {
        // Create renderer
        const renderer = new THREE.WebGLRenderer({  
            canvas,
            alpha: false,
            depth: true,
            powerPreference: 'default',
        });
        // Check if WebGL2
        if (!renderer.capabilities.isWebGL2) {
            throw new Error('This browser does not support WebGL2.');
        }
        // Set some params
        renderer.setClearColor(0x000000);
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // Return it
        return renderer;
    }, []);

    const { fov } = useControls({ fov: 20 });

    /* Return the body */
    return (
        <Canvas
            onContextMenu={(e) => { e.preventDefault(); return false; }}
            ref={canvasRef}
            orthographic
            flat 
            dpr={window.devicePixelRatio}
            gl={gl}
            camera={{ fov: fov, near: 0, far: 1000 }}
        >
            <Viewer />
            { props.children }
        </Canvas>
    );    
};