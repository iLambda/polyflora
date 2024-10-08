import { themeToVars } from '@mantine/vanilla-extract';
import { theme } from './theme';

// CSS variables object, can be access in *.css.ts files
export const vars = themeToVars(theme);