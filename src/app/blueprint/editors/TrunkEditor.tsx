import { Flex, rem, Text } from '@mantine/core';
import { SkeletonParameters } from '@three/flora/gen/Skeleton';
import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { NumberPicker } from '@app/blueprint/editors/controls/NumberPicker';
import { SelectorPicker } from '@app/blueprint/editors/controls/SelectorPicker';
import { Separator } from '@app/blueprint/editors/controls/Separator';
import { TexturePicker } from '@app/blueprint/editors/controls/TexturePicker';
import { Fieldgroup } from '@app/blueprint/editors/controls/Fieldgroup';
import { TrunkParameters } from '@three/flora/tree/Trunk';
import { useSnapshot } from 'valtio';

type TrunkEditorProps = {
    store: TrunkParameters;
};

type BendingMode = SkeletonParameters['bendDirection'];
export const TrunkEditor = (props: TrunkEditorProps) => {
    /* Setup state */
    const trunk = props.store;
    const trunkSnapshot = useSnapshot(trunk);
    
    /* Return the editor */
    return (
        <Flex direction='column' gap='sm'>
            {/* Control segments */}
            <Fieldgroup legend='Geometry'>
                {/* Length segments */}
                <DataControl label='Segments (length)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={trunkSnapshot.segmentsLength} 
                        onChange={v => trunk.segmentsLength = v} 
                        min={1}
                        step={1}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Segments (radius)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={false}
                        allowNegative={false}
                        value={trunkSnapshot.segmentsRadius} 
                        onChange={v => trunk.segmentsRadius = v} 
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
                        value={trunkSnapshot.sizeLength} 
                        onChange={v => trunk.sizeLength = v} 
                        min={0.01}
                    />
                </DataControl>
                {/* Radius segments */}
                <DataControl label='Size (radius)' width={rem(64)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={trunkSnapshot.sizeRadius} 
                        onChange={v => trunk.sizeRadius = v} 
                        min={0.01}
                        step={0.1}
                    />
                </DataControl>
            </Fieldgroup>

            {/* Shape control */}
            <Fieldgroup legend='Shape'>
                {/* Curvature */}
                <DataControl label='Curvature' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={trunkSnapshot.curvature} 
                        onChange={v => trunk.curvature = v}  
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
                            value={trunkSnapshot.crinklingMin} 
                            onChange={v => trunk.crinklingMin = v}  
                            min={0}
                            max={trunk.crinklingMax}
                            step={0.25}
                            suffix='°'
                        />
                        <Text size='xs'>to</Text>
                    </>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={false}
                        value={trunkSnapshot.crinklingMax} 
                        onChange={v => trunk.crinklingMax = v}  
                        min={trunk.crinklingMin}
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
                        value={trunkSnapshot.bendDirection}
                        onChange={v => trunk.bendDirection = (v as BendingMode)}
                    />               
                </DataControl>
                <DataControl label='Bend (amount)' width={rem(55)}>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={trunkSnapshot.bendAmount} 
                        onChange={v => trunk.bendAmount = v}  
                        min={-360}
                        max={360}
                        step={1}
                        suffix='°'
                    />
                </DataControl>
            </Fieldgroup>
            {/* Texture zone */}
            <Fieldgroup legend='Material'>
                <DataControl label='Tiling (U)'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={trunkSnapshot.tilingU} 
                        onChange={v => trunk.tilingU = v}
                        step={0.1}
                    />
                </DataControl>
                <DataControl label='Tiling (V)'>
                    <NumberPicker
                        allowDecimal={true}
                        allowNegative={true}
                        value={trunkSnapshot.tilingV} 
                        onChange={v => trunk.tilingV = v}
                        step={0.1}
                    />
                </DataControl>
                <Separator />
                <TexturePicker 
                    label='Texture'
                    url={trunkSnapshot.textureURL}
                    onURLChanged={v => trunk.textureURL = v}
                />
            </Fieldgroup>
        </Flex>
    );
};