import { ActionIcon, Flex, rem } from '@mantine/core';
import { IconFocusCentered } from '@tabler/icons-react';
import { styles } from './TreeBlueprintOverlay.css';
import { TreeBlueprint3DViewController } from '@app/blueprint/TreeBlueprint3DView';
import { TreeBlueprintMolecule } from '@app/blueprint/TreeBlueprintState';
import { useMolecule } from 'bunshi/react';
import { useSnapshot } from 'valtio';
import { ShadingSelector } from '@app/blueprint/overlays/ShadingSelector';
import { Toolbar } from '@app/blueprint/overlays/Toolbar';
import { OrientationCube } from '@app/blueprint/overlays/orientation/OrientationCube';

type TreeBlueprintOverlayProps = {
    viewController: TreeBlueprint3DViewController | null;
};

export const TreeBlueprintOverlay = (props: TreeBlueprintOverlayProps) => {

    /* Get store */
    const flora = useMolecule(TreeBlueprintMolecule);
    const floraSnapshot = useSnapshot(flora);

    return [
        /* Shading selector */
        <ShadingSelector
            key='shading-selector'
            value={floraSnapshot.shading}
            onChange={v => flora.shading = v}
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
                p={rem(3)}
                variant='filled' size={rem(30)} radius='xl'
                aria-label='Fit view to content'
                children={<IconFocusCentered stroke={1.4} />} 
                onClick={() => props.viewController?.fitToView?.() }
            />
        </Flex>,

        <Toolbar key='toolbar' />,

        <OrientationCube 
            key='orientation-cube' 
            onDirectionChanged={(dir) => props.viewController?.faceDirection?.(dir)} 
            style={{
                position: 'absolute', 
                top: rem(-8), 
                right: rem(-8),
                pointerEvents: 'auto',
            }} 
        />,
        
    ];
};