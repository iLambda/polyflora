import { useMemo } from 'react';
import { styles } from './Header.css';
import { MenuBar } from '@app/ui/header/menu/MenuBar';
import { rem } from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { useMolecule } from 'bunshi/react';

export const Header = () => {

    const iconStyle = useMemo(() => ({width: rem(14), height: rem(14) }), []);
    const documentStore = useMolecule(DocumentStoreMolecule);

    return (
        <header className={styles.header}>
            <MenuBar data={{
                'File': [
                    {
                        type: 'item',
                        text: 'New file',
                        icon: <IconCubePlus style={iconStyle} />,
                        shortcut: ['Ctrl', 'N'],
                        onClick: documentStore.new,
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
                'Edit': [],
            }} />
        </header>
    );
};