import { vars } from '@app/theme.css';
import { rem, TabsProps } from '@mantine/core';
import { ComplexStyleRule, style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The root panel */
    root: style({
        height: '100%',
    }),

    /* The work panel */
    workPanel: style({
        flexGrow: 1,
    }),

    /* The tabbar mantine style */
    tabbar: {
        /* The root container */
        root: style({
            display: 'flex',
            borderTop: rem(1) + ` solid var(--tab-border-color)`,
            gap: rem(3),
            marginBottom: rem(3),
        }),

        /* The tabs themselves */
        tab: style({
            paddingBlock: rem(5),
            paddingInline: rem(10),
            display: 'flex',

            /* If tab is inactive */
            '&:not([data-active])': {
                opacity: '35%',
                border: '1px solid black',
                // border: '1px solid var(--mantine-color-dark-9)',
                // borderTop: `${rem(1)} solid transparent`, 
                // color: lighten('var(--tab-border-color)', 0.1),
            } as ComplexStyleRule,
    
            /* If tab is active */
            '&[data-active]': {
                'var(--tab-border-color)' : 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                borderTop: `${rem(1)} solid transparent`, 
                backgroundImage: `repeating-linear-gradient(90deg, var(--tab-border-color), var(--tab-border-color) ${rem(5)}, transparent ${rem(5)}, transparent ${rem(10)})`,
                backgroundPosition: `left ${rem(0)} top ${rem(-1)}`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: `100% ${rem(1)}`,
                backgroundColor: '#2b2b2b',
                boxSizing: 'border-box',
                marginTop: rem(-1),
                boxShadow: '0px 3px #1b1b1b',
            } as ComplexStyleRule,
        } as ComplexStyleRule),

        /* The icon on tabs */
        tabSection: style({
            marginRight: rem(4),
        }),
        /* The label on tabs */
        tabLabel: style({
            fontSize: vars.fontSizes.xs,
        }),
    } satisfies TabsProps['classNames'],
};