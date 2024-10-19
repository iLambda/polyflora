import { Tabs } from '@mantine/core';
import { IconTree } from '@tabler/icons-react';
import { styles } from './FileTab.css';
import { MouseEventHandler } from 'react';


type FileTabProps = {
    id: string;
    text: string;

    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
    onAuxClick?: MouseEventHandler<HTMLButtonElement>;
};

export const FileTab = (props: FileTabProps) => {
    return (
        <Tabs.Tab 
            value={props.id}
            leftSection={<IconTree className={styles.icon} />}
            onContextMenu={props.onContextMenu}
            onAuxClick={props.onAuxClick}
        >
            { props.text }
        </Tabs.Tab>
    );
};