import { Flex } from '@mantine/core';
import { styles } from './Workspace.css';
import { FloraStoreProvider } from '@app/state/Flora';
import { Allotment } from 'allotment';
import { useState } from 'react';
import { useConstant } from '@utils/react/hooks/refs';
import { proxyMap } from 'valtio/utils';
import { FileTabs } from '@app/workspace/FileTabs';
import { TunnelEditor } from '@app/workspace/WorkspaceTunnel';
import { View } from '@app/workspace/View';
import { PolygonCounter } from '@app/state/PolygonCount';

export const Workspace = () => {

    /* The component state */
    const [currentDocument, setCurrentDocument] = useState<string | null>(null);
    const documents = useConstant(() => proxyMap<string, { txt: string }>());

    /* The tunnels */
    
    return (
        <Flex direction='column' className={styles.root}>
            {/* The panels */}
            <FloraStoreProvider>
                <Allotment className={styles.workPanel}>
                    <Allotment.Pane minSize={500}>
                        {/* The view content */}
                        <PolygonCounter>
                            <View enabled={currentDocument !== null} />
                        </PolygonCounter>
                    </Allotment.Pane>
                    <Allotment.Pane minSize={300} maxSize={900} preferredSize='300px'>
                        {/* The editor content */}
                        <TunnelEditor.Out />
                    </Allotment.Pane>
                </Allotment>
            </FloraStoreProvider>
            {/* The tabs */}
            <FileTabs 
                value={currentDocument} 
                onChange={setCurrentDocument} 
            />
        </Flex>
    );
};