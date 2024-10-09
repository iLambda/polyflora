import { ActionIcon, Flex, Overlay } from '@mantine/core';
import { Context2D } from '@three/Context2D';
import { View, ViewController } from '@three/View';

import { styles } from './Viewer.css';
import { IconCrosshair } from '@tabler/icons-react';
import { useRef } from 'react';
import { ShadingSelect } from './controls/ShadingSelect';
import { useFlora } from '@app/state/Flora';

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
                    <ShadingSelect 
                        className={styles.shadingPanel}
                        shading={floraSnapshot.shading}
                        onChange={v => flora.shading = v}
                    />
                
                    {/* Buttons for modifying the view */}
                    <Flex gap='xs' className={styles.viewPanel}>
                        {/* Fit view to content */}
                        <ActionIcon 
                            className={styles.viewButton} 
                            variant='light' size='lg' radius='xl'
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