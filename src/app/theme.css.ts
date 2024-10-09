import { themeToVars } from '@mantine/vanilla-extract';
import { theme } from './theme';
import { globalStyle } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

// CSS variables object, can be access in *.css.ts files
export const vars = themeToVars(theme);

export const styles = {
    // Redefine fieldset text
    fieldsetText: globalStyle('.mantine-Fieldset-legend', {
        fontSize: '0.75rem',
        border: rem('1px') + ` solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
        borderRadius: rem('3px'),
        backgroundColor: `var(--mantine-color-dark-7)`,
        paddingInline: '6px',
    }),
};