import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { Separator } from '@app/blueprint/editors/controls/Separator';
import { TextPicker } from '@app/blueprint/editors/controls/TextPicker';
import { Container, rem, ActionIcon } from '@mantine/core';
import { IconArrowsShuffle } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

type SeedEditorProps = {
    store: { seed: string },
};

export const SeedEditor = (props: SeedEditorProps) => {
    const seedSnapshot = useSnapshot(props.store);
    const randomizeSeed = useCallback(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        props.store.seed = result;
    }, [props.store]);

    return (
        <Container px={rem(22)} py='xs' m={0}>
            {/* <Fieldgroup> */}
                <DataControl label='Seed' width={rem(160)}>
                    <TextPicker
                        value={seedSnapshot.seed} 
                        onChange={v => props.store.seed = v} 
                    />
                    <ActionIcon 
                        size={rem(21)} 
                        p={rem(3)} 
                        variant='outline'
                        onClick={randomizeSeed}
                    >
                        <IconArrowsShuffle />
                    </ActionIcon>
                </DataControl>
                <Separator mt='xs' />
            {/* </Fieldgroup> */}
        </Container>
    );
};