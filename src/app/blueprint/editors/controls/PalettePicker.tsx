import { variables, styles } from '@app/blueprint/editors/controls/PalettePicker.css';
import { ColorInput, Flex, rem, ScrollArea, UnstyledButton } from '@mantine/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useState } from 'react';

type PalettePickerProps = {
    palette: readonly string[];
    onPaletteChanged: (v: string[]) => void;
    disabled?: boolean;
};

export const PalettePicker = (props: PalettePickerProps) => {

    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <>
            <Flex className={styles.colorWrapper}>
                <ScrollArea mah={rem(128)} scrollbars='x'>
                        <Flex className={styles.colorList}>
                            {
                                props.palette.map((color, idx) => (
                                    <UnstyledButton key={idx} 
                                        style={{
                                            ...assignInlineVars({
                                                [variables.colorEntry]: color,
                                            }),
                                            filter: props.disabled ? `grayscale(1) brightness(0.35)` : '',
                                            cursor: props.disabled ? 'not-allowed' : 'pointer',
                                        }}
                                        className={clsx(styles.colorEntry, (selectedId == idx) && styles.colorEntrySelected)}
                                        onClick={() => setSelectedId(idx)}
                                        disabled={props.disabled}
                                    />
                                ))
                            }
                        </Flex>
                </ScrollArea>
            </Flex>
            <ColorInput
                placeholder="Input placeholder"
                size='xs'
                disabled={!(selectedId !== null && selectedId < props.palette.length)}
                value={selectedId !== null ? props.palette[selectedId] : undefined}
                onChange={v => {
                    if (selectedId !== null) {
                        if (props.palette[selectedId]) {
                            const val = [...props.palette];
                            val[selectedId] = v;
                            props.onPaletteChanged(val);
                        }
                    }
                }}
                styles={{
                    colorPreview: {
                        filter: props.disabled ? `grayscale(1) brightness(0.35)` : '',
                    },
                }}
            />
            {/* <PillsInput>
                <Pill.Group>
                    {
                        props.palette.map((color, idx) => (
                            <Pill key={idx} size='xs' style={{ backgroundColor: color, color: 'black' }}>{color}</Pill>
                        ))
                    }
                    <PillsInput.Field placeholder="Enter tags" 
                        
                        />
                </Pill.Group>
            </PillsInput> */}
        </>
    );
};