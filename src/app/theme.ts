import { createTheme } from '@mantine/core';

// Do not forget to pass theme to MantineProvider
export const theme = createTheme({
    primaryColor: 'green',
    colors: {
        green: [
            '#ebfee7',
            '#dbf8d4',
            '#b7efab',
            '#90e67e',
            '#70de58',
            '#5bd93f',
            '#4fd731',
            '#3fbe23',
            '#34a91b',
            '#25920e',
        ],
    },
});