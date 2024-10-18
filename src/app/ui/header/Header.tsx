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


           {/*  <Menu offset={0}>
                <Menu.Target>
                    <Button variant="default" size='xs' className={styles.headerMenu}>File</Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={}>
                        Settings
                    </Menu.Item>
                    <Menu.Item 
                        leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
                        rightSection={<><Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd></>}
                    >
                        Messages
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>

                    <Menu withArrow arrowPosition='center' offset={8} trigger='hover' position='right-start'>
                        <Menu.Target>
                            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                                        rightSection={<IconChevronRight style={{ width: rem(14), height: rem(14) }} />  }>
                                Settings
                            </Menu.Item>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                Settings
                            </Menu.Item>
                            <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                                Messages
                            </Menu.Item>
                            
                            <Menu.Divider />
                            <Menu.Label>Danger zone</Menu.Label>
                            
                            <Menu.Item leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />} >
                                Transfer my data
                            </Menu.Item>
                            
                            <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}  >
                                Delete my account
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    
                    <Menu.Item leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />} >
                        Transfer my data
                    </Menu.Item>
                    
                    <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}  >
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu> */}
        </header>
    );
};