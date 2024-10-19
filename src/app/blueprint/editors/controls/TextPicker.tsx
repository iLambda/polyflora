import { rem, TextInput, TextInputProps } from '@mantine/core';

type TextPickerProps = Omit<TextInputProps, 'styles' | 'size' | 'onChange'> & {
    onChange?: (v: string) => void
};

export const TextPicker = (props: TextPickerProps) => {
    const { onChange, ...forwardedProps } = props;
    return (
        <TextInput                 
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
            }}
            size='xs'
            onChange={v => onChange?.(v.currentTarget.value)}
            {...forwardedProps}
    />);
};