import { vars } from '@app/theme.css';
import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

export const styles = {
    toolbar: style({
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
        display: 'flex',
        justifyItems: 'center', 
        alignContent: 'center',
        selectors: {
            '&': {
                pointerEvents: 'all',
            },
        },
    }),

    toolbarKnub: style({
        width: 'fit-content',  
        display: 'flex', 
        justifyItems: 'center', 
        alignContent: 'center',
        selectors: {
            '&:after': {
                fontSize: '10pt',
                content: '⠿',
                color: 'var(--mantine-color-dark-3)',
                justifySelf: 'center', 
                alignSelf: 'center',
                height: 'fit-content',
            },
        },
    }),
};
