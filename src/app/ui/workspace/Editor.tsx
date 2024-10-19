import { styles } from '@app/ui/workspace/View.css';
import { TunnelEditor } from '@app/ui/workspace/WorkspaceTunnel';
import { ReactNode } from 'react';

type EditorProps = {
    enabled?: boolean;
    children?: ReactNode | ReactNode[];
};

export const Editor = (props: EditorProps) => {

    /* Otherwise, return the context */
    return !props.enabled 
        ? <div className={styles.root} /> 
        : <TunnelEditor.Out />;
};