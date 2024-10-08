import { styles } from './Editor.css';

import { Container, Tabs } from '@mantine/core';
import { TrunkEditor } from './editor/TrunkEditor';

export const Editor = () => {

    /* Return component */
    return (
        <>
            <Tabs defaultValue='trunk'>
                <Tabs.List>
                    <Tabs.Tab value='trunk'> Trunk </Tabs.Tab>
                    <Tabs.Tab value='branches'> Branches </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='trunk'>
                    <Container className={styles.panelRoot}>
                        <TrunkEditor />
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value='branches'>
                    bb
                </Tabs.Panel>

            </Tabs>
        </>
    );
};