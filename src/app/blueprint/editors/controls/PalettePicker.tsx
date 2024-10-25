import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { NumberPicker } from '@app/blueprint/editors/controls/NumberPicker';
import { variables, styles } from '@app/blueprint/editors/controls/PalettePicker.css';
import { SelectorPicker } from '@app/blueprint/editors/controls/SelectorPicker';
import { Separator } from '@app/blueprint/editors/controls/Separator';
import { TextPicker } from '@app/blueprint/editors/controls/TextPicker';
import { ActionIcon, Button, CloseButton, ColorPicker, Flex, Popover, rem, ScrollArea, UnstyledButton } from '@mantine/core';
import { IconCopy, IconDeviceFloppy, IconFilePlus, IconFolderOpen, IconPalette, IconSquareRoundedPlusFilled, IconTrash } from '@tabler/icons-react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { colord } from 'colord';

type PalettePickerProps = {
    palette: readonly string[];
    onPaletteChanged: (v: string[]) => void;
    disabled?: boolean;
};

export const PalettePicker = (props: PalettePickerProps) => {
    return (
        <>
            <Flex className={styles.colorWrapper}>
                <ScrollArea mah={rem(128)} scrollbars='x'>
                        <Flex className={styles.colorList}>
                            {/* The swatches */}
                            {
                                props.palette.map((color, idx) => (
                                    // Create the popover
                                    <Popover key={idx} width={250} position="bottom" withArrow shadow="md" trapFocus offset={-6}>
                                        <Popover.Target>
                                            {/* The button is here */}
                                            <UnstyledButton
                                                style={{
                                                    ...assignInlineVars({
                                                        [variables.colorEntry]: color,
                                                    }),
                                                    filter: props.disabled ? `grayscale(1) brightness(0.35)` : '',
                                                    cursor: props.disabled ? 'not-allowed' : 'pointer',
                                                }}
                                                className={clsx(styles.colorEntry)}
                                                disabled={props.disabled}
                                            />
                                        </Popover.Target>
                                        {/* The dropdown */}
                                        <Popover.Dropdown style={{ display: 'flex', gap: rem(6), flexDirection: 'column' }}>
                                            {/* First, give buttons for delete and duplicate */}
                                            <Flex h={rem(28)} gap={rem(4)}>
                                                <Button 
                                                    variant='outline' 
                                                    h={rem(28)} 
                                                    size='xs' 
                                                    style={{ flex: 1 }}
                                                    leftSection={<IconTrash size={20} stroke={1.2} />}
                                                    onClick={() => {
                                                        const newPalette = [...props.palette];
                                                        newPalette.splice(idx, 1);
                                                        props.onPaletteChanged(newPalette);
                                                    }}
                                                >
                                                    Delete
                                                </Button> 
                                                <Button 
                                                    variant='outline' 
                                                    h={rem(28)} 
                                                    size='xs' 
                                                    style={{ flex: 1 }}
                                                    leftSection={<IconCopy size={20} stroke={1.2} />}
                                                    onClick={() => {
                                                        const newPalette = [...props.palette];
                                                        newPalette.splice(idx, 0, color);
                                                        props.onPaletteChanged(newPalette);
                                                    }}
                                                >
                                                    Duplicate
                                                </Button> 
                                            </Flex>
                                            
                                            <Separator />
                                            <ColorPicker format='hex' fullWidth value={color} onChange={(v) => {
                                                const pal = [...props.palette];
                                                pal[idx] = v;
                                                props.onPaletteChanged(pal);
                                            }}/>

                                            <Separator />
                                            <DataControl label='Hex' width={rem(64)}>
                                                <TextPicker
                                                    value={colord(color).toHex()} 
                                                    onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        pal[idx] = colord(v).toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                />
                                            </DataControl>
                                            <DataControl label='RGB' width={rem(148)}>
                                                <NumberPicker
                                                    value={colord(color).rgba.r} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        col.rgba.r = v;
                                                        pal[idx] = col.toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={255}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                                <NumberPicker
                                                    value={colord(color).rgba.g} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        col.rgba.g = v;
                                                        pal[idx] = col.toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={255}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                                <NumberPicker
                                                    value={colord(color).rgba.b} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        col.rgba.b = v;
                                                        pal[idx] = col.toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={255}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                            </DataControl>
                                            <DataControl label='HSV' width={rem(148)}>
                                                <NumberPicker
                                                    value={colord(color).hue()} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        pal[idx] = col.hue(v).toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={360}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                                <NumberPicker
                                                    value={colord(color).toHsv().s} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        pal[idx] = col.saturate((v - col.toHsv().s) / 100).toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={100}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                                <NumberPicker
                                                    value={colord(color).toHsv().v} onChange={(v) => {
                                                        const pal = [...props.palette];
                                                        const col = colord(color);
                                                        pal[idx] = col.lighten((v - col.toHsv().v) / 100).toHex();
                                                        props.onPaletteChanged(pal);
                                                    }}
                                                    min={0} max={100}
                                                    step={1}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                />
                                            </DataControl>
                                        </Popover.Dropdown>
                                    </Popover>
                                ))
                            }
                            {/* The add button */}
                            <div key={'add'} className={styles.addButton}>
                                <CloseButton 
                                    size={24} 
                                    icon={
                                        <IconSquareRoundedPlusFilled 
                                            stroke={1.5}  
                                            style={{ 
                                                marginTop: rem(-2),
                                                marginLeft: rem(-2), 
                                                color:'var(--mantine-color-dark-3)', 
                                            }}
                                        />
                                    } 
                                    onClick={() => {
                                        props.onPaletteChanged([...props.palette, '#000000']);
                                    }}
                                />
                            </div>
                        </Flex>
                </ScrollArea>
            </Flex>
            <Flex align='center' gap={rem(4)}>
                
                <SelectorPicker 
                    data={['spring', 'summer']}
                    leftSection={<IconPalette stroke={1} style={{ paddingLeft: rem(2) }} />}
                />
                <Flex align='center' gap={rem(4)}>
                    <ActionIcon 
                        size={rem(21)} 
                        p={rem(3)} 
                        variant='outline'
                        children={<IconFilePlus />}
                    />
                    <ActionIcon 
                        size={rem(21)} 
                        p={rem(3)} 
                        variant='outline'
                        children={<IconFolderOpen />}
                    />
                    <ActionIcon 
                        size={rem(21)} 
                        p={rem(3)} 
                        variant='outline'
                        children={<IconDeviceFloppy />}
                    />
                </Flex>
            </Flex>
            {/* <ColorInput
                placeholder="Select a color swatch"
                size='xs'
                disabled={!(selectedId !== null && selectedId < props.palette.length)}
                value={selectedId !== null ? props.palette[selectedId] : undefined}
                rightSection={
                    <CloseButton 
                        size={18} 
                        icon={
                            <IconTrashXFilled 
                                stroke={1.5} 
                                color='var(--mantine-color-dark-3)' 
                            />
                        }
                        onClick={() => {
                            if (!(selectedId !== null && selectedId > 0 && selectedId < props.palette.length)) { return; }
                            const newPalette = [...props.palette];
                            newPalette.splice(selectedId, 1);
                            props.onPaletteChanged(newPalette);
                        }} 
                    />
                }
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
                    preview: {
                        height: rem(20),
                    },
                    colorPreview: {
                        filter: props.disabled ? `grayscale(1) brightness(0.35)` : '',
                    },
                }}
            /> */}
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