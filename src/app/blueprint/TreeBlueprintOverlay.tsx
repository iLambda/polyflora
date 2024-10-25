import { ActionIcon, Flex, Popover, rem, SegmentedControl, Switch, VisuallyHidden } from '@mantine/core';
import { IconBone, IconBulb, IconCube, IconCube3dSphere, IconFocusCentered, IconRuler, IconVideo } from '@tabler/icons-react';
import { styles } from './TreeBlueprintOverlay.css';
import { TreeBlueprint3DViewController } from '@app/blueprint/TreeBlueprint3DView';
import { TreeBlueprintState, TreeBlueprintMolecule } from '@app/blueprint/TreeBlueprintState';
import { useMolecule } from 'bunshi/react';
import { useSnapshot } from 'valtio';
import { DataControl } from '@app/blueprint/editors/controls/DataControl';

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
                            <IconCube stroke={1.2} />
                            <VisuallyHidden>Shaded</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'wireframe' satisfies TreeBlueprintState['shading'], 
                    label: (
                        <>
                            <IconCube3dSphere stroke={1.2} />
                            <VisuallyHidden>Wireframe</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'skeletal' satisfies TreeBlueprintState['shading'], 
                    label: (
                        <>
                            <IconBone stroke={1.2} />
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
                children={<IconFocusCentered stroke={1.4} />} 
                onClick={() => props.viewController?.fitToView?.() }
            />
        </Flex>,

        /* Overhead buttons */
        <Flex
            key='overhead-controls'
            className={styles.overheadControls}
        >   


            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <IconBulb style={{ width: '75%', height: '75%' }} stroke={1.5} />
                    </ActionIcon>
                </Popover.Target>
            <Popover.Dropdown>
                <DataControl label='Enable lighting' width={'fit-content'} >
                    <Switch
                        size='xs'
                        defaultChecked
                    />
                </DataControl>
            </Popover.Dropdown>
            </Popover>

            <ActionIcon variant="light" aria-label="Settings">
                <IconVideo style={{ width: '75%', height: '75%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="light" aria-label="Settings">
                <IconRuler style={{ width: '75%', height: '75%' }} stroke={1.5} />
            </ActionIcon>
        </Flex>,
    ];
};