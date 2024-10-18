import { FloraData } from '@app/state/Flora';
import { ActionIcon, Flex, SegmentedControl } from '@mantine/core';
import { IconCrosshair } from '@tabler/icons-react';
import { styles } from './TreeBlueprintOverlay.css';

export const TreeBlueprintOverlay = () => {

    return [
        /* Shading selector */
        <SegmentedControl
            key='shading-selector'
            className={styles.shadingSelector}
            size='sm'
            radius='xl'
            color='green'
            withItemsBorders={false}
            data={[
                { value: 'shaded' satisfies FloraData['shading'], label: 'Shaded' },
                { value: 'wireframe' satisfies FloraData['shading'], label: 'Wireframe' },
                { value: 'skeletal' satisfies FloraData['shading'], label: 'Skeletal' },
            ]}
        />,

        /* Buttons for modifying the view */
        <Flex 
            key='view-control'
            className={styles.viewControl}
            gap='xs' 
        >
            {/* Fit view to content */}
            <ActionIcon 
                //className={styles.viewButton} 
                style={{ pointerEvents: 'all' }}
                variant='filled' size='lg' radius='xl'
                aria-label='Fit view to content'
                children={<IconCrosshair />} 
            />
        </Flex>,
    ];
};