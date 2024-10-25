import { rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import React, { ComponentProps } from 'react';

type PivotPicker = ComponentProps<'div'> & {
    value: { x: number, y: number };
    onChanged: (v: { x: number, y: number }) => void;
};

export const PivotPicker = ({value, onChanged, ...props}: PivotPicker) => {
    // Store position on the div
    const { ref } = useMove(onChanged);
    // Return body
    return (
        <div ref={ref} {...props}>
            <div
                style={{
                    position: 'absolute',
                    left: `calc(${value.x * 100}% - ${rem(4)})`,
                    top: `calc(${value.y * 100}% - ${rem(4)})`,
                    width: rem(8),
                    height: rem(8),
                    border: `${rem(2)} solid var(--mantine-color-green-8)`,
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    top: `0%`,
                    bottom: `calc(100% - (${value.y * 100}% - ${rem(4)}))`,
                    left: `calc(${value.x * 100}%)`,
                    width: '1px',
                    backgroundColor: `var(--mantine-color-green-5)`,
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    top: `calc(${value.y * 100}% + ${rem(4)})`,
                    bottom: `0%`,
                    left: `calc(${value.x * 100}%)`,
                    width: '1px',
                    backgroundColor: `var(--mantine-color-green-5)`,
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    left: `0%`,
                    right: `calc(100% - (${value.x * 100}% - ${rem(4)}))`,
                    top: `calc(${value.y * 100}%)`,
                    height: '1px',
                    backgroundColor: `var(--mantine-color-green-5)`,
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    left: `calc(${value.x * 100}% + ${rem(4)})`,
                    right: `0%`,
                    top: `calc(${value.y * 100}%)`,
                    height: '1px',
                    backgroundColor: `var(--mantine-color-green-5)`,
                }}
            />
        </div>
    );
};
