import { FileInput, FileInputProps, rem } from '@mantine/core';

type FilePickerProps = Omit<FileInputProps, 'styles' | 'size'>;

export const FilePicker = (props: FilePickerProps) => {

    return (
        <FileInput                 
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
            {...props}
    />);
};