import { Tabs } from '@mantine/core';
import { IconTree } from '@tabler/icons-react';
import { styles } from './FileTab.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useReactiveRef } from '@utils/react/hooks/state';

type FileTabProps = {
    id: string;
    text: string;

    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
    onAuxClick?: MouseEventHandler<HTMLButtonElement>;
};

export const FileTab = (props: FileTabProps) => {
    /* Get a ref to the DOM object */
    const [elementRef, element] = useReactiveRef<HTMLButtonElement>();
    const [dragging, setDragging] = useState<boolean>(false);
    
    /* Subscribe to drag and drop */
    useEffect(() => {
        // If no element, do nothing
        if (!element) { return; }
        // Make object draggable
        return draggable({
            element: element,
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
        });
    }, [element, setDragging]);


    /* Return the tab */    
    return (
        <Tabs.Tab ref={elementRef}
            value={props.id}
            leftSection={<IconTree className={styles.icon} />}
            onContextMenu={props.onContextMenu}
            onAuxClick={props.onAuxClick}
            style={{ opacity: dragging ? 0.25 : 1 }}
        >
            { props.text }
        </Tabs.Tab>
    );
};