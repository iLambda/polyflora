import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.layer.css';
import 'allotment/dist/style.css';

import { styles } from '@app/Root.css';
import { Workspace } from '@app/ui/workspace/Workspace';
import { Flex } from '@mantine/core';
import { useMemo } from 'react';
import { TreeBlueprint } from './blueprint/TreeBlueprint';
import { FileTabs } from './ui/workspace/FileTabs';
import { useDocuments } from '@app/state/Documents';

export const Root = () => {

    /* Get documents data */
    const [documentsSnapshot, documents] = useDocuments();

    /* Compute the tabs data */
    const tabsData = useMemo(() => documentsSnapshot.order.map(
        id => ({ id, label: documentsSnapshot.data.get(id)?.name ?? '[ERROR]' }),
    ), [documentsSnapshot.data, documentsSnapshot.order]);

    /* Return component */
    return (
        <Flex className={styles.root} direction='column'>
            {/* The workspace */}
            <TreeBlueprint>
                <Workspace />
            </TreeBlueprint>
            {/* The tabs */}
            <FileTabs 
                data={tabsData}
                value={documentsSnapshot.current} 
                onChange={(id) => documents.current = id} 
            />
        </Flex>
    );
};