import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

/* The styles exported by the stylesheet */
const headerHeight = rem('32px');
export const styles = {
    
    logo: style({
        marginRight: '16px',
    }),

    header: style({
        height: headerHeight,
        backgroundColor: `var(--mantine-color-body)`,
        borderBottom: rem('1px') + ` solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
    }),

    headerMenu: style({
       height: `calc(${headerHeight} - 1px)`,
       backgroundColor: 'transparent',
       borderColor: 'transparent',
    }),
};