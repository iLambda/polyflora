import '@mantine/core/styles.css';
import 'allotment/dist/style.css';

import { Flex, MantineProvider } from '@mantine/core';

import { theme } from './theme';
import { Header } from './ui/Header';
import { Allotment } from 'allotment';
import { Viewer } from './ui/Viewer';
import { styles } from './App.css';
import { Editor } from './ui/Editor';
import { FloraStoreProvider } from './state/Flora';

export const App = () => {

    /* Return component */
    return (
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <Flex className={styles.root}>
                <Header />
                <FloraStoreProvider>
                    <Allotment className={styles.main}>
                        <Allotment.Pane minSize={500}>
                            <Viewer />
                        </Allotment.Pane>
                        <Allotment.Pane minSize={300} maxSize={900} preferredSize='300px'>
                            <Editor />
                        </Allotment.Pane>
                    </Allotment>
                </FloraStoreProvider>
            </Flex>
        </MantineProvider>
    );
};