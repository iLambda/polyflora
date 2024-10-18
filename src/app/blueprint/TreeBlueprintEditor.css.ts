import { vars } from '@app/theme.css';
import { rem, TabsProps } from '@mantine/core';
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
        maxWidth: 'none',
    }),

    // The tab styles
    tab: {
        root: style({
            height: '100%',
        }),

        panel: style({
            height: '100%', 
            overflow: 'scroll !important',
        }),

        tab: style({
            fontSize: vars.fontSizes.xs,
            paddingBlock: rem(6),
            '&:first-child': {
                marginLeft: rem(5),
            },
        }),

    } satisfies TabsProps['classNames'],
};