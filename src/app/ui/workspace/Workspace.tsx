import { PolygonCounter } from '@three/utils/PolygonCount';
import { Header } from '@app/ui/header/Header';
import { View } from '@app/ui/workspace/View';
import { Flex } from '@mantine/core';
import { Allotment } from 'allotment';
import { styles } from './Workspace.css';
import { Editor } from '@app/ui/workspace/Editor';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { useSnapshot } from 'valtio';
import { useMolecule } from 'bunshi/react';
import { CameraTracker } from '@app/state/Camera';

export type WorkspaceProps = {};

export const Workspace = (props: WorkspaceProps) => {
    /* Check current document */
    const documents = useMolecule(DocumentStoreMolecule);
    const documentsSnapshot = useSnapshot(documents);

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
                        <View enabled={documentsSnapshot.current !== null}>
                            {/* Record camera state */}
                            <CameraTracker />
                        </View>
                    </PolygonCounter>
                </Allotment.Pane>
                <Allotment.Pane className={styles.editorPane} minSize={300} maxSize={900} preferredSize='300px'>
                    {/* The editor content */}
                    <Editor enabled={documentsSnapshot.current !== null} />
                </Allotment.Pane>
            </Allotment>
        </Flex>
    );
};