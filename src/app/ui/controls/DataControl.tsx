import { Flex, rem, Text } from '@mantine/core';
import { CSSProperties, ReactNode } from 'react';

type DataControlProps = {
    label: string;
    children?: ReactNode | ReactNode[];
    width?: CSSProperties['width'];
};

export const DataControl = (props: DataControlProps) => {

    return (
        <>
            <Flex align='center'>
                <Text size='xs' flex={1}>{props.label}</Text>
                <div style={{ 
                    width: props.width ?? rem(128), 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    gap: rem(4) }}
                >
                    { props.children }
                </div>
            </Flex>
        </>
    );
};