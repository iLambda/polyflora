import { vars } from '@app/theme.css';
import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

/* The styles exported by the stylesheet */
export const styles = {

    /* The tabbar mantine style */
    tabbar: {
        /* The root container */
        root: style({
            boxShadow: `inset 0 ${rem(1)} 0 0 var(--tab-border-color)`,
        }),

        /* The root flex container */
        rootFlex: style({
            display: 'flex',
            borderTop: `${rem(1)} solid var(--tab-border-color)`,
            gap: rem(3),
            paddingInline: rem(2),
            height: rem(32),
        }),

        /* The tabs themselves */
        tab: style({
            paddingBlock: rem(5),
            paddingInline: rem(10),
            marginBottom: rem(4),
            borderBottomLeftRadius: rem(6),
            borderBottomRightRadius: rem(6),
            selectors: {
                /* If tab is inactive */
                '&:not([data-active])': {
                    opacity: '35%',
                    border: `${rem(1)} solid black`,
                    borderTop: `${rem(1)} solid transparent`, 
                    // border: '1px solid var(--mantine-color-dark-9)',
                    // color: lighten('var(--tab-border-color)', 0.1),
                },
        
                /* If tab is active */
                '&[data-active]': {
                    vars: {
                        '--tab-border-color' : 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                        '--tab-background-color': '#2b2b2b',
                    },
                    borderTop: `${rem(1)} solid transparent`, 
                    backgroundImage: `repeating-linear-gradient(90deg, var(--tab-border-color), var(--tab-border-color) ${rem(5)}, var(--tab-background-color) ${rem(5)}, var(--tab-background-color) ${rem(10)})`,
                    backgroundPosition: `left ${rem(-2)} top ${rem(-1)}`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: `100% ${rem(1)}`,
                    backgroundColor: 'var(--tab-background-color)',
                    backgroundClip: 'border-box',
                    boxSizing: 'border-box',
                    boxShadow: '0px 3px #1b1b1b',
                    marginTop: rem(-1),
                },
            },
        }),

        /* The icon on tabs */
        tabSection: style({
            marginRight: rem(4),
        }),
        /* The label on tabs */
        tabLabel: style({
            fontSize: vars.fontSizes.xs,
            maxWidth: rem(100),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
    },
    
    /* The sticky left element */
    stickyLeft: style({
        zIndex: 100,
        position: 'sticky',
        width: '0px', 
        height: '100%',
        alignSelf: 'center',
        overflow: 'visible',
        marginLeft: rem(-3),
        left: rem(0),
        
    }),
    
    /* The sticky right element */
    stickyRight: style({
        zIndex: 100,
        position: 'sticky',
        width: '0px', 
        height: '100%',
        alignSelf: 'center',
        overflow: 'visible',
        marginLeft: rem(-16),
        right: rem(16),
    }),

    /* The icon contained in sticky */
    stickyLeftPane: style({
        backgroundColor: `#2b2b2b`,
        borderRight: `${rem(1)} solid var(--tab-border-color)`,
        borderTop: `${rem(1)} solid var(--tab-border-color)`,
        borderTopRightRadius: rem(4),
        borderBottomRightRadius: rem(4),
        marginTop: rem(-1),
        // borderRadius: '4px',
        // boxShadow: '0 0 5px 2px #2b2b2b',
        height: '100%',
        width: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),

    /* The icon contained in sticky */
    stickyRightPane: style({
        backgroundColor: `#2b2b2b`,
        borderLeft: `${rem(1)} solid var(--tab-border-color)`,
        borderTop: `${rem(1)} solid var(--tab-border-color)`,
        borderTopLeftRadius: rem(4),
        borderBottomLeftRadius: rem(4),
        marginTop: rem(-1),
        // borderRadius: '4px',
        // boxShadow: '0 0 5px 2px #2b2b2b',
        height: '100%',
        width: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
};