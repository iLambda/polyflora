import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.layer.css';
import 'allotment/dist/style.css';

import { styles } from '@app/Root.css';
import { Workspace } from '@app/ui/workspace/Workspace';
import { Flex } from '@mantine/core';
import { ReactNode } from 'react';
import { TreeBlueprint } from './blueprint/TreeBlueprint';
import { FileTabs } from './ui/workspace/tabs/FileTabs';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { ScopeProvider, useMolecule } from 'bunshi/react';
import { blueprintScope, useBlueprintDocumentID } from '@app/state/Blueprint';
import { useSnapshot } from 'valtio';

/* [FIX] : Temporary fix for a problem in Bushi
    See Issue #71 (https://github.com/saasquatch/bunshi/issues/71) */
export const ScopeChecker = ({ children }: { children: ReactNode | ReactNode[] }) => 
    useBlueprintDocumentID() !== null 
        ? children 
        : null;

export const Root = () => {
    /* Get documents data */
    const documents = useMolecule(DocumentStoreMolecule);
    const documentsSnapshot = useSnapshot(documents);
    
    /* Return component */
    return (
        <Flex className={styles.root} direction='column'>
            {/* The workspace */}
            <ScopeProvider scope={blueprintScope} value={documentsSnapshot.current}>
                {/* The blueprint  */}
                <ScopeChecker>
                    <TreeBlueprint />
                </ScopeChecker>
                {/* The workspace itself */}
                <Workspace />
            </ScopeProvider>
            {/* The tabs */}
            <FileTabs />
        </Flex>
    );
};