import { Flex, ScrollArea, Tabs } from '@mantine/core';
import { styles } from './FileTabs.css';
import { FileTab } from './FileTab';
import { useCallback, useRef } from 'react';
import { useIdempotentState } from '@utils/react/hooks/state';

type FileTabsProps = {
    value: string | null;
    onChange: (value: string|null) => void;
};

export const FileTabs = (props: FileTabsProps) => {

    /* Get the ref for the scrolling viewport */
    const viewportRef = useRef<HTMLDivElement | null>(null);

    /* Store if we are at the end or start of scroll for stickys */
    const [isAtEnd, setAtEnd] = useIdempotentState(false);
    const [isAtStart, setAtStart] = useIdempotentState(true);
    /* Callback to listen to scroll position changes */
    const handleScrollPositionChange = useCallback((pos: {x: number, y: number}) => {
        setAtStart(pos.x === 0);
        setAtEnd(pos.x === ((viewportRef.current?.scrollWidth ?? Infinity) - (viewportRef.current?.clientWidth ?? 0)));
    }, [setAtStart, setAtEnd]);

    return (
        <Tabs 
            variant='outline' radius='md' inverted
            value={props.value} onChange={props.onChange}  
            classNames={styles.tabbar}
            renderRoot={({children, ...props}) => 
                <ScrollArea viewportRef={viewportRef}
                    onScrollPositionChange={handleScrollPositionChange}
                    onWheelCapture={e => {
                        e.preventDefault();
                        if (viewportRef.current) { viewportRef.current.scrollLeft += e.deltaY * 0.5; }
                    }}
                    scrollbars='x' type='never'
                    {...props}
                >
                    <Flex className={styles.tabbar.rootFlex} direction='row'>
                        { children }
                    </Flex>
                </ScrollArea>
            }
        >
            {!isAtStart && <span className={styles.stickyLeft}>L</span>}
            {
                new Array(10).fill(0).map((_, idx) => (
                    <FileTab key={`untitled${idx}`} id={`untitled${idx}`} />
                ))
            }
            {!isAtEnd && <span className={styles.stickyRight}>R</span>}
        </Tabs>
    );
};