import { style } from '@vanilla-extract/css';

export const styles = {

    svg: style({
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        imageRendering: 'pixelated',
    }),

    fill: {
        none: style({ fill: 'none' }),
        background: style({ 
            fill: 'light-dark(#00000016, #ffffff26)',
        }),
    },

    stroke: {
        default: style({
            stroke: 'light-dark(#101010, #E6E6E6)',
            strokeLinecap: 'round',
        }),
        obscured: style({
            stroke: 'light-dark(#B2B3B3, #707070)',
            strokeLinecap: 'round',
        }),
    },
};