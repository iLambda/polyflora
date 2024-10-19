import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {
    
    // The panel container
    fieldset: style({
        paddingTop: rem(6),
        paddingBottom: rem(8),
        paddingRight: rem(12),
        paddingLeft: rem(12),
        display: 'flex !important',
        flexDirection: 'column',
        gap: rem(4),
    }),

};