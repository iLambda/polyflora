import { vars } from '@app/theme.css';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {
    
    // The main overlay
    overlay: style({
        display: 'flex',
        pointerEvents: 'none',
        background: 'transparent',
        padding: vars.spacing.sm,
    }),

    // The container for the main overlay
    overlayRoot: style({
        width: '100%',
        height: '100%',
        position: 'relative',
    }),

    // The panel that contains material rendering
    shadingPanel: style({
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        inset: 'auto auto 0px 0px',
        pointerEvents: 'all',
    }),

    // The panel that contains view centering buttons
    viewPanel: style({
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        inset: 'auto 0px 0px auto',
    }),

    // View centering buttons
    viewButton: style({
        pointerEvents: 'all',
        padding: '4px',
        paddingLeft: '5px',
    }),

};