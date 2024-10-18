import { useMemo } from 'react';
import { styles } from './Header.css';
import { MenuBar } from '@app/ui/header/menu/MenuBar';
import { rem } from '@mantine/core';
import { IconCubePlus } from '@tabler/icons-react';
import { useDocumentsStore } from '@app/state/Documents';

export const Header = () => {

    const iconStyle = useMemo(() => ({width: rem(14), height: rem(14) }), []);
    const documentStore = useDocumentsStore();

    return (
        <header className={styles.header}>
            <MenuBar data={{
                'File': [
                    {
                        type: 'item',
                        text: 'New file',
                        icon: <IconCubePlus style={iconStyle} />,
                        shortcut: ['Ctrl', 'N'],
                        onClick: documentStore.newDocument,
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