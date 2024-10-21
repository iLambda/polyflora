import { Flex, ScrollArea, Tabs, Transition } from '@mantine/core';
import { styles } from './FileTabs.css';
import { FileTab, FileTabDragData } from './FileTab';
import { MouseEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { useIdempotentState } from '@utils/react/hooks/state';
import { IconBrowserX, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { isOverflown } from '@utils/dom';
import useResizeObserver from '@react-hook/resize-observer';
import { useMolecule } from 'bunshi/react';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { useSnapshot } from 'valtio';

export const FileTabs = () => {
    
    /* Get documents data */
    const documents = useMolecule(DocumentStoreMolecule);
    const documentsSnapshot = useSnapshot(documents);
    
    /* Compute the tabs data */
    const tabsData = useMemo(() => documentsSnapshot.order.map(
        id => ({ id, label: documentsSnapshot.data.get(id)?.name ?? '[ERROR]' }),
    ), [documentsSnapshot.data, documentsSnapshot.order]);

    /* Get the ref for the scrolling viewport */
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const flexbarRef = useRef<HTMLDivElement | null>(null);

    /* Store if we are at the end or start of scroll for stickys */
    const [isAtEnd, setAtEnd] = useIdempotentState(false);
    const [isAtStart, setAtStart] = useIdempotentState(true);
    /* Check if we are overflowing */
    const isOverflowing = viewportRef.current ? isOverflown('x', viewportRef.current) : false;

    /* Update floating indicators */
    const updateFloatingIndicators = useCallback(() => {
        if (!viewportRef.current) { return; }
        setAtStart(viewportRef.current.scrollLeft === 0);
        setAtEnd(viewportRef.current.scrollLeft >= (viewportRef.current.scrollWidth - viewportRef.current.clientWidth));
    }, [setAtStart, setAtEnd]);

    /* After render / on resize, try to see if we need to update the indicators */
    useEffect(updateFloatingIndicators);
    useResizeObserver(flexbarRef, updateFloatingIndicators);

    /* Get document store */
    const documentStore = useMolecule(DocumentStoreMolecule);
    
    /* Prepare a context menu */
    const { showContextMenu } = useContextMenu();
    const showTabContextMenu = useCallback((documentID: string) => showContextMenu([
        {
            key: 'close',
            title: 'Close',
            icon: <IconBrowserX size={16} />,
            onClick: () => { documentStore.close(documentID); },
        },
    ]), [showContextMenu, documentStore]);

    /* Handle the aux click */
    const handleAuxClick = useCallback((documentID: string) : MouseEventHandler<HTMLButtonElement> => e => {
        /* Check if auxclick is from middle mouse */
        if (e.button !== 1) { return; }
        if ('pointerType' in e && typeof e.pointerType === 'string' && e.pointerType !== 'mouse') { return; }
        /* Close */
        documentStore.close(documentID);        
    }, [documentStore]);

    /* Drag and drop */
    useEffect(() => monitorForElements({
        // Only allow monitoring if this is FileTab data
        canMonitor: ({ source }) => FileTabDragData.guard(source.data),
        // Handle drop
        onDrop: ({ location, source }) => {
            // Get first drop target
            const target = location.current.dropTargets[0];
            if (!target) { return; }
            // Get data and ensure type
            const sourceData = source.data;
            const targetData = target.data;
            if (!(FileTabDragData.guard(sourceData) && FileTabDragData.guard(targetData))) {
                return;
            }
            // Find order ID
            const sourceIdx = documentStore.order.findIndex((id) => id === sourceData.id);
            const targetIdx = documentStore.order.findIndex((id) => id === targetData.id);
            if (!(sourceIdx >= 0 && targetIdx >= 0)) {
                return;
            }
            // Get edge
            const closestEdgeOfTarget = extractClosestEdge(targetData);
            const documentNewOrder = reorderWithEdge({
                list: documentStore.order,
                startIndex: sourceIdx,
                indexOfTarget: targetIdx,
                closestEdgeOfTarget,
                axis: 'horizontal',
              });
            // Set new list
            documentStore.order = documentNewOrder;
        },
    }), [documentStore]);

    /* Return */
    return (
        <Tabs 
            variant='outline' radius='md' inverted
            value={documentsSnapshot.current} 
            onChange={v => documentStore.current = v}  
            classNames={styles.tabbar}
            renderRoot={({children, ...props}) => 
                <ScrollArea viewportRef={viewportRef}
                    onScrollPositionChange={updateFloatingIndicators}
                    onWheelCapture={e => {
                        e.preventDefault();
                        if (viewportRef.current) { viewportRef.current.scrollLeft += e.deltaY * 0.5; }
                    }}
                    scrollbars='x' type='never'
                    {...props}
                >
                    <Flex ref={flexbarRef}
                        className={styles.tabbar.rootFlex} 
                        direction='row'
                    >
                        { children }
                    </Flex>
                </ScrollArea>
            }
        >
            {/* The scroll left indicator */}
            <Transition mounted={isOverflowing && !isAtStart} transition="fade" duration={100} timingFunction="ease"> 
                {(style) => 
                    <div style={style} className={styles.stickyLeft}>
                        <div className={styles.stickyLeftPane}>
                            <IconChevronsLeft
                                size={20}
                                strokeWidth={1}
                                color='#9b9b9b'
                            />
                        </div>
                    </div>
                }
            </Transition>
            {/* The actual tabs */}
            {
                tabsData.map(({ id, label }) => (
                    <FileTab 
                        key={id} 
                        id={id}
                        text={label}
                        onContextMenu={showTabContextMenu(id)}
                        onAuxClick={handleAuxClick(id)}
                    />
                ))
            }
            {/* The scroll right indicator */}
            <Transition mounted={isOverflowing && !isAtEnd} transition="fade" duration={100} timingFunction="ease"> 
                {(style) => 
                    <div style={style} className={styles.stickyRight}>
                        <div className={styles.stickyRightPane}>
                            <IconChevronsRight
                                size={20}
                                strokeWidth={1}
                                color='#9b9b9b'
                            />
                        </div>
                    </div>
                }
            </Transition>
        </Tabs>
    );
};