import { FloraData, useFlora } from '@app/state/Flora';
import { Fieldset, Flex, MultiSelect, rem, Text } from '@mantine/core';
import { useMemo } from 'react';
import { styles } from './BranchEditor.css';
import { DataControl } from './controls/DataControl';
import { NumberPicker } from './controls/NumberPicker';
import { SelectorPicker } from './controls/SelectorPicker';
import { Separator } from './controls/Separator';
import { TexturePicker } from './controls/TexturePicker';

type BendingMode = FloraData['branch']['bendDirection'];
type BranchGeometryModes = FloraData['branch']['geometryMode'];
type BranchGeometryMode = BranchGeometryModes[0];
export const BranchEditor = () => {
    /* Setup state */
    const [floraSnapshot, flora] = useFlora();

    /* Return the edit */
    return (
        <Flex direction='column' gap='sm'>
            {/* Control segments */}
            <Fieldset legend='Geometry' className={styles.fieldset}>
                {/* The geometry selection */}
                <MultiSelect
                        size='xs'
                        data={[
                            { label: 'Detail', value: 'detailed' satisfies BranchGeometryMode },
                            { label: 'Cross X', value: 'cross-x' satisfies BranchGeometryMode},
                            { label: 'Cross Y', value: 'cross-y' satisfies BranchGeometryMode },
                        ]}
                        styles={{
                            pillsList: {
                                paddingTop: rem(2),
                            },
                        }}
                        value={useMemo(() => [...floraSnapshot.branch.geometryMode], [floraSnapshot.branch.geometryMode])}
                        onChange={v => flora.branch.geometryMode = (v as BranchGeometryModes)}
                    />
                <Separator />
                {/* # branches */}
                <DataControl label='# branches' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.branch.nArticulations} 
                        min={0}
                        onChange={v => flora.branch.nArticulations = v} 
                    />
                </DataControl>
                <Separator />
                {/* Length segments */}
                <DataControl label='Segments (length)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.branch.segmentsLength} 
                        onChange={v => flora.branch.segmentsLength = v} 
                        min={1}
                        step={1}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Segments (radius)' width={rem(64)}>
                    <NumberPicker
                        disabled={!floraSnapshot.branch.geometryMode.includes('detailed')}
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.branch.segmentsRadius} 
                        onChange={v => flora.branch.segmentsRadius = v} 
                        min={3}
                        step={1}
                    />
                </DataControl>
            </Fieldset>
            {/* Position control */}
            <Fieldset legend='Position distribution' className={styles.fieldset}>
                {/* Method */}
                <DataControl label='Method'>
                    <SelectorPicker
                        defaultValue='random'
                        data={[
                            { value: 'random', label: 'Random' },
                        ]}
                    />  
                </DataControl>
                {/* Angle min */}
                <DataControl label='Angle'>
                    <>
                        <NumberPicker
                            allowDecimal={false}
                            allowNegative={true}
                            value={floraSnapshot.branch.minAngle} 
                            onChange={v => flora.branch.minAngle = v} 
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
                        value={floraSnapshot.branch.maxAngle} 
                        onChange={v => flora.branch.maxAngle = v} 
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
                            value={Math.round(floraSnapshot.branch.minPosition * 100 * 100) / 100} 
                            onChange={v => flora.branch.minPosition = (v / 100)}
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
                        value={Math.round(floraSnapshot.branch.maxPosition * 100 * 100) / 100} 
                        onChange={v => flora.branch.maxPosition = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldset>



            {/* Size control */}
            <Fieldset legend='Size distribution' className={styles.fieldset}>
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
                            value={Math.round(floraSnapshot.branch.minLength * 100 * 100) / 100} 
                            onChange={v => flora.branch.minLength = (v / 100)}
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
                        value={Math.round(floraSnapshot.branch.maxLength * 100 * 100) / 100} 
                        onChange={v => flora.branch.maxLength = (v / 100)}
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
                            disabled={!floraSnapshot.branch.geometryMode.includes('detailed')}
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(floraSnapshot.branch.minRadius * 100 * 100) / 100} 
                            onChange={v => flora.branch.minRadius = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        disabled={!floraSnapshot.branch.geometryMode.includes('detailed')}
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(floraSnapshot.branch.maxRadius * 100 * 100) / 100} 
                        onChange={v => flora.branch.maxRadius = (v / 100)}
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
                            disabled={!(floraSnapshot.branch.geometryMode.includes('cross-x') 
                                    || floraSnapshot.branch.geometryMode.includes('cross-y'))}
                            allowDecimal={true}
                            allowNegative={false}
                            value={Math.round(floraSnapshot.branch.minCrossWidth * 100 * 100) / 100} 
                            onChange={v => flora.branch.minCrossWidth = (v / 100)}
                            min={0}
                            max={100}
                            step={1}
                            suffix='%'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        disabled={!(floraSnapshot.branch.geometryMode.includes('cross-x') 
                                 || floraSnapshot.branch.geometryMode.includes('cross-y'))}
                        allowDecimal={true}
                        allowNegative={false}
                        value={Math.round(floraSnapshot.branch.maxCrossWidth * 100 * 100) / 100} 
                        onChange={v => flora.branch.maxCrossWidth = (v / 100)}
                        min={0}
                        max={100}
                        step={1}
                        suffix='%'
                    />
                </DataControl>
            </Fieldset>

            {/* Shape control */}
            <Fieldset legend='Shape' className={styles.fieldset}>
                {/* Curvature */}
                <DataControl label='Curvature' width={rem(55)}>
                    <NumberPicker
                        disabled={!floraSnapshot.branch.geometryMode.includes('detailed')}
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.branch.curvature} 
                        onChange={v => flora.branch.curvature = v}  
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
                            value={floraSnapshot.branch.crinklingMin} 
                            onChange={v => flora.branch.crinklingMin = v}  
                            min={0}
                            max={flora.branch.crinklingMax}
                            step={0.25}
                            suffix='°'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.branch.crinklingMax} 
                        onChange={v => flora.branch.crinklingMax = v}  
                        min={flora.branch.crinklingMin}
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
                        value={floraSnapshot.branch.bendDirection}
                        onChange={v => flora.branch.bendDirection = (v as BendingMode)}
                    />               
                </DataControl>
                <DataControl label='Bend (amount)' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={floraSnapshot.branch.bendAmount} 
                        onChange={v => flora.branch.bendAmount = v}  
                        min={-360}
                        max={360}
                        step={1}
                        suffix='°'
                    />
                </DataControl>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Material' className={styles.fieldset}>
                <TexturePicker
                    label='Texture'
                    disabled={!(floraSnapshot.branch.geometryMode.includes('cross-x') || floraSnapshot.branch.geometryMode.includes('cross-y'))}
                    url={floraSnapshot.branch.textureURL}
                    onURLChanged={v => flora.branch.textureURL = v}
                />
            </Fieldset>
        </Flex>
    );
};