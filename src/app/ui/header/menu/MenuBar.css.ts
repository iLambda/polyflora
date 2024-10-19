import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { MenuProps, rem } from '@mantine/core';
import { vars } from '@app/theme.css';

/* The styles exported by the stylesheet */
export const styles = {

    headerMenu: style({
       height: rem(20),
       backgroundColor: 'transparent',
       borderColor: 'transparent',
    }),

    kbd: style({
        borderColor: 'color-mix(in srgb, var(--mantine-color-dark-3) 50%, var(--mantine-color-dark-4) 50%)',
        backgroundColor: 'var(--mantine-color-dark-6)',
        paddingBlock: rem(-3),
        minWidth: rem(20),
        textAlign: 'center',
        whiteSpace: 'preserve',
        selectors: {
            '&+&': {
                marginInlineStart: rem(2),            
            },
        },
    }),

    menu: {
        item: style({
            height: rem(24),
            fontSize: vars.fontSizes.xs,
            paddingInline: rem(4),
            paddingBlock: rem(4),
        }),

        itemLabel: style({
            marginBottom: rem(0),
        }),

        itemSection: style({
            selectors: {
                '&[data-position="right"]': {
                    marginInlineStart: `${rem(50)}`,
                } satisfies ComplexStyleRule,
            },
        }),


    } satisfies MenuProps['classNames'],
};