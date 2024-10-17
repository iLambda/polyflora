import { Flex } from '@mantine/core';
import { styles } from './Workspace.css';
import { FloraStoreProvider } from '@app/state/Flora';
import { Allotment } from 'allotment';
import { PolygonCounter } from '@app/state/PolygonCount';
import { useState } from 'react';
import { useConstant } from '@utils/react/hooks/refs';
import { proxyMap } from 'valtio/utils';
import { FileTabs } from '@app/ui/workspace/FileTabs';

export const Workspace = () => {

    /* The component state */
    const [currentDocument, setCurrentDocument] = useState<string | null>(null);
    const documents = useConstant(() => proxyMap<string, { txt: string }>());

    /* The tunnels */
    
    return (
        <Flex direction='column' className={styles.root}>
            <FloraStoreProvider>
                <Allotment className={styles.workPanel}>
                    <Allotment.Pane minSize={500}>
                        <PolygonCounter>
                            {/* Display empty div if no current file */}
                            {
                                currentDocument === null 
                                    ? <div style={{ width: '100%', height: '100%'}}/>
                                    : <div style={{ backgroundColor: '#2b2b2b', width: '100%', height: '100%'}}/>
                            }
                        </PolygonCounter>
                    </Allotment.Pane>
                    <Allotment.Pane minSize={300} maxSize={900} preferredSize='300px'>
                        <div/>
                    </Allotment.Pane>
                </Allotment>
            </FloraStoreProvider>
            <FileTabs 
                value={currentDocument} 
                onChange={setCurrentDocument} 
            />
        </Flex>
    );
};