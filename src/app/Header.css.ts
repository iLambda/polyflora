import { style } from '@vanilla-extract/css'
import { rem } from '@mantine/core';

/* The CSS variables exported by the stylesheet */
export const vars = {};

/* The styles exported by the stylesheet */
export const styles = {
    
    header: style({
        height: rem('56px'),
        marginBottom: rem('120px'),
        backgroundColor: `var(--mantine-color-body)`,
        borderBottom: rem('1px') + ` solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`
    }),
}