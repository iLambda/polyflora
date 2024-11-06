import { ReactNode } from 'react';

type FakeBorderProps = {
    borderX: string,
    borderY: string,
    children?: ReactNode | ReactNode[];
    color?: string;
};
export const FakeBorder = (props: FakeBorderProps) => {
    /* The background color */
    const bgColor = props.color ?? `var(--mantine-color-body)`;
    /* Return */
    return (
        <>
            <div style={{ height: props.borderY, width: '100%', backgroundColor: bgColor }} />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ width: props.borderX, height: '100%', backgroundColor: bgColor }} />
                { props.children }
                <div style={{ width: props.borderX, height: '100%', backgroundColor: bgColor }} />
            </div>
        </>
    );
};