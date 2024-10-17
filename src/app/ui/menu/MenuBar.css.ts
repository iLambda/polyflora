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

            '&[data-position="right"]': {
                marginInlineStart: `${rem(50)}`,
            } satisfies ComplexStyleRule,

        } as ComplexStyleRule),


    } satisfies MenuProps['classNames'],
};