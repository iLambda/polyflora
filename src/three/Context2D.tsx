import { CSSProperties, ReactNode, useCallback } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useReactiveRef } from '@utils/react/hooks/state';

import * as THREE from 'three';

type Context2DProps = {
    filtering?: 'nearest' | 'linear';
    children?: ReactNode | ReactNode[];
    style?: CSSProperties;
    className?: string;
    eventSource?: CanvasProps['eventSource'];
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
            antialias: true,
        });
        // Set some params
        renderer.setClearColor(0x2B2B2B);
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // Return it
        return renderer;
    }, []);

    /* Return the body */
    return (
        <Canvas flat 
            ref={canvasRef}
            dpr={window.devicePixelRatio}
            shadows
            gl={gl}
            style={props.style}
            className={props.className}
            eventSource={props.eventSource}
        >
            { props.children }
        </Canvas>
    );    
};