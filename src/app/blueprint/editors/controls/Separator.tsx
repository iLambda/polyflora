import { Divider, DividerProps, rem } from '@mantine/core';


export const Separator = ({my, ...props}: DividerProps) => (
    <Divider my={my ?? rem(2)} {...props} />
);