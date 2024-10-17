import '@mantine/core/styles.css';
import 'allotment/dist/style.css';

import { Flex, MantineProvider } from '@mantine/core';

import { styles } from '@app/App.css';
import { theme } from '@app/theme';
import { Header } from '@app/ui/Header';
import { Workspace } from '@app/workspace/Workspace';

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