import { Tabs } from '@mantine/core';
import { IconTree } from '@tabler/icons-react';
import { styles } from './Tab.css';
import { MouseEventHandler, useCallback } from 'react';

export const Tab = () => {

    /* Handle context menu */
    const handleContextMenu : MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        /* Stop default event */
        e.preventDefault();
        // TODO !!!
    }, []);

    return (
        <Tabs.Tab 
            value='untitled' 
            leftSection={<IconTree className={styles.icon} />}
            onContextMenu={handleContextMenu}
        >
            untitled
        </Tabs.Tab>
    );
};