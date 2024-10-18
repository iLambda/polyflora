import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.layer.css';
import 'allotment/dist/style.css';

import { theme } from '@app/theme';
import { MantineProvider } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { DocumentStoreProvider } from '@app/state/Documents';
import { Root } from '@app/Root';

export const App = () => {

    /* Return component */
    return (
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <ContextMenuProvider>
                <DocumentStoreProvider>
                    <Root />
                </DocumentStoreProvider>
            </ContextMenuProvider>
        </MantineProvider>
    );
};