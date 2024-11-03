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

    colorWrapperDisabled: style({
        borderColor: '#363636',
    }),

    colorList: style({
        gap: `${rem(4)} ${rem(4)}`,
        flexWrap: 'wrap',
        width: 'fit-content',
    }),
  
    colorEntry: style({
        borderRadius: vars.radius.xs,
        backgroundColor: variables.colorEntry, 
        height: rem(24), 
        width: rem(24),
        boxShadow: 'rgba(0,0,0,.1) 0 0 0 calc(.0625rem * var(--mantine-scale)) inset,rgba(0,0,0,.15) 0 0 calc(.25rem * var(--mantine-scale)) inset',
    }),
    
    colorEntrySelected: style({
        border: `2px solid var(--mantine-color-dark-1)`,
    }),

    addButton: style({
        height: rem(26), 
        width: rem(26),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),


};