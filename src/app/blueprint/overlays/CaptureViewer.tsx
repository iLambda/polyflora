import { FakeBorder } from '@app/ui/controls/FakeBorder';
import { rem, AspectRatio } from '@mantine/core';
import { OrthographicCamera, useTexture, View } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useConstantWithInit } from '@utils/react/hooks/refs';
import { Resizable, ResizeCallback } from 're-resizable';
import { useCallback, useMemo, useState } from 'react';

type CaptureViewer3DSceneProps = {
};
const CaptureViewer3DScene = (props: CaptureViewer3DSceneProps) => {
    const texture = useTexture('Cross01.png');
    const [width, height] = useThree(({ viewport }) => [viewport.width, viewport.height] as const);
    return (
        <>
            <color attach='background' args={['#2b2b2b']} />
            <OrthographicCamera makeDefault near={0} />
            <mesh scale={[width, height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    );
};

export const CaptureViewer = () => {

    /* The width and height of the viewer */
    const defaultSize = useConstantWithInit(() => ({ width: 320, height: 320 + 100 }));
    const [width, setWidth] = useState(defaultSize.width);
    const [height, setHeight] = useState(defaultSize.height);

    return (
        <Resizable
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
                position: 'absolute',
                right: 0,
                top: 0,
                pointerEvents: 'all',
                // backgroundColor: 'var(--mantine-color-body)',
                border: `${rem(1)} solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
                borderRadius: rem(4),
            }}
            defaultSize={defaultSize}
            lockAspectRatio={1}
            lockAspectRatioExtraHeight={100}
            minWidth={100}
            maxWidth={600}
            size={useMemo(() => ({ width, height }), [width, height])}
            onResize={useCallback<ResizeCallback>((e, dir, ref, d) => {
                setWidth(w => w + d.width);
                setHeight(h => h + d.height);
            }, [])}
        >
            <FakeBorder 
                borderX={rem(5)} 
                borderY={rem(5)}
                color='var(--mantine-color-body)'
            >
                <AspectRatio ratio={1} style={{ width:'100%', boxShadow: `inset 0 0 0 1px var(--mantine-color-body)` }}>
                    <View id='mask' style={{ width: '100%', height: '100%', opacity: 0 }} >
                        <CaptureViewer3DScene />
                    </View>
                </AspectRatio>
            </FakeBorder>
            <div style={{ backgroundColor: 'var(--mantine-color-body)', flex: 1, width: '100%' }} />
        </Resizable>
    );
};