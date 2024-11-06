import { styles } from '@app/ui/workspace/View.css';
import { Tunnel3D, Tunnel3DOverlay } from '@app/ui/workspace/WorkspaceTunnel';
import { Flex, Overlay } from '@mantine/core';
import { Context2D } from '@three/Context2D';
import { ReactNode, useRef } from 'react';
import { View as ContextView } from '@react-three/drei';

type ViewProps = {
    enabled?: boolean;
    children?: ReactNode | ReactNode[];
};

export const View = (props: ViewProps) => {
    /* Store a reference to the event source */
    const eventSourceRef = useRef<HTMLDivElement | null>(null);

    /* Otherwise, return the context */
    return !props.enabled ? <div className={styles.root} /> : (
        <div className={styles.root} ref={eventSourceRef}>
            {/* The 3D view */}
            <ContextView className={styles.root} frames={1}>
                { props.children }
                <Tunnel3D.Out />
            </ContextView>
            
            {/* The canvas */}
            <Context2D className={styles.canvas} eventSource={eventSourceRef.current ?? undefined}>
                <ContextView.Port />
            </Context2D>

            {/* The editor overlay */}
            <Overlay className={styles.overlay}>
                <Flex className={styles.overlayRoot}>
                    {/* The output of the tunnel */}
                    <Tunnel3DOverlay.Out />
                </Flex>
            </Overlay>
        </div>
    );
};