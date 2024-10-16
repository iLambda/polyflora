import { useFlora } from '@app/state/Flora';
import { Fieldset, Flex, rem, Text } from '@mantine/core';
import { SkeletonParameters } from '@three/flora/gen/Skeleton';
import { styles } from './TrunkEditor.css';
import { DataControl } from './controls/DataControl';
import { NumberPicker } from './controls/NumberPicker';
import { SelectorPicker } from './controls/SelectorPicker';
import { Separator } from './controls/Separator';
import { TexturePicker } from './controls/TexturePicker';

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
                {/* Length segments */}
                <DataControl label='Segments (length)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsLength} 
                        onChange={v => flora.trunk.segmentsLength = v} 
                        min={1}
                        step={1}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Segments (radius)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsRadius} 
                        onChange={v => flora.trunk.segmentsRadius = v} 
                        min={3}
                        step={1}
                    />
                </DataControl>
                
                <Separator />
                {/* Length segments */}
                <DataControl label='Size (length)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.sizeLength} 
                        onChange={v => flora.trunk.sizeLength = v} 
                        min={0.01}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Size (radius)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.sizeRadius} 
                        onChange={v => flora.trunk.sizeRadius = v} 
                        min={0.01}
                        step={0.1}
                    />
                </DataControl>
            </Fieldset>

            {/* Shape control */}
            <Fieldset legend='Shape' className={styles.fieldset}>
                {/* Curvature */}
                <DataControl label='Curvature' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.curvature} 
                        onChange={v => flora.trunk.curvature = v}  
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
                            value={floraSnapshot.trunk.crinklingMin} 
                            onChange={v => flora.trunk.crinklingMin = v}  
                            min={0}
                            max={flora.trunk.crinklingMax}
                            step={0.25}
                            suffix='°'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={floraSnapshot.trunk.crinklingMax} 
                        onChange={v => flora.trunk.crinklingMax = v}  
                        min={flora.trunk.crinklingMin}
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
                        value={floraSnapshot.trunk.bendDirection}
                        onChange={v => flora.trunk.bendDirection = (v as BendingMode)}
                    />               
                </DataControl>
                <DataControl label='Bend (amount)' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={floraSnapshot.trunk.bendAmount} 
                        onChange={v => flora.trunk.bendAmount = v}  
                        min={-360}
                        max={360}
                        step={1}
                        suffix='°'
                    />
                </DataControl>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Material' className={styles.fieldset}>
                <DataControl label='Tiling (U)'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={floraSnapshot.trunk.tilingU} 
                        onChange={v => flora.trunk.tilingU = v}
                        step={0.1}
                    />
                </DataControl>
                <DataControl label='Tiling (V)'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={floraSnapshot.trunk.tilingV} 
                        onChange={v => flora.trunk.tilingV = v}
                        step={0.1}
                    />
                </DataControl>
                <Separator />
                <TexturePicker 
                    label='Texture'
                    url={floraSnapshot.trunk.textureURL}
                    onURLChanged={v => flora.trunk.textureURL = v}
                />
            </Fieldset>
        </Flex>
    );
};