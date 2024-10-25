import { vars } from '@app/theme.css';
import { rem } from '@mantine/core';
import { createVar, style } from '@vanilla-extract/css';

export const variables = {
    colorEntry: createVar('colorEntry'),
};

/* The styles exported by the stylesheet */
export const styles = {
    
    colorWrapper: style({
        border: `1px solid var(--mantine-color-dark-4)`,
        backgroundColor: 'var(--mantine-color-dark-6)',
        padding: rem(8),
        borderRadius: vars.radius.sm,
        minWidth: 0,
        width:'100%',
    }),

    colorList: style({
        gap: `${rem(6)} ${rem(6)}`,
        flexWrap: 'wrap',
        width: 'fit-content',
    }),
  
    colorEntry: style({
        border: `1px solid var(--mantine-color-dark-4)`,
        borderRadius: vars.radius.md,
        backgroundColor: variables.colorEntry, 
        height: rem(26), 
        width: rem(26),
    }),

    colorEntrySelected: style({
        border: `2px solid var(--mantine-color-dark-3)`,
        borderRadius: vars.radius.md,
        '::after': {
            border: `4px solid red`,
            borderRadius: vars.radius.md,
        },
        
    }),

};