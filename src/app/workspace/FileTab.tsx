import { Tabs } from '@mantine/core';
import { IconTree } from '@tabler/icons-react';
import { styles } from './FileTab.css';
import { MouseEventHandler, useCallback } from 'react';


type FileTabProps = {
    id: string;
};

export const FileTab = (props: FileTabProps) => {

    /* Handle context menu */
    const handleContextMenu : MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        /* Stop default event */
        e.preventDefault();
        // TODO !!!
    }, []);

    return (
        <Tabs.Tab 
            value={props.id}
            leftSection={<IconTree className={styles.icon} />}
            // onContextMenu={handleContextMenu}
        >
            untitled untitled untitled
        </Tabs.Tab>
    );
};