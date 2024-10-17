import { FloraData } from '@app/state/Flora';
import { usePolygonCount } from '@app/state/PolygonCount';
import { styles } from '@app/workspace/View.css';
import { Tunnel3D } from '@app/workspace/WorkspaceTunnel';
import { ActionIcon, Flex, Overlay, SegmentedControl, Text } from '@mantine/core';
import { IconCrosshair } from '@tabler/icons-react';
import { Context2D } from '@three/Context2D';

type ViewProps = {
    enabled?: boolean;
};

export const View = (props: ViewProps) => {

    /* Get the triangle count */
    const { verts, tris } = usePolygonCount();

    /* Otherwise, return the context */
    return !props.enabled ? <div className={styles.root} /> : (
        <>
            {/* The 3D view */}
            <Context2D className={styles.root}>
                <Tunnel3D.Out />
            </Context2D>

            {/* The editor overlay */}
            <Overlay className={styles.overlay}>
                <Flex className={styles.overlayRoot}>

                    {/* The vertex counter */}
                    <Flex direction='column'>
                        <Text>{`Vertices: ${verts}`}</Text>
                        <Text>{`Triangles: ${tris}`}</Text>
                    </Flex>

                    {/* Shading selector */}
                    <SegmentedControl
                        style={{
                            position: 'absolute',
                            width: 'fit-content',
                            height: 'fit-content',
                            inset: 'auto auto 0px 0px',
                            pointerEvents: 'all',
                        }}
                        size='sm'
                        radius='xl'
                        color='green'
                        withItemsBorders={false}
                        data={[
                            { value: 'shaded' satisfies FloraData['shading'], label: 'Shaded' },
                            { value: 'wireframe' satisfies FloraData['shading'], label: 'Wireframe' },
                            { value: 'skeletal' satisfies FloraData['shading'], label: 'Skeletal' },
                        ]}
                    />
                
                    {/* Buttons for modifying the view */}
                    <Flex gap='xs' style={{
                        position: 'absolute',
                        width: 'fit-content',
                        height: 'fit-content',
                        inset: 'auto 0px 0px auto',
                    }}>
                        {/* Fit view to content */}
                        <ActionIcon 
                            //className={styles.viewButton} 
                            style={{ pointerEvents: 'all' }}
                            variant='filled' size='lg' radius='xl'
                            aria-label='Fit view to content'
                            children={<IconCrosshair />} 
                        />
                    </Flex>
                </Flex>
            </Overlay>
        </>
    );
};