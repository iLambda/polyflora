import { ActionIcon, Flex, SegmentedControl } from '@mantine/core';
import { IconCrosshair } from '@tabler/icons-react';
import { styles } from './TreeBlueprintOverlay.css';
import { TreeBlueprint3DViewController } from '@app/blueprint/TreeBlueprint3DView';
import { TreeBlueprintState, TreeBlueprintMolecule } from '@app/blueprint/TreeBlueprintState';
import { useMolecule } from 'bunshi/react';
import { useSnapshot } from 'valtio';

type TreeBlueprintOverlayProps = {
    viewController: TreeBlueprint3DViewController | null;
};

export const TreeBlueprintOverlay = (props: TreeBlueprintOverlayProps) => {

    /* Get store */
    const flora = useMolecule(TreeBlueprintMolecule);
    const floraSnapshot = useSnapshot(flora);

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
                { value: 'shaded' satisfies TreeBlueprintState['shading'], label: 'Shaded' },
                { value: 'wireframe' satisfies TreeBlueprintState['shading'], label: 'Wireframe' },
                { value: 'skeletal' satisfies TreeBlueprintState['shading'], label: 'Skeletal' },
            ]}
            value={floraSnapshot.shading}
            onChange={v => flora.shading = v as TreeBlueprintState['shading']}
        />,

        /* Buttons for modifying the view */
        <Flex 
            key='view-control'
            className={styles.viewControl}
            gap='xs' 
        >
            {/* Fit view to content */}
            <ActionIcon 
                style={{ pointerEvents: 'all' }}
                variant='filled' size='lg' radius='xl'
                aria-label='Fit view to content'
                children={<IconCrosshair />} 
                onClick={() => props.viewController?.fitToView?.() }
            />
        </Flex>,
    ];
};