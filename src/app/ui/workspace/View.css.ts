import { vars } from '@app/theme.css';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The root panel */
    root: style({
        height: '100%',
        width: '100%',
    }),

    /* The main overlay */
    overlay: style({
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