import { rem, Select, SelectProps } from '@mantine/core';

type SelectorPickerProps = Omit<SelectProps, 'styles' | 'size'> & {
    onChange?: (v: number) => void
};

export const SelectorPicker = (props: SelectorPickerProps) => {

    return (
        <Select                 
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
                section: {
                    borderLeft: `${rem(1)} var(--input-bd) solid`,
                    width: rem(16),
                },
                
            }}
            size='xs'
            {...props}
    />);
};