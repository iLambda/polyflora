import { PolygonCounter } from '@three/utils/PolygonCount';
import { Header } from '@app/ui/header/Header';
import { View } from '@app/ui/workspace/View';
import { Flex } from '@mantine/core';
import { Allotment } from 'allotment';
import { styles } from './Workspace.css';
import { Editor } from '@app/ui/workspace/Editor';
import { useDocuments } from '@app/state/Documents';

export type WorkspaceProps = {};

export const Workspace = (props: WorkspaceProps) => {
    /* Check current document */
    const [documentsSnapshot] = useDocuments();

    /* The tunnels */    
    return (
        <Flex direction='column' className={styles.root}>
            {/* The header */}
            <Header />
            {/* The panels */}
            <Allotment className={styles.workPanel}>
                <Allotment.Pane minSize={500}>
                    {/* The view content */}
                    <PolygonCounter>
                        <View enabled={documentsSnapshot.current !== null} />
                    </PolygonCounter>
                </Allotment.Pane>
                <Allotment.Pane minSize={300} maxSize={900} preferredSize='300px'>
                    {/* The editor content */}
                    <Editor enabled={documentsSnapshot.current !== null} />
                </Allotment.Pane>
            </Allotment>
        </Flex>
    );
};