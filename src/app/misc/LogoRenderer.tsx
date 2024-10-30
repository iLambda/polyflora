import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Logo } from '@three/debug/Logo';
import { CSSProperties, ForwardedRef, forwardRef, Suspense } from 'react';

type LogoRendererProps = {
    style?: CSSProperties;
};

export const LogoRenderer = forwardRef((props: LogoRendererProps, ref: ForwardedRef<HTMLCanvasElement>) => (
    <Canvas flat 
        dpr={window.devicePixelRatio}
        camera={{ fov: 20, near: 0.1, far: 5000, position: [25, 50, 25] }}
        style={props.style}
        ref={ref}
    >   
        <CameraControls 
            makeDefault 
            truckSpeed={0}
        />
        <Suspense>
            <Logo />
        </Suspense>
    </Canvas>
));