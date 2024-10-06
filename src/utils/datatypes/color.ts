
import { assertExhaustive } from '@utils/types';
import { Number, Record, Static, String, Union } from 'runtypes';
import { Color } from 'three';
import { colord } from 'colord';

/* A RGB Color */
export type ColorRGB = Static<typeof ColorRGB>;
export const ColorRGB = Record({
    r: Number,
    g: Number,
    b: Number,
});

/* A RGBA Color */
export type ColorRGBA = Static<typeof ColorRGBA>;
export const ColorRGBA = ColorRGB.extend({
    a: Number,
});


/* A HSL Color */
export type ColorHSL = Static<typeof ColorHSL>;
export const ColorHSL = Record({
    h: Number,
    s: Number,
    l: Number,
});

/* A HSLA Color */
export type ColorHSLA = Static<typeof ColorHSLA>;
export const ColorHSLA = ColorHSL.extend({
    a: Number,
});


/* A HSV Color */
export type ColorHSV = Static<typeof ColorHSL>;
export const ColorHSV = Record({
    h: Number,
    s: Number,
    v: Number,
});

/* A HSLA Color */
export type ColorHSVA = Static<typeof ColorHSVA>;
export const ColorHSVA = ColorHSV.extend({
    a: Number,
});

/* A color source */
export type ColorSource = Static<typeof ColorSource>;
export const ColorSource = Union(
    Number,
    String,
    ColorRGB,
    ColorRGBA,
    ColorHSL,
    ColorHSLA,
);

export const setColor = (color: Color, src: ColorSource) => {
    if (Number.guard(src)) { color.set(src); } 
    else if (String.guard(src)) { color.set(src); }
    else if (ColorRGB.guard(src)) { color.set(src.r, src.g, src.b); }
    else if (ColorHSL.guard(src)) { color.set(src.h, src.s, src.l); }
    else {
        assertExhaustive(src);
    }
};

export const colordpp = (src: ColorSource) => {
    if (Number.guard(src)) {  
        return colord(`#${(src & 0xFFFFFF).toString(16).padEnd(6)}`);
    }
    else {
        return colord(src);
    }
};