import { useFlora } from '@app/state/flora';
import { Fieldset, Flex, NumberInput } from '@mantine/core';

const setter = (set: (v: number) => void) => ((v: unknown) => {if (typeof v === 'number') { set(v); }});

export const TrunkEditor = () => {
    /* Read state */
    const [floraSnapshot, flora] = useFlora();

    /* Return the editor */
    return (
        <Fieldset legend='Segments'>
            <Flex direction='row' gap='md'>
                <NumberInput label='Length' value={floraSnapshot.trunk.segmentsLength} onChange={setter((v) => flora.trunk.segmentsLength = v)} />
                <NumberInput label='Radius' value={floraSnapshot.trunk.segmentsRadius} onChange={setter((v) => flora.trunk.segmentsRadius = v)} />
            </Flex>
        </Fieldset>
    );
};