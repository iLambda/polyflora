import { useMemo } from 'react';
import { styles } from './Header.css';
import { MenuBar } from '@app/ui/header/menu/MenuBar';
import { rem } from '@mantine/core';
import { IconArrowBack, IconArrowForward, IconChevronLeft, IconChevronRight, IconDeviceFloppy, IconFile, IconFileOff, IconFolderOpen, IconPackageExport } from '@tabler/icons-react';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { useMolecule } from 'bunshi/react';
import { useSnapshot } from 'valtio';

export const Header = () => {

    const iconStyle = useMemo(() => ({width: rem(14), height: rem(14) }), []);
    const documentStore = useMolecule(DocumentStoreMolecule);
    const documentSnapshot = useSnapshot(documentStore);

    return (
        <header className={styles.header}>
            <MenuBar data={{
                'File': [
                    {
                        type: 'item',
                        text: 'New file',
                        icon: <IconFile style={iconStyle} />,
                        shortcut: ['Ctrl', 'N'],
                        onClick: documentStore.new,
                    },
                    {
                        type: 'item',
                        text: 'Open file',
                        icon: <IconFolderOpen style={iconStyle} />,
                        shortcut: ['Ctrl', 'O'],
                        onClick: () => console.log('TODO'),
                    },
                    { type: 'separator' },
                    {
                        type: 'item',
                        text: 'Save file',
                        icon: <IconDeviceFloppy style={iconStyle} />,
                        shortcut: ['Ctrl', 'S'],
                        onClick: () => console.log('TODO'),
                    },
                    {
                        type: 'item',
                        text: 'Save file as...',
                        icon: <IconDeviceFloppy style={iconStyle} />,
                        shortcut: ['Ctrl', 'Shift', 'S'],
                        onClick: () => console.log('TODO'),
                    },
                    {
                        type: 'item',
                        text: 'Export to...',
                        icon: <IconPackageExport style={iconStyle} />,
                        shortcut: ['Ctrl', 'Alt', 'S'],
                    },
                    { type: 'separator' },
                    {
                        type: 'item',
                        text: 'Close file',
                        icon: <IconFileOff style={iconStyle} />,
                        shortcut: ['Ctrl', 'F4'],
                        disabled: documentSnapshot.current === null,
                        onClick: () => {
                            if (documentSnapshot.current !== null) {
                                documentStore.close(documentSnapshot.current);
                            }
                        },
                    },
                    { type: 'separator' },
                    {
                        type: 'item',
                        text: 'Previous tab',
                        icon: <IconChevronRight style={iconStyle} />,
                        shortcut: ['Ctrl', 'Shift', 'Tab'],
                        onClick: () => documentStore.cycle(-1),
                    },
                    {
                        type: 'item',
                        text: 'Next tab',
                        icon: <IconChevronLeft style={iconStyle} />,
                        shortcut: ['Ctrl', 'Tab'],
                        onClick: () => documentStore.cycle(+1),
                    },
                    // {
                    //     type: 'item',
                    //     text: 'Message',
                    //     icon: <IconMessageCircle style={iconStyle} />,   
                    // },
                    // { type: 'separator' },
                    // { type: 'label', label: 'Danger zone' },
                    // {
                    //     type: 'item',
                    //     color: 'red',
                    //     text: 'Danger zone',
                    //     icon: <IconMessageCircle style={iconStyle} />,
                    // },
                ],
                'Edit': [
                    {
                        type: 'item',
                        text: 'Undo',
                        icon: <IconArrowBack style={iconStyle} />,
                        shortcut: ['Ctrl', 'Z'],
                        onClick: () => console.log('TODO'),
                    },
                    {
                        type: 'item',
                        text: 'Redo',
                        icon: <IconArrowForward style={iconStyle} />,
                        shortcut: ['Ctrl', 'Y'],
                        onClick: () => console.log('TODO'),
                    },

                ],
            }} />
        </header>
    );
};