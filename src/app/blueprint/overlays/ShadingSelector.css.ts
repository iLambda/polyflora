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

};