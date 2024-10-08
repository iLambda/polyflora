import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {
    
    root: style({
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: 'var(--mantine-radius-md)',
        padding: '5px',
        border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))',  
        pointerEvents: 'all',
    }),

    control: style({
        padding: '7px 12px',
        lineHeight: 1, 
        color: 'light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-2))',
        borderRadius: 'var(--mantine-radius-md)',
        fontSize: 'var(--mantine-font-size-sm)',
        transition: 'color 100ms ease',
        fontWeight: 500,
        ':hover': {
            color: 'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
            backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
        },
        selectors: {
            '&[data-active]': { color: 'var(--mantine-color-white)' }, 
        }, 
    }),

    controlLabel: style({ 
        position: 'relative', 
        zIndex: 1, 
    }),

    indicator: style({
      backgroundColor: 'var(--mantine-primary-color-filled)',
      borderRadius: 'var(--mantine-radius-md)',
    }),
};