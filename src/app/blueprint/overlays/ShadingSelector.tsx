import { styles } from '@app/blueprint/overlays/ShadingSelector.css';
import { TreeBlueprintState } from '@app/blueprint/TreeBlueprintState';
import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import { IconBone, IconCube, IconCube3dSphere } from '@tabler/icons-react';

type Shading = TreeBlueprintState['shading'];

export type ShadingProps = {
    value: Shading;
    onChange: (v: Shading) => void;
};

export const ShadingSelector = (props: ShadingProps) => {
    return (
        <SegmentedControl
            key='shading-selector'
            classNames={styles.shadingSelector}
            size='xs'
            radius='xl'
            color='green'
            withItemsBorders={false}
            data={[
                { 
                    value: 'shaded' satisfies Shading, 
                    label: (
                        <>
                            <IconCube stroke={1.2} />
                            <VisuallyHidden>Shaded</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'wireframe' satisfies Shading, 
                    label: (
                        <>
                            <IconCube3dSphere stroke={1.2} />
                            <VisuallyHidden>Wireframe</VisuallyHidden>
                        </>
                    ),
                },
                { 
                    value: 'skeletal' satisfies Shading, 
                    label: (
                        <>
                            <IconBone stroke={1.2} />
                            <VisuallyHidden>Skeletal</VisuallyHidden>
                        </>
                    ),
                },
            ]}
            value={props.value}
            onChange={v => props.onChange(v as Shading)}
        />
    );
};