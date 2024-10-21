import { Tabs } from '@mantine/core';
import { IconSeeding } from '@tabler/icons-react';
import { styles } from './FileTab.css';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useReactiveRef } from '@utils/react/hooks/state';
import { clsx } from 'clsx';
import { Literal, Record, Static, String } from 'runtypes';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { attachClosestEdge, Edge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { FunctionTyped } from '@utils/runtypes';

type FileTabProps = {
    id: string;
    text: string;

    onContextMenu?: MouseEventHandler<HTMLButtonElement>;
    onAuxClick?: MouseEventHandler<HTMLButtonElement>;
};

export type FileTabDragData = Static<typeof FileTabDragData>;
export const FileTabDragData = Record({ 
    origin: Literal('filetab'), 
    id: String,
    onDragInteractionOver: FunctionTyped<(was: 'source' | 'target') => void>(),
});

const parseEdge = (edge: Edge | null) : 'left' | 'right' | null => {
    if (edge === 'left' || edge === 'right') { return edge; }
    return null;
};

export const FileTab = (props: FileTabProps) => {
    /* Get a ref to the DOM object */
    const [elementRef, element] = useReactiveRef<HTMLButtonElement>();
    const [dragged, setDragged] = useState<boolean>(false);
    const [draggedOn, setDraggedOn] = useState<'left' | 'right' | null>(null);
    const [draggedInAnimationState, setDraggedInAnimationState] = useState<boolean>(false);
    const [colorFlashAnimationState, setColorFlashAnimationState] = useState<boolean>(false);

    /* Handle when this tab is done interacting with something, successfully */
    const handleDragInteractionOver = useCallback((was: 'source' | 'target') => {
        /* If we were a source, do a little animation to show that we have been dropped */
        if (was === 'source') { 
            setDraggedInAnimationState(true); 
            setColorFlashAnimationState(true);
        }
    }, [setDraggedInAnimationState, setColorFlashAnimationState]);
    
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
                // The data
                getInitialData: () : FileTabDragData => ({ 
                    origin: 'filetab', 
                    id: props.id,
                    onDragInteractionOver: handleDragInteractionOver,
                }),
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
                        { 
                            origin: 'filetab', 
                            id: props.id,
                            onDragInteractionOver: handleDragInteractionOver,
                        } satisfies FileTabDragData, 
                        // Args
                        {
                            element,
                            input,
                            allowedEdges: ['left', 'right'],
                        },
                    ),
                // Do things when we're done
                getIsSticky: () => true,
                onDragEnter : ({ self }) => setDraggedOn(parseEdge(extractClosestEdge(self.data))),
                onDrag : ({ self }) => setDraggedOn(parseEdge(extractClosestEdge(self.data))),
                onDragLeave: () => setDraggedOn(null),
                onDrop: () => setDraggedOn(null),
            }),
        );
    }, [element, setDragged, setDraggedOn, props.id, handleDragInteractionOver]);


    /* Return the tab */    
    return (
        <Tabs.Tab ref={elementRef}
            value={props.id}
            leftSection={<IconSeeding className={styles.icon} />}
            onContextMenu={props.onContextMenu}
            onAuxClick={props.onAuxClick}
            className={clsx(
                draggedInAnimationState && styles.animations.draggedIn, 
                dragged && styles.dragged,
            )}
            onAnimationEnd={() => setDraggedInAnimationState(false)}
        >
            {
                colorFlashAnimationState && 
                <div 
                    className={clsx(styles.colorFlasher, 
                        colorFlashAnimationState && styles.animations.colorFlash,
                    )} 
                    onAnimationEnd={() => setColorFlashAnimationState(false)}
                />
            }
            { draggedOn && 
                <div className={styles.dragIndicator[draggedOn]} >
                    <div className={styles.dragIndicator.circle} />
                </div>
            }
            { props.text }
        </Tabs.Tab>
    );
};