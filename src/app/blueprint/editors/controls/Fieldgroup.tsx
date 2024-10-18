
import { Fieldset, FieldsetProps } from '@mantine/core';
import { useMemo } from 'react';
import { styles } from './Fieldgroup.css';

export type FieldgroupProps = FieldsetProps;

export const Fieldgroup = ({children, ...props}: FieldsetProps) => {

    const classname = useMemo(() => 
        [styles.fieldset, props.className]
            .filter(str => str !== undefined)
            .join(' ')
        , [props.className]);

    return (
        <Fieldset className={classname} {...props}>
            { children }
        </Fieldset>
    );
};