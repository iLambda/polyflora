import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

export const styles = {

    aspect: style({
        width: '100%',
        border: '1px solid var(--mantine-color-dark-5)',
        borderRadius: rem(3),
        overflow: 'hidden',
    }),

    aspectDisabled: style({
        borderColor: '#363636',
    }),

};