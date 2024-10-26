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
    // Bounce
    bounce: keyframes({
        'from,\n  60%,\n  75%,\n  90%,\n  to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        from: { opacity: 0, transform: 'translate3d(0, 300px, 0) scaleY(5)' },
        '60%': { opacity: 1, transform: 'translate3d(0, 0px, 0) scaleY(0.9)' },
        '75%': { transform: 'translate3d(0, 5px, 0) scaleY(0.95)' },
        '90%': { transform: 'translate3d(0, 0px, 0) scaleY(0.985)' },
        to: { transform: 'translate3d(0, 0, 0)' },
    }),
    // Slide 
    slide: keyframes({
        '0%': { transform: 'translateY(50px) scale(0.7)', opacity: 0.7 },
        '80%': { transform: 'translateY(0px) scale(0.95)', opacity: 0.7 },
        '100%': { transform: 'scale(1)', opacity: 1 },
    }),
    // Color flash
    colorFlash: keyframes({
        'from': { opacity: 1 },
        'to': { opacity: 0 },
    }),
};

/* The styles exported by the stylesheet */
export const styles = {

    icon: style({
        width: rem(14), 
        height: rem(14),  
        margin: 0,
        strokeWidth: 1.2,
    }),

    animations: {
        draggedIn: style({
            animation: `${animations.slide} 500ms`,
        }),
        colorFlash: style({
            animation: `${animations.colorFlash} 750ms`,
            animationTimingFunction: 'ease',
        }),
    },

    colorFlasher: style({
        position: 'absolute',
        inset: '0 0 0 0',
        borderBottomLeftRadius: rem(6),
        borderBottomRightRadius: rem(6),
        zIndex: 16,
        backgroundColor: 'var(--mantine-color-green-8)',
        opacity: 0,
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
            position: 'absolute',
            left: `calc(50% - (${rem(4)} / 2))`,
            bottom: 0,
            backgroundColor: '#ccc',
            zIndex: 15,
        }),
    },

    renamingInput: {
        input: style({
            height: rem(20),
            minHeight: rem(20),
            paddingBlock: 0,
            paddingInline: rem(3),
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        }),
    },

};