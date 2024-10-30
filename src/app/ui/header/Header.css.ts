import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

/* The styles exported by the stylesheet */
const headerHeight = rem('32px');
export const styles = {
    
    logo: style({
        height: '24.8px', 
        strokeWidth: rem(10),
        marginInline: rem(5),
    }),

    header: style({
        height: headerHeight,
        backgroundColor: `var(--mantine-color-body)`,
        borderBottom: rem('1px') + ` solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingInline: rem(4),
    }),

    headerMenu: style({
       height: rem(20),
       backgroundColor: 'transparent',
       borderColor: 'transparent',
    }),
};