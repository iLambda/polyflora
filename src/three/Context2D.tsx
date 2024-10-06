import { ReactNode, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReactiveRef } from '@utils/react/hooks/state';

import * as THREE from 'three';

type Context2DProps = {
    filtering?: 'nearest' | 'linear';
    children?: ReactNode | ReactNode[];
};

export const Context2D = (props: Context2DProps) => {

    /* Make the renderer, and a canvas ref */
    const [canvasRef, _canvas] = useReactiveRef<HTMLCanvasElement>();
    const gl = useCallback((canvas: HTMLCanvasElement | OffscreenCanvas) => {
        // Create renderer
        const renderer = new THREE.WebGLRenderer({  
            canvas,
            alpha: false,
            depth: true,
            powerPreference: 'default',
        });
        // Check if WebGL2
        /*if (!renderer.capabilities.isWebGL2) {
            throw new Error('This browser does not support WebGL2.');
        }*/
        // Set some params
        renderer.setClearColor(0x252525);
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // Return it
        return renderer;
    }, []);

    /* Return the body */
    return (
        <Canvas flat 
            onContextMenu={(e) => { e.preventDefault(); return false; }}
            ref={canvasRef}
            dpr={window.devicePixelRatio}
            gl={gl}
            camera={{ fov: 75, near: 0.1, far: 1000, position: [25, 25, 25] }}
        >
            { props.children }
        </Canvas>
    );    
};