import { Flex, MultiSelect, rem, Text } from '@mantine/core';
import { useMemo } from 'react';
import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { NumberPicker } from '@app/blueprint/editors/controls/NumberPicker';
import { SelectorPicker } from '@app/blueprint/editors/controls/SelectorPicker';
import { Separator } from '@app/blueprint/editors/controls/Separator';
import { TexturePicker } from '@app/blueprint/editors/controls/TexturePicker';
import { Fieldgroup } from '@app/blueprint/editors/controls/Fieldgroup';
import { BranchesParameters } from '@three/flora/tree/Branches';
import { useSnapshot } from 'valtio';
import { TreeBlueprintState } from '@app/blueprint/TreeBlueprintState';

type BranchEditorProps = {
    store: BranchesParameters & { textureURL: string; };
};

type BendingMode = TreeBlueprintState['branch']['bendDirection'];
type BranchGeometryModes = TreeBlueprintState['branch']['geometryMode'];
type BranchGeometryMode = BranchGeometryModes[0];
export const BranchEditor = (props: BranchEditorProps) => {
    /* Setup state */
    const branches = props.store;
    const branchesSnapshot = useSnapshot(props.store);

    /* Return the edit */
    return (
        <Flex direction='column' gap='sm' my={rem(12)}>
            {/* Control segments */}
            <Fieldgroup legend='Geometry'>
                {/* The geometry selection */}
                <MultiSelect
                        size='xs'
                        data={[
                            { label: 'Detail', value: 'detailed' satisfies BranchGeometryMode },
                            { label: 'Cross X', value: 'cross-x' satisfies BranchGeometryMode},
                            { label: 'Cross Y', value: 'cross-y' satisfies BranchGeometryMode },
                        ]}
                        styles={{
                            input: {
                                height: rem(31),
                            },
                            pillsList: {
                                paddingTop: rem(2),
                            },
                            inputField: {
                                fontSize: '8pt',
                            },                            
                        }}
                        placeholder={branchesSnapshot.geometryMode.length === 0 ? 'Disabled' : ''}
                        value={useMemo(() => [...branchesSnapshot.geometryMode], [branchesSnapshot.geometryMode])}
                        onChange={v => branches.geometryMode = (v as BranchGeometryModes)}
                    />
                <Separator />
                {/* # branches */}
                <DataControl label='# branches' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={branchesSnapshot.nArticulations} 
                        onChange={v => branches.nArticulations = v} 
                        min={0}
                    />
                </DataControl>
                <Separator />
                {/* Length segments */}
                <DataControl label='Segments (length)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={branchesSnapshot.segmentsLength} 
                        onChange={v => branches.segmentsLength = v} 
                        min={1}
                        step={1}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Segments (radius)' width={rem(64)}>
                    <NumberPicker
                        disabled={!branchesSnapshot.geometryMode.includes('detailed')}
                        allowDecimal={false}
                        allowNegative={false}
                        value={branchesSnapshot.segmentsRadius} 
                        onChange={v => branches.segmentsRadius = v} 
                        min={3}
                        step={1}
                    />
                </DataControl>
            </Fieldgroup>
            {/* Position control */}
            <Fieldgroup legend='Position distribution'>
                {/* Method */}
                <DataControl label='Method'>
                    <SelectorPicker
                        defaultValue='random'
                        data={[
                            { value: 'random' satisfies BranchesParameters['distribution'], label: 'Random' },
                        ]}
                        value={branchesSnapshot.distribution}
                        onChange={v => branches.distribution = v as BranchesParameters['distribution']}
                    />  
                </DataControl>
                {/* Angle min */}
                <DataControl label='Angle'>
                    <>
                        <NumberPicker
                            allowDecimal={false}
                            allowNegative={true}
                            value={branchesSnapshot.minAngle} 
                            onChange={v => branches.minAngle = v} 
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
                        value={branchesSnapshot.maxAngle} 
                        onChange={v => branches.maxAngle = v} 
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
                            value={Math.round(branchesSnapshot.minPosition * 100 * 100) / 100} 
                            onChange={v => branches.minPosition = (v / 100)}
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
                        value={Math.round(branchesSnapshot.maxPosition * 100 * 100) / 100} 
                        onChange={v => branches.maxPosition = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldgroup>



            {/* Size control */}
            <Fieldgroup legend='Size distribution'>
                {/* Method */}
                {/* <Select
                    size='xs'
                    label='Method'
                    defaultValue='random'
                    data={[
                        { value: 'random', label: 'Random' },
                    ]}
                />   */}
                {/* Length (min) */}
                <DataControl label='Length'>
                    <>
                        <NumberPicker
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(branchesSnapshot.minLength * 100 * 100) / 100} 
                            onChange={v => branches.minLength = (v / 100)}
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
                        value={Math.round(branchesSnapshot.maxLength * 100 * 100) / 100} 
                        onChange={v => branches.maxLength = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>

                {/* Radius (min) */}
                <DataControl label='Radius'>
                    <>
                        <NumberPicker
                            disabled={!branchesSnapshot.geometryMode.includes('detailed')}
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(branchesSnapshot.minRadius * 100 * 100) / 100} 
                            onChange={v => branches.minRadius = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        disabled={!branchesSnapshot.geometryMode.includes('detailed')}
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(branchesSnapshot.maxRadius * 100 * 100) / 100} 
                        onChange={v => branches.maxRadius = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
                
                {/* Cross width (min) */}
                <DataControl label='Cross width'>
                    <>
                        <NumberPicker
                            disabled={!(branchesSnapshot.geometryMode.includes('cross-x') 
                                    || branchesSnapshot.geometryMode.includes('cross-y'))}
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(branchesSnapshot.minCrossWidth * 100 * 100) / 100} 
                            onChange={v => branches.minCrossWidth = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        disabled={!(branchesSnapshot.geometryMode.includes('cross-x') 
                                 || branchesSnapshot.geometryMode.includes('cross-y'))}
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(branchesSnapshot.maxCrossWidth * 100 * 100) / 100} 
                        onChange={v => branches.maxCrossWidth = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldgroup>

            {/* Shape control */}
            <Fieldgroup legend='Shape'>
                {/* Curvature */}
                <DataControl label='Curvature' width={rem(55)}>
                    <NumberPicker
                        disabled={!branchesSnapshot.geometryMode.includes('detailed')}
                        allowDecimal={true}
                        allowNegative={false}
                        value={branchesSnapshot.curvature} 
                        onChange={v => branches.curvature = v}  
                        min={0.01}
                        max={50}
                        step={0.1}
                    />
                </DataControl>
                {/* Crinlking */}
                <DataControl label='Crinkling'>
                    <>
                        <NumberPicker
                            allowDecimal={true}
                            allowNegative={false}
                            value={branchesSnapshot.crinklingMin} 
                            onChange={v => branches.crinklingMin = v}  
                            min={0}
                            max={branches.crinklingMax}
                            step={0.25}
                            suffix='°'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={branchesSnapshot.crinklingMax} 
                        onChange={v => branches.crinklingMax = v}  
                        min={branches.crinklingMin}
                        max={360}
                        step={0.25}
                        suffix='°'
                    />
                </DataControl>
                <Separator />
                {/* Bending control */}
                <DataControl label='Bend (direction)'>
                    <SelectorPicker
                        style={{ flex: 5 }}
                        data={[
                            { value: 'up' satisfies BendingMode, label: 'Up' },
                            { value: 'down' satisfies BendingMode, label: 'Down' },
                            { value: 'normal' satisfies BendingMode, label: 'Normal' },
                        ]}
                        value={branchesSnapshot.bendDirection}
                        onChange={v => branches.bendDirection = (v as BendingMode)}
                    />               
                </DataControl>
                <DataControl label='Bend (amount)' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={branchesSnapshot.bendAmount} 
                        onChange={v => branches.bendAmount = v}  
                        min={-360}
                        max={360}
                        step={1}
                        suffix='°'
                    />
                </DataControl>
            </Fieldgroup>
            {/* Texture zone */}
            <Fieldgroup legend='Material'>
                <TexturePicker
                    label='Texture'
                    blobLibraryID='branches'
                    disabled={!(branchesSnapshot.geometryMode.includes('cross-x') || branchesSnapshot.geometryMode.includes('cross-y'))}
                    url={branchesSnapshot.textureURL}
                    onURLChanged={v => branches.textureURL = v}
                />
            </Fieldgroup>
        </Flex>
    );
};