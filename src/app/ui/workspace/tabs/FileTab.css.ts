import { rem } from '@mantine/core';
import { keyframes, style } from '@vanilla-extract/css';

/* The CSS animations exported by the stylesheet */
export const animations = {
    // Shaking
    shaking: keyframes({
        '0%': { transform: 'rotate(0deg)' },
        '25%': { transform: 'rotate(5deg)' },
        '50%': { transform: 'rotate(0eg)' },
        '75%': { transform: 'rotate(-5deg)' },
        '100%': { transform: 'rotate(0deg)' },
    }),


};

/* The styles exported by the stylesheet */
export const styles = {

    icon: style({
        width: rem(14), 
        height: rem(14),  
        margin: 0,
        strokeWidth: `${rem(1)}`,
    }),

    dragged: style({
        opacity: '0.25',
    }),

    dragIndicator: {
        right: style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: rem(-3), 
            width: rem(1),
            zIndex: 10,
            backgroundColor: '#ccc',
        }),
        left: style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: rem(-3), 
            width: rem(1),
            zIndex: 10,
            backgroundColor: '#ccc',
        }),
        circle: style({
            width: rem(4),
            height: rem(4),
            borderRadius: '100vh',
            position: 'absolute',
            left: `calc(50% - (${rem(4)} / 2))`,
            bottom: 0,
            backgroundColor: '#ccc',
            zIndex: 15,
            clipPath: `circle(${rem(3)} at 50% 50%)`,
        }),
    },

};