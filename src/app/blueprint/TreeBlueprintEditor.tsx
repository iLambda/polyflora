import { TrunkEditor } from '@app/blueprint/editors/TrunkEditor';
import { styles } from './TreeBlueprintEditor.css';

import { ScrollArea, Tabs } from '@mantine/core';
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
                    <ScrollArea className={styles.panelRoot} 
                        h={'100%'} 
                        scrollbarSize={6}
                        scrollbars='y'
                        type='always'
                    >
                        <TrunkEditor store={flora.trunk} />
                    </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel value='branches'>
                    <ScrollArea className={styles.panelRoot} 
                        h={'100%'} 
                        scrollbarSize={6}
                        scrollbars='y'
                        type='always'
                    >
                        <BranchEditor store={flora.branch} />
                    </ScrollArea>
                </Tabs.Panel>
            </Tabs>
        </>
    );
};