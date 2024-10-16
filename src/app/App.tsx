import '@mantine/core/styles.css';
import 'allotment/dist/style.css';

import { Flex, MantineProvider } from '@mantine/core';

import { theme } from './theme';
import { Header } from './ui/Header';
import { styles } from './App.css';
import { Workspace } from './ui/workspace/Workspace';

export const App = () => {


    /* Return component */
    return (
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <Flex className={styles.root} direction='column'>
                <Header />
                <Workspace />
            </Flex>
        </MantineProvider>
    );
};