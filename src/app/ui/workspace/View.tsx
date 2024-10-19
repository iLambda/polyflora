import { usePolygonCount } from '@three/utils/PolygonCount';
import { styles } from '@app/ui/workspace/View.css';
import { Tunnel3D, Tunnel3DOverlay } from '@app/ui/workspace/WorkspaceTunnel';
import { Flex, Overlay, Text } from '@mantine/core';
import { Context2D } from '@three/Context2D';
import { ReactNode } from 'react';

type ViewProps = {
    enabled?: boolean;
    children?: ReactNode | ReactNode[];
};

export const View = (props: ViewProps) => {

    /* Get the triangle count */
    const { verts, tris } = usePolygonCount();

    /* Otherwise, return the context */
    return !props.enabled ? <div className={styles.root} /> : (
        <>
            {/* The 3D view */}
            <Context2D className={styles.root}>
                { props.children }
                <Tunnel3D.Out />
            </Context2D>

            {/* The editor overlay */}
            <Overlay className={styles.overlay}>
                <Flex className={styles.overlayRoot}>
                    {/* The vertex counter */}
                    <Flex direction='column'>
                        <Text size='xs'>{`Vertices: ${verts}`}</Text>
                        <Text size='xs'>{`Triangles: ${tris}`}</Text>
                    </Flex>
                    {/* The output of the tunnel */}
                    <Tunnel3DOverlay.Out />
                </Flex>
            </Overlay>
        </>
    );
};