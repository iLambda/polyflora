
import { MenuData } from '@app/ui/menu/MenuBar';
import { Kbd, Menu } from '@mantine/core';
import { useCallback } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { styles } from '@app/ui/menu/MenuBar.css';

type MenuBarProps = {
    // The data of the menu
    data: MenuData
};


export const MenuItems = (props: MenuBarProps) => {

    // Helper to make a key
    const makeKey = useCallback((key: string, idx: number) => (
        <Kbd key={idx} size='xs'>
            {key}
        </Kbd>
    ), []);

    
    return props.data.map((item, idx) => {
        /* Case : separator */
        if (item.type === 'separator') {
            return (
                <Menu.Divider key={`${idx}`} />
            );
        }
        /* Case : label */
        else if (item.type === 'label') {
            return (
                <Menu.Label key={`${idx}`}>
                    { item.label }
                </Menu.Label>
            );
        }
        /* Case : submenu */
        else {
            // Compute the item 
            const menuItem = (
                <Menu.Item 
                    key={`${idx}`}
                    color={item.color}
                    leftSection={item.icon}
                    rightSection={
                        (item.submenu && 
                            <IconChevronRight color='var(--mantine-color-dimmed)' size={14} stroke={1.5} />
                        ) 
                     || (item.shortcut && item.shortcut.map(makeKey))
                    }
                >
                    { item.text }
                </Menu.Item>
            );
            // If we do not have a submenu, plain return
            if (!item.submenu) { 
                return menuItem; 
            }
            // We do. Put it in a new menu
            return (
                <Menu key={`${idx}`} 
                    withArrow
                    classNames={styles.menu}
                    arrowPosition='center' 
                    offset={8} 
                    trigger='hover' 
                    position='right-start'
                >
                    <Menu.Target>
                        { menuItem }
                    </Menu.Target>
                    <Menu.Dropdown>
                        <MenuItems data={item.submenu} />
                    </Menu.Dropdown>
                </Menu>
            );

        }
    });
};