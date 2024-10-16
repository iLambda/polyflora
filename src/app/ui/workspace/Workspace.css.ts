import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The root panel */
    root: style({
        height: '100%',
    }),

    /* The work panel */
    workPanel: style({
        flexGrow: 1,
    }),
};