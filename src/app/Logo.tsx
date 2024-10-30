import { styles } from '@app/Logo.css';
import { CSSProperties } from '@mantine/core';
import clsx from 'clsx';

type LogoProps = {
    width?: string,
    height?: string,
    style?: CSSProperties,
    className?: string,
};

export const Logo = (props: LogoProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            version="1.0"
            viewBox="0 0 256 256"
            width={props.width}
            height={props.height}
            style={props.style}
            className={clsx(styles.svg, props.className)}
        >
            <g id="Plan_x0020_1">
                <path className={styles.fill.background} d="M43 47l33 -5 0 -28 53 19 80 -12 1 184 -28 5 0 36 -54 -25 -85 17 0 -191z"/>
                <path className={clsx(styles.fill.none, styles.stroke.obscured)} d="M128 221l54 -11"/>
                <path className={clsx(styles.fill.none, styles.stroke.obscured)} d="M128 221l-52 -24 0 -157"/>
                <path className={clsx(styles.fill.none, styles.stroke.default)} d="M128 221l-85 17 0 -191 166 -26 1 184 -28 5"/>
                <path className={clsx(styles.fill.none, styles.stroke.default)} d="M128 221l54 25 0 -193 -106 -39 0 28"/>
                <path className={clsx(styles.fill.none, styles.stroke.default)} d="M129 34l0 38"/>
                <path className={clsx(styles.fill.none, styles.stroke.default)} d="M128 183l0 38"/>
                <path className={clsx(styles.fill.none, styles.stroke.default)} d="M129 110l0 38"/>
            </g>
        </svg>
    );
};