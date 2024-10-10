import { useFlora } from '@app/state/Flora';
import { Fieldset, Flex, NumberInput, Select } from '@mantine/core';
import { styles } from './TrunkEditor.css';
import { TexturePicker } from '../controls/TexturePicker';
import { MathUtils } from 'three';
import { SkeletonParameters } from '@three/flora/gen/Skeleton';

const setter = (set: (v: number) => void) => ((v: unknown) => {if (typeof v === 'number') { set(v); }});

type BendingMode = SkeletonParameters['bendDirection'];
export const TrunkEditor = () => {
    /* Setup state */
    const [floraSnapshot, flora] = useFlora();
    
    /* Return the editor */
    return (
        <Flex direction='column' gap='sm'>
            {/* Control segments */}
            <Fieldset legend='Geometry' className={styles.fieldset}>
                <Flex direction='row' gap='md'>
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Segments (length)' 
                        size='xs'
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsLength} 
                        onChange={setter((v) => flora.trunk.segmentsLength = Math.max(1, v))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Segments (radius)'
                        size='xs'
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsRadius} 
                        onChange={setter((v) => flora.trunk.segmentsRadius = Math.max(3, v))} 
                    />
                </Flex>
            </Fieldset>
            {/* Control size */}
            <Fieldset legend='Size' className={styles.fieldset}>
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Trunk length' 
                        size='xs'
                        allowNegative={false}
                        value={floraSnapshot.trunk.sizeLength} 
                        onChange={setter((v) => flora.trunk.sizeLength = v)}  
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Trunk radius' 
                        size='xs'
                        allowNegative={false}
                        step={0.1}
                        value={floraSnapshot.trunk.sizeRadius} 
                        onChange={setter((v) => flora.trunk.sizeRadius = v)}  
                    />
                </Flex>
            </Fieldset>
            {/* Shape control */}
            <Fieldset legend='Shape' className={styles.fieldset}>
                {/* Curvature */}
                <NumberInput 
                    label='Curvature' 
                    size='xs'
                    allowNegative={false}
                    step={0.1}
                    value={floraSnapshot.trunk.curvature} 
                    onChange={setter((v) => flora.trunk.curvature = Math.max(0.01, v))}  
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
                        value={floraSnapshot.trunk.crinklingMin} 
                        onChange={setter((v) => flora.trunk.crinklingMin = Math.max(0, Math.min(v, flora.trunk.crinklingMax)))}  
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Crinkling (max)' 
                        size='xs'
                        allowNegative={false}
                        step={0.25}
                        suffix='°'
                        value={floraSnapshot.trunk.crinklingMax} 
                        onChange={setter((v) => flora.trunk.crinklingMax = Math.max(0, Math.max(v, flora.trunk.crinklingMin)))}  
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
                        value={floraSnapshot.trunk.bendDirection}
                        onChange={v => flora.trunk.bendDirection = (v as BendingMode)}
                    />                                        
                    <NumberInput 
                        style={{ flex: 4 }}
                        label='Bend (amount)' 
                        size='xs'
                        suffix='°'
                        allowNegative
                        step={1}
                        value={floraSnapshot.trunk.bendAmount} 
                        onChange={setter((v) => flora.trunk.bendAmount = MathUtils.clamp(v, -360, 360))}  
                    />
                </Flex>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Material' className={styles.fieldset}>
                <Flex direction='row' gap='md'>
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Tiling (U)' 
                        size='xs'
                        step={0.1}
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.tilingU} 
                        onChange={setter((v) => flora.trunk.tilingU = v)} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Tiling (V)'
                        size='xs' 
                        step={0.1}
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.tilingV} 
                        onChange={setter((v) => flora.trunk.tilingV = v)} 
                    />
                </Flex>
                <TexturePicker 
                    label='Texture'
                    url={floraSnapshot.trunk.textureURL}
                    onURLChanged={v => flora.trunk.textureURL = v}
                />
            </Fieldset>
        </Flex>
    );
};