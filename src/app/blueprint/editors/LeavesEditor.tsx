import { Flex, MultiSelect, rem, Text } from '@mantine/core';
import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { NumberPicker } from '@app/blueprint/editors/controls/NumberPicker';
import { SelectorPicker } from '@app/blueprint/editors/controls/SelectorPicker';
import { Separator } from '@app/blueprint/editors/controls/Separator';
import { TexturePicker } from '@app/blueprint/editors/controls/TexturePicker';
import { Fieldgroup } from '@app/blueprint/editors/controls/Fieldgroup';
import { useSnapshot } from 'valtio';
import { TreeBlueprintState } from '@app/blueprint/TreeBlueprintState';
import { PalettePicker } from '@app/blueprint/editors/controls/PalettePicker';
import { useCallback, useMemo } from 'react';
import { ArrayElement } from '@utils/types';
import { LeavesParameters } from '@three/flora/tree/Leaves';

type LeavesEditorProps = {
    store: TreeBlueprintState['leaves'];
};

type LeavesGenerationEnabled = ArrayElement<TreeBlueprintState['leaves']['enabled']>;

export const LeavesEditor = (props: LeavesEditorProps) => {
    /* Setup state */
    const leaves = props.store;
    const leavesSnapshot = useSnapshot(props.store);

    /* Return the edit */
    return (
        <Flex direction='column' gap='sm' my={rem(12)}>
            {/* Control segments */}
            <Fieldgroup legend='Geometry'>
                {/* Enabled ? */}
                <MultiSelect
                        size='xs'
                        data={[
                            { label: 'Trunk', value: 'trunk' satisfies LeavesGenerationEnabled },
                            { label: 'Branches', value: 'branches' satisfies LeavesGenerationEnabled },
                        ]}
                        styles={{
                            input: {
                                height: rem(31),
                            },
                            pillsList: {
                                paddingTop: rem(2),
                            },
                        }}
                        value={useMemo(() => [...leavesSnapshot.enabled], [leavesSnapshot.enabled])}
                        onChange={v => leaves.enabled = (v as LeavesGenerationEnabled[])}
                    />
                
                <Separator />

                {/* # branches */}
                <DataControl label='# leaves' width={rem(64)}>
                    <NumberPicker
                        disabled={!(leavesSnapshot.enabled.length > 0)}
                        allowDecimal={false}
                        allowNegative={false}
                        value={leavesSnapshot.nArticulations} 
                        onChange={v => leaves.nArticulations = v} 
                        min={0}
                    />
                </DataControl>
            </Fieldgroup>
            {/* Position control */}
            <Fieldgroup legend='Position distribution' disabled={!(leavesSnapshot.enabled.length > 0)}>
                {/* Orientation space  */}
                <DataControl label='Orientation'>
                    <SelectorPicker
                        defaultValue='local'
                        data={[
                            { value: 'local' satisfies LeavesParameters['orientationSpace'], label: 'Local' },
                            { value: 'world' satisfies LeavesParameters['orientationSpace'], label: 'World' },
                        ]}
                        value={leavesSnapshot.orientationSpace}
                        onChange={v => leaves.orientationSpace = v as LeavesParameters['orientationSpace']}
                    />
                </DataControl>
                <Separator />

                {/* Method */}
                <DataControl label='Method'>
                    <SelectorPicker
                        defaultValue='random'
                        data={[
                            { value: 'random' satisfies LeavesParameters['distribution'], label: 'Random' },
                        ]}
                    />  
                </DataControl>
                {/* Angle min */}
                <DataControl label='Angle'>
                    <>
                        <NumberPicker
                            allowDecimal={false}
                            allowNegative={true}
                            value={leavesSnapshot.minAngle} 
                            onChange={v => leaves.minAngle = v} 
                            min={-360}
                            max={360}
                            step={0.25}
                            suffix='°'
                            />    
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={true}
                        value={leavesSnapshot.maxAngle} 
                        onChange={v => leaves.maxAngle = v} 
                        min={-360}
                        max={360}
                        step={0.25}
                        suffix='°'
                    />
                </DataControl>
                {/* Position min */}
                <DataControl label='Position'>
                    <>
                        <NumberPicker
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(leavesSnapshot.minPosition * 100 * 100) / 100} 
                            onChange={v => leaves.minPosition = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(leavesSnapshot.maxPosition * 100 * 100) / 100} 
                        onChange={v => leaves.maxPosition = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldgroup>



            {/* Size control */}
            <Fieldgroup legend='Size distribution' disabled={!(leavesSnapshot.enabled.length > 0)}>
                {/* Base size */}
                <DataControl label='Base size'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={leavesSnapshot.sizeWidth} 
                        onChange={v => leaves.sizeWidth = v}
                        min={0}
                        step={0.05}
                    />
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={leavesSnapshot.sizeHeight} 
                        onChange={v => leaves.sizeHeight = v}
                        min={0}
                        step={0.05}
                    />
                </DataControl>
                {/* Size variation */}
                <DataControl label='Variation'>
                    <>
                        <NumberPicker
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(leavesSnapshot.minSize * 100 * 100) / 100} 
                            onChange={v => leaves.minSize = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(leavesSnapshot.maxSize * 100 * 100) / 100} 
                        onChange={v => leaves.maxSize = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldgroup>

            {/* Palette */}
            <Fieldgroup legend='Palette' disabled={!(leavesSnapshot.enabled.length > 0)}>
                <PalettePicker 
                    palette={leavesSnapshot.palette}
                    onPaletteChanged={v => leaves.palette = v}
                    disabled={!(leavesSnapshot.enabled.length > 0)}
                />  
            </Fieldgroup>

            {/* Texture zone */}
            <Fieldgroup legend='Material' disabled={!(leavesSnapshot.enabled.length > 0)}>
                <DataControl label='Pivot'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={leavesSnapshot.texturePivotU} 
                        onChange={v => leaves.texturePivotU = v}
                        step={0.1}
                    />
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={leavesSnapshot.texturePivotV} 
                        onChange={v => leaves.texturePivotV = v}
                        step={0.1}
                    />
                </DataControl>
                <Separator />
                <TexturePicker 
                    label='Texture'
                    blobLibraryID='trunk'
                    url={leavesSnapshot.textureURL}
                    onURLChanged={v => leaves.textureURL = v}
                    disabled={!(leavesSnapshot.enabled.length > 0)}
                    pivot={useMemo(() => ({ x: leavesSnapshot.texturePivotU, y: 1 - leavesSnapshot.texturePivotV })
                                    , [leavesSnapshot.texturePivotU, leavesSnapshot.texturePivotV])}
                    onPivotChanged={useCallback((v: {x: number, y: number}) => {
                        leaves.texturePivotU = v.x;
                        leaves.texturePivotV = 1.0 - v.y;
                    }, [leaves])}
                />
            </Fieldgroup>
        </Flex>
    );
};