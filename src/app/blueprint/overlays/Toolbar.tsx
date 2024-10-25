import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { styles } from '@app/blueprint/overlays/Toolbar.css';
import { ActionIcon, Flex, Popover, Switch } from '@mantine/core';
import { IconBulb, IconVideo, IconRuler } from '@tabler/icons-react';

export const Toolbar = () => {

    return (
        /* Overhead buttons */
        <Flex
            key='overhead-controls'
            className={styles.toolbar}
        >   


            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <IconBulb style={{ width: '75%', height: '75%' }} stroke={1.5} />
                    </ActionIcon>
                </Popover.Target>
            <Popover.Dropdown>
                <DataControl label='Enable lighting' width={'fit-content'} >
                    <Switch
                        size='xs'
                        defaultChecked
                    />
                </DataControl>
            </Popover.Dropdown>
            </Popover>

            <ActionIcon variant="light" aria-label="Settings">
                <IconVideo style={{ width: '75%', height: '75%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="light" aria-label="Settings">
                <IconRuler style={{ width: '75%', height: '75%' }} stroke={1.5} />
            </ActionIcon>
        </Flex>
    );
};