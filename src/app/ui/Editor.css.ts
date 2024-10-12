import { vars } from '@app/theme.css';
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

    // The panel container
    panelRoot: style({
        paddingInline: vars.spacing.md,
        paddingTop: vars.spacing.sm,
        paddingBottom: vars.spacing.sm,
        overflow: 'scroll',
    }),

    // The tab root
    tabRoot: style({
        height: '100%',
    }),

    // The tab panel
    tabPanel: style({
        height: '100%', 
        overflow: 'scroll !important',
    }),
};