import { Tabs } from '@mantine/core';
import { IconTree } from '@tabler/icons-react';
import { styles } from './FileTab.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useReactiveRef } from '@utils/react/hooks/state';
import { clsx } from 'clsx';
import { Literal, Record, Static, String } from 'runtypes';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge, Edge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

type FileTabProps = {
    id: string;
    text: string;

    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
    onAuxClick?: MouseEventHandler<HTMLButtonElement>;
};

export const FileTabDragData = Record({ origin: Literal('filetab'), id: String });
export type FileTabDragData = Static<typeof FileTabDragData>;

const parseEdge = (edge: Edge | null) : 'left' | 'right' | null => {
    if (edge === 'left' || edge === 'right') { return edge; }
    return null;
};

export const FileTab = (props: FileTabProps) => {
    /* Get a ref to the DOM object */
    const [elementRef, element] = useReactiveRef<HTMLButtonElement>();
    const [dragged, setDragged] = useState<boolean>(false);
    const [draggedOn, setDraggedOn] = useState<'left' | 'right' | null>(null);
    
    /* Subscribe to drag and drop */
    useEffect(() => {
        // If no element, do nothing
        if (!element) { return; }
        // Make object draggable, and a target
        return combine(
            /* Draggable object properties */
            draggable({
                // The DOM element
                element,
                // Handle state when dragged
                onDragStart: () => setDragged(true),
                onDrop: () => setDragged(false),
                // Generate the preview for the drag
                /* onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: pointerOutsideOfPreview({
                            x: '16px',
                            y: '8px',
                        }),
                        render({ container }) {
                        
                        },
                    });
                }, */
                // The data
                getInitialData: () : FileTabDragData => ({ 
                    origin: 'filetab', id: props.id,
                }),
            }),
            /* Drop target */
            dropTargetForElements({
                // The DOM element
                element,
                // Drop conditions
                canDrop: ({ source }) => {
                    // not allowing dropping on yourself
                    if (source.element === element) { return false; }
                    // only allowing other tabs to be dropped on me
                    return FileTabDragData.guard(source.data);
                },
                // The data contained in the drag and drop
                getData: ({ input }) => 
                    attachClosestEdge(
                        // The data
                        { origin: 'filetab', id: props.id } satisfies FileTabDragData, 
                        // Args
                        {
                            element,
                            input,
                            allowedEdges: ['left', 'right'],
                        },
                    ),

                getIsSticky: () => true,
                onDragEnter : ({ self }) => setDraggedOn(parseEdge(extractClosestEdge(self.data))),
                onDrag : ({ self }) => setDraggedOn(parseEdge(extractClosestEdge(self.data))),
                onDragLeave: () => setDraggedOn(null),
                onDrop: () => setDraggedOn(null),
            }),
        );
    }, [element, setDragged, setDraggedOn, props.id]);


    /* Return the tab */    
    return (
        <Tabs.Tab ref={elementRef}
            value={props.id}
            leftSection={<IconTree className={styles.icon} />}
            onContextMenu={props.onContextMenu}
            onAuxClick={props.onAuxClick}
            className={clsx(dragged && styles.dragged)}
        >
            { props.text }
            { draggedOn && 
                <div className={styles.dragIndicator[draggedOn]} >
                    <div className={styles.dragIndicator.circle} />
                </div>
            }
        </Tabs.Tab>
    );
};