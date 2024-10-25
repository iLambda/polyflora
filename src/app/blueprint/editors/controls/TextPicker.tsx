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
                    padding: rem(0),
                    paddingRight: rem(8),
                    textAlign: 'end',
                },
                section: {
                    borderLeft: `${rem(1)} var(--input-bd) solid`,
                    width: rem(16),
                },
            }}
            size='xs'
            onChange={v => onChange?.(v.currentTarget.value)}
            {...forwardedProps}
    />);
};