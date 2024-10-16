import { vars } from '@app/theme.css';
import { rem } from '@mantine/core';
import { ComplexStyleRule, style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The tabbar mantine style */
    tabbar: {
        /* The root container */
        root: style({
        }),

        /* The root flex container */
        rootFlex: style({
            display: 'flex',
            borderTop: rem(1) + ` solid var(--tab-border-color)`,
            gap: rem(3),
            marginBottom: rem(4),
            paddingInline: rem(2),
        }),

        /* The tabs themselves */
        tab: style({
            paddingBlock: rem(5),
            paddingInline: rem(10),

            /* If tab is inactive */
            '&:not([data-active])': {
                opacity: '35%',
                border: '1px solid black',
                borderTop: `${rem(1)} solid transparent`, 
                // border: '1px solid var(--mantine-color-dark-9)',
                // color: lighten('var(--tab-border-color)', 0.1),
            } as ComplexStyleRule,
    
            /* If tab is active */
            '&[data-active]': {
                '--tab-border-color' : 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                '--tab-background-color': '#2b2b2b',
                borderTop: `${rem(1)} solid transparent`, 
                backgroundImage: `repeating-linear-gradient(90deg, var(--tab-border-color), var(--tab-border-color) ${rem(5)}, var(--tab-background-color) ${rem(5)}, var(--tab-background-color) ${rem(10)})`,
                backgroundPosition: `left ${rem(-2)} top ${rem(-1)}`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: `100% ${rem(1)}`,
                backgroundColor: 'var(--tab-background-color)',
                boxSizing: 'border-box',
                boxShadow: '0px 3px #1b1b1b',
                marginTop: rem(-1),
            } as ComplexStyleRule,
        } as ComplexStyleRule),

        /* The icon on tabs */
        tabSection: style({
            marginRight: rem(4),
        }),
        /* The label on tabs */
        tabLabel: style({
            fontSize: vars.fontSizes.xs,
            maxWidth: rem(100),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
    },
    
    /* The sticky left element */
    stickyLeft: style({
        position: 'sticky',
        width: '0px', 
        marginLeft: rem(-3),
        left: rem(10),
        zIndex: 100,
    }),
    
    /* The sticky right element */
    stickyRight: style({
        position: 'sticky',
        width: '0px', 
        marginLeft: rem(-3),
        right: rem(10),
        zIndex: 100,
    }),
};