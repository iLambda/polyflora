import { NumberInput, NumberInputProps, rem } from '@mantine/core';
import { useCallback } from 'react';

type NumberPickerProps = Omit<NumberInputProps, 'styles' | 'size' | 'onChange'> & {
    onChange?: (v: number) => void
};

export const NumberPicker = (props: NumberPickerProps) => {

    const { min, max } = props;
    const { onChange, ...forwardedProps } = props;
    const setter = useCallback((v: string | number) => { 
        if (typeof v !== 'number') { return; }
        if (min !== undefined) { v = Math.max(v, min); }
        if (max !== undefined) { v = Math.min(v, max); }
        onChange?.(v); 
    }, [min, max, onChange]);


    return (
        <NumberInput                 
            styles={{
                root: {
                    flex: 1,
                },
                input: {
                    height: rem(22),
                    minHeight: rem(22),
                    paddingLeft: rem(1),
                    paddingRight: rem(20),
                    textAlign: 'end',
                },
                controls: {
                    height: rem(22),
                },
                control: {
                    flex: 1,
                    height: 'auto',
                    minHeight: '0px',
                },
            }}
            size='xs'
            onChange={onChange !== undefined ? setter : undefined}
            {...forwardedProps}
    />);
};