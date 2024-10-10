import { ActionIcon, Flex, Overlay, SegmentedControl } from '@mantine/core';
import { Context2D } from '@three/Context2D';
import { View, ViewController } from '@three/View';

import { styles } from './Viewer.css';
import { IconCrosshair } from '@tabler/icons-react';
import { useRef } from 'react';
import { FloraData, useFlora } from '@app/state/Flora';

export const Viewer = () => {
    /* State and references */
    const controllerRef = useRef<ViewController | null>(null);
    const [floraSnapshot, flora] = useFlora();

    return (
        <>
            {/* The 3D context */}
            <Context2D>
                <View 
                    controllerRef={controllerRef}
                    environment={{ 
                        grid: { visibility: 'shown' },
                        lighting: {
                            ambient: { color: 0xffffff, intensity: 0.2 },
                            sun: { color: 0xffffff, intensity: 1 },
                        },
                    }} 
                />
            </Context2D>
            
            {/* The editor overlay */}
            <Overlay className={styles.overlay}>
                <Flex className={styles.overlayRoot}>

                    {/* Shading selector */}
                    <SegmentedControl
                        className={styles.shadingPanel}
                        size='sm'
                        radius='xl'
                        color='green'
                        withItemsBorders={false}
                        data={[
                            { value: 'shaded' satisfies FloraData['shading'], label: 'Shaded' },
                            { value: 'wireframe' satisfies FloraData['shading'], label: 'Wireframe' },
                            { value: 'skeletal' satisfies FloraData['shading'], label: 'Skeletal' },
                        ]}
                        value={floraSnapshot.shading}
                        onChange={v => flora.shading = v as FloraData['shading']}
                    />
                
                    {/* Buttons for modifying the view */}
                    <Flex gap='xs' className={styles.viewPanel}>
                        {/* Fit view to content */}
                        <ActionIcon 
                            className={styles.viewButton} 
                            variant='filled' size='lg' radius='xl'
                            aria-label='Fit view to content'
                            children={<IconCrosshair />} 
                            onClick={ () => controllerRef.current?.fitToView() }
                        />
                    </Flex>

                </Flex>
            </Overlay>
        </>
    );

};