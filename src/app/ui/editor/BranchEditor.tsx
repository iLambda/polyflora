import { FloraData, useFlora } from '@app/state/Flora';
import { Fieldset, Flex, NumberInput, rem, Select } from '@mantine/core';
import { styles } from './BranchEditor.css';
import { TexturePicker } from '../controls/TexturePicker';
import { MathUtils } from 'three';

const setter = (set: (v: number) => void) => ((v: unknown) => {if (typeof v === 'number') { set(v); }});

type BendingMode = FloraData['branch']['bendDirection'];
type BranchGeometryMode = FloraData['branch']['geometryMode'];
export const BranchEditor = () => {
    /* Setup state */
    const [floraSnapshot, flora] = useFlora();

    /* Return the edit */
    return (
        <Flex direction='column' gap='sm'>
            {/* Control segments */}
            <Fieldset legend='Geometry' className={styles.fieldset} style={{ marginTop: rem(2) }}>
                <Flex direction='row' gap='md'>
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='# Branches' 
                        size='xs'
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.branch.nArticulations} 
                        onChange={setter((v) => flora.branch.nArticulations = Math.max(0, v))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='# Sub-branches'
                        size='xs' 
                        step={0.5}
                        allowDecimal={false}
                        allowNegative={false}
                    />
                </Flex>
                <Select
                    size='xs'
                    label='Mode'
                    data={[
                        { value: 'detailed' satisfies BranchGeometryMode, label: 'Detailed' },
                        { value: 'cross-xy' satisfies BranchGeometryMode, label: 'Cross (XY)' },
                        { value: 'cross-x' satisfies BranchGeometryMode, label: 'Cross (X)' },
                        { value: 'cross-y' satisfies BranchGeometryMode, label: 'Cross (Y)' },
                    ]}
                    value={floraSnapshot.branch.geometryMode}
                    onChange={v => flora.branch.geometryMode = (v as BranchGeometryMode)}
                />  
                <Flex direction='row' gap='md'>
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Segments (length)' 
                        size='xs'
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.branch.segmentsLength} 
                        onChange={setter((v) => flora.branch.segmentsLength = Math.max(0, v))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Segments (radius)'
                        size='xs' 
                        step={0.5}
                        allowDecimal={false}
                        allowNegative={false}
                        disabled={floraSnapshot.branch.geometryMode !== 'detailed'}
                        value={floraSnapshot.branch.segmentsRadius} 
                        onChange={setter((v) => flora.branch.segmentsRadius = Math.max(0, v))} 
                    />
                </Flex>
            </Fieldset>
            {/* Position control */}
            <Fieldset legend='Position distribution' className={styles.fieldset}>
                {/* Method */}
                <Select
                    size='xs'
                    label='Method'
                    defaultValue='random'
                    data={[
                        { value: 'random', label: 'Random' },
                    ]}
                />  
                {/* Angle */}
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Angle (min)' 
                        size='xs'
                        allowNegative={false}
                        step={0.25}
                        suffix='°'
                        value={floraSnapshot.branch.minAngle} 
                        onChange={setter((v) => flora.branch.minAngle = MathUtils.clamp(v, -360, 360))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Angle (max)' 
                        size='xs'
                        allowNegative={false}
                        step={0.25}
                        suffix='°'
                        value={floraSnapshot.branch.maxAngle} 
                        onChange={setter((v) => flora.branch.maxAngle = MathUtils.clamp(v, -360, 360))} 
                    />
                </Flex>
                {/* Position control */}
                  <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Position (min)' 
                        size='xs'
                        allowNegative={false}
                        suffix='%'
                        value={Math.round(floraSnapshot.branch.minPosition * 100 * 100) / 100} 
                        onChange={setter((v) => flora.branch.minPosition = MathUtils.clamp(v/100, 0, 1))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Position (max)' 
                        size='xs'
                        allowNegative={false}
                        suffix='%'
                        value={Math.round(floraSnapshot.branch.maxPosition * 100 * 100) / 100} 
                        onChange={setter((v) => flora.branch.maxPosition = MathUtils.clamp(v/100, 0, 1))} 
                    />
                </Flex>
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
                {/* Angle */}
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Length (min)' 
                        size='xs'
                        allowNegative={false}
                        suffix='%'
                        value={Math.round(floraSnapshot.branch.minLength * 100 * 100) / 100} 
                        onChange={setter((v) => flora.branch.minLength = MathUtils.clamp(v/100, 0, 1))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Length (max)' 
                        size='xs'
                        allowNegative={false}
                        suffix='%'
                        value={Math.round(floraSnapshot.branch.maxLength * 100 * 100) / 100} 
                        onChange={setter((v) => flora.branch.maxLength = MathUtils.clamp(v/100, 0, 1))} 
                    />
                </Flex>
                {/* Radius / Crossplane width */}
                {
                    floraSnapshot.branch.geometryMode === 'detailed' 
                        // Radius 
                        ? (<Flex direction='row' gap='md' >
                            <NumberInput 
                                style={{ flex: 1 }}
                                label='Radius (min)' 
                                size='xs'
                                allowNegative={false}
                                suffix='%'
                                value={Math.round(floraSnapshot.branch.minRadius * 100 * 100) / 100} 
                                onChange={setter((v) => flora.branch.minRadius = MathUtils.clamp(v/100, 0, 1))} 
                            />
                            <NumberInput 
                                style={{ flex: 1 }}
                                label='Radius (max)' 
                                size='xs'
                                allowNegative={false}
                                suffix='%'
                                value={Math.round(floraSnapshot.branch.maxRadius * 100 * 100) / 100} 
                                onChange={setter((v) => flora.branch.maxRadius = MathUtils.clamp(v/100, 0, 1))} 
                            />
                        </Flex>)
                        // Cross
                        : (<Flex direction='row' gap='md' >
                            <NumberInput 
                                style={{ flex: 1 }}
                                label='Cross width (min)' 
                                size='xs'
                                allowNegative={false}
                                suffix='%'
                                value={Math.round(floraSnapshot.branch.minCrossWidth * 100 * 100) / 100} 
                                onChange={setter((v) => flora.branch.minCrossWidth = MathUtils.clamp(v/100, 0, 1))} 
                            />
                            <NumberInput 
                                style={{ flex: 1 }}
                                label='Cross width (max)' 
                                size='xs'
                                allowNegative={false}
                                suffix='%'
                                value={Math.round(floraSnapshot.branch.maxCrossWidth * 100 * 100) / 100} 
                                onChange={setter((v) => flora.branch.maxCrossWidth = MathUtils.clamp(v/100, 0, 1))} 
                            />
                        </Flex>)
                }
            </Fieldset>


            
            {/* Shape control */}
            <Fieldset legend='Shape' className={styles.fieldset}>
                {/* Curvature */}
                <NumberInput 
                    label='Curvature' 
                    size='xs'
                    allowNegative={false}
                    step={0.1}
                    value={floraSnapshot.branch.curvature} 
                    onChange={setter((v) => flora.branch.curvature = Math.max(0.01, v))}  
                />
                {/* Crinlking */}
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Crinkling (min)' 
                        size='xs'
                        allowNegative={false}
                        step={0.25}
                        suffix='°'
                        value={floraSnapshot.branch.crinklingMin} 
                        onChange={setter((v) => flora.branch.crinklingMin = Math.max(0, Math.min(v, flora.branch.crinklingMax)))}  
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Crinkling (max)' 
                        size='xs'
                        allowNegative={false}
                        step={0.25}
                        suffix='°'
                        value={floraSnapshot.branch.crinklingMax} 
                        onChange={setter((v) => flora.branch.crinklingMax = Math.max(0, Math.max(v, flora.branch.crinklingMin)))}  
                    />
                </Flex>
                {/* Bending control */}
                <Flex direction='row' gap='md' >
                    <Select
                        style={{ flex: 5 }}
                        size='xs'
                        label='Bend (direction)'
                        data={[
                            { value: 'up' satisfies BendingMode, label: 'Up' },
                            { value: 'down' satisfies BendingMode, label: 'Down' },
                            { value: 'normal' satisfies BendingMode, label: 'Normal' },
                        ]}
                        value={floraSnapshot.branch.bendDirection}
                        onChange={v => flora.branch.bendDirection = (v as BendingMode)}
                    />                                        
                    <NumberInput 
                        style={{ flex: 4 }}
                        label='Bend (amount)' 
                        size='xs'
                        suffix='°'
                        allowNegative
                        step={1}
                        value={floraSnapshot.branch.bendAmount} 
                        onChange={setter((v) => flora.branch.bendAmount = MathUtils.clamp(v, -360, 360))}  
                    />
                </Flex>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Texture'>
                <TexturePicker
                    disabled={floraSnapshot.branch.geometryMode === 'detailed'}
                    url={floraSnapshot.branch.textureURL}
                    onURLChanged={v => flora.branch.textureURL = v}
                />
            </Fieldset>
        </Flex>
    );
};