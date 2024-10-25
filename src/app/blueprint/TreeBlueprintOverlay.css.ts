import { vars } from '@app/theme.css';
import { rem, SegmentedControlProps } from '@mantine/core';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    shadingSelector: { 
        root: style({
            position: 'absolute',
            width: 'fit-content',
            height: 'fit-content',
            inset: 'auto auto 0px 0px',
            pointerEvents: 'all',
        }),
        label: style({
            padding: rem(3),
        }),
        innerLabel: style({
            width: rem(24),
            height: rem(24),
            fontWeight: 'normal',
            display: 'block',
        }),
    } as SegmentedControlProps['classNames'],

    viewControl: style({
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        inset: 'auto 0px 0px auto',
    }),

    overheadControls: style({
        position: 'absolute',
        inset: '0px 50% auto auto',
        translate: '50% 0',
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: vars.radius.md, 
        padding: rem(4),
        gap: rem(6),
        backgroundColor: 'var(--mantine-color-body)',
        border: rem('1px') + ` solid var(--mantine-color-dark-4)`,
        selectors: {
            '&': {
                pointerEvents: 'all',
            },
        },
    }),

};