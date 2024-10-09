import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import { styles } from './ShadingSelect.css';
import { kebabCaseToFancyCase } from '@utils/string';
import { FloraData } from '@app/state/Flora';

type ShadingMode = FloraData['shading'];
const shadingModes = ['shaded', 'wireframe', 'skeletal'] as const satisfies ShadingMode[];


type ShadingSelectProps = {
    className?: string;
    shading?: ShadingMode;
    onChange?: (v: ShadingMode) => void;
};
export const ShadingSelect = (props: ShadingSelectProps) => {
    /* Setup state */
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState<ShadingMode>('shaded');

    /* Callback to obtain DOM refs */
    const setControlRef = (mode: ShadingMode) => (node: HTMLButtonElement) => {
        controlsRefs[mode] = node;
        setControlsRefs(controlsRefs);
    };
    
    /* Make all the buttons */
    const controls = shadingModes.map((item) => (
        <UnstyledButton
            key={item}
            className={styles.control}
            ref={setControlRef(item)}
            onClick={() => { setActive(item); props.onChange?.(item); }}
            mod={{ active: (props.shading ?? active) === item }}
        >
            <span className={styles.controlLabel}>
                {kebabCaseToFancyCase(item)}
            </span>
        </UnstyledButton>
    ));
    
    /* Return component */
    return (
        <div className={`${styles.root} ${props.className}`} ref={setRootRef}>
            {controls}
            <FloatingIndicator
                target={controlsRefs[props.shading ?? active]}
                parent={rootRef}
                className={styles.indicator}
            />
        </div>
    );
};