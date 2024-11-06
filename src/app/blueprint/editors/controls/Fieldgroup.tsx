
import { Fieldset, FieldsetProps } from '@mantine/core';
import { styles } from './Fieldgroup.css';
import clsx from 'clsx';

export type FieldgroupProps = FieldsetProps;

export const Fieldgroup = ({children, ...props}: FieldsetProps) => {

    return (
        <Fieldset className={clsx(styles.fieldset, props.className)} styles={{legend: { userSelect: 'none' }}} {...props}>
            { children }
        </Fieldset>
    );
};