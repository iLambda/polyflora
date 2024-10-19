import { ActionIcon, Flex, rem, SegmentedControl, VisuallyHidden } from '@mantine/core';
import { IconBone, IconCube, IconCube3dSphere, IconFocusCentered } from '@tabler/icons-react';
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
            classNames={styles.shadingSelector}
            size='xs'
            radius='xl'
            color='green'
            withItemsBorders={false}
            data={[
                { 
                    value: 'shaded' satisfies TreeBlueprintState['shading'], 
                    label: (
                        <>
                            <IconCube stroke={1.6} />
                            <VisuallyHidden>Shaded</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'wireframe' satisfies TreeBlueprintState['shading'], 
                    label: (
                        <>
                            <IconCube3dSphere stroke={1.6} />
                            <VisuallyHidden>Wireframe</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'skeletal' satisfies TreeBlueprintState['shading'], 
                    label: (
                        <>
                            <IconBone stroke={1.6} />
                            <VisuallyHidden>Skeletal</VisuallyHidden>
                        </>
                    ),
                },
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
                p={rem(3)}
                variant='filled' size={rem(30)} radius='xl'
                aria-label='Fit view to content'
                children={<IconFocusCentered stroke={2} />} 
                onClick={() => props.viewController?.fitToView?.() }
            />
        </Flex>,
    ];
};