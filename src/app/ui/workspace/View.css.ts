import { vars } from '@app/theme.css';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The root panel */
    root: style({
        position: 'absolute',
        inset: '0',
    }),

    /* The main overlay */
    overlay: style({
        position: 'absolute',
        inset: '0',
        display: 'flex',
        pointerEvents: 'none',
        background: 'transparent',
        padding: vars.spacing.sm,
    }),

    /* The container for the main overlay */
    overlayRoot: style({
        width: '100%',
        height: '100%',
        position: 'relative',
    }),
};