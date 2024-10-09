import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {
    
    // The panel container
    fieldset: style({
        paddingTop: '0px',
    }),

    // The panel container
    fieldsetInline: style({
        marginTop: rem(12),
    }),
    
};

