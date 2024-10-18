import { TrunkEditor } from '@app/blueprint/editors/TrunkEditor';
import { styles } from './TreeBlueprintEditor.css';

import { Container, Tabs } from '@mantine/core';
import { BranchEditor } from '@app/blueprint/editors/BranchEditor';
import { SeedEditor } from '@app/blueprint/editors/SeedEditor';
import { useMolecule } from 'bunshi/react';
import { TreeBlueprintMolecule } from '@app/blueprint/TreeBlueprintState';

export const TreeBlueprintEditor = () => {

    /* Get store */
    const flora = useMolecule(TreeBlueprintMolecule);

    /* Return component */
    return (
        <>
            <SeedEditor store={flora} />
            <Tabs defaultValue='trunk' classNames={styles.tab} variant='outline'>
                <Tabs.List>
                    <Tabs.Tab value='trunk'> Trunk </Tabs.Tab>
                    <Tabs.Tab value='branches'> Branches </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='trunk'>
                    <Container className={styles.panelRoot}>
                        <TrunkEditor store={flora.trunk} />
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value='branches'>
                    <Container className={styles.panelRoot}>
                        <BranchEditor store={flora.branch} />
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </>
    );
};