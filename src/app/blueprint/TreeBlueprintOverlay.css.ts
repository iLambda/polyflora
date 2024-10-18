import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    shadingSelector: style({
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        inset: 'auto auto 0px 0px',
        pointerEvents: 'all',
    }),

    viewControl: style({
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        inset: 'auto 0px 0px auto',
    }),

};