
import { MenuData } from '@app/ui/header/menu/MenuBar';
import { styles } from '@app/ui/header/menu/MenuBar.css';
import { Kbd, Menu } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useCallback } from 'react';

type MenuBarProps = {
    // The data of the menu
    data: MenuData
};

export const MenuItems = (props: MenuBarProps) => {

    // Helper to make a key
    const makeKey = useCallback((key: string, idx: number) => (
        <Kbd key={idx} size='xs' className={styles.kbd}>
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
            // Compute the item props
            const props = {
                onClick: item.onClick,
                color: item.color,
                leftSection: item.icon,
                rightSection: 
                        (item.submenu && <IconChevronRight color='var(--mantine-color-dimmed)' size={14} stroke={1.5} />
                        ) 
                     || (item.shortcut && item.shortcut.map(makeKey)),
            };

            // If we do not have a submenu, plain return
            if (!item.submenu) { 
                return (
                    <Menu.Item 
                        key={`${idx}`} 
                        {...props}
                    >
                        {item.text}
                    </Menu.Item>
                ); 
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
                        <Menu.Item  {...props}>{item.text}</Menu.Item >
                    </Menu.Target>
                    <Menu.Dropdown>
                        <MenuItems data={item.submenu} />
                    </Menu.Dropdown>
                </Menu>
            );

        }
    });
};