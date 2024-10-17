import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

/* The CSS variables exported by the stylesheet */
export const vars = {};

/* The styles exported by the stylesheet */
export const styles = {

    icon: style({
        width: rem(14), 
        height: rem(14),  
        margin: 0,
        strokeWidth: `${rem(1)}`,
    }),

};