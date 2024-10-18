import { TrunkEditor } from '@app/blueprint/editors/TrunkEditor';
import { styles } from './TreeBlueprintEditor.css';

import { Container, Tabs } from '@mantine/core';
import { BranchEditor } from '@app/blueprint/editors/BranchEditor';
import { useFloraStore } from '@app/state/Flora';

export const TreeBlueprintEditor = () => {

    /* Get store */
    const flora = useFloraStore();

    /* Return component */
    return (
        <Tabs defaultValue='trunk' className={styles.tabRoot}>
            <Tabs.List>
                <Tabs.Tab value='trunk'> Trunk </Tabs.Tab>
                <Tabs.Tab value='branches'> Branches </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='trunk' className={styles.tabPanel}>
                <Container className={styles.panelRoot}>
                    <TrunkEditor store={flora.trunk} />
                </Container>
            </Tabs.Panel>
            <Tabs.Panel value='branches' className={styles.tabPanel}>
                <Container className={styles.panelRoot}>
                    <BranchEditor store={flora.branch} />
                </Container>
            </Tabs.Panel>
        </Tabs>
    );
};