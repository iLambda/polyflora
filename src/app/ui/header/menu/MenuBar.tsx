
import { styles } from '@app/ui/header/menu/MenuBar.css';
import { MenuItems } from '@app/ui/header/menu/MenuItems';
import { Button, DefaultMantineColor, Menu } from '@mantine/core';
import { HotkeyItem, useHotkeys } from '@mantine/hooks';
import { getKeys } from '@utils/types';
import { ReactNode, useMemo } from 'react';


export type MenuLabelData = {
    type: 'label',
    label: string;
};
export type MenuItemData = {
    type: 'item',
    disabled?: boolean,
    icon?: ReactNode;
    shortcut?: string[];
    submenu?: MenuData;
    color?: DefaultMantineColor,
    text: string;
    onClick?: () => void;
};
export type MenuSeparatorData = {
    type: 'separator',
};
export type MenuData = (MenuSeparatorData | MenuLabelData | MenuItemData | false | null | undefined)[];
export type MenuBarData = Record<string, MenuData>;

type MenuBarProps = {
    // The data of the menu
    data: MenuBarData
};

export const MenuBar = (props: MenuBarProps) => {
    /* Compute all the hotkeys */
    const hotkeys = useMemo(() => {
        // The array of hotkeys
        const hotkeys : HotkeyItem[] = [];
        // Add em all
        const stack : MenuData[] = Object.values(props.data);
        while (stack.length > 0) {
            // Get from stack
            const data = stack.shift()!;
            // Go through all data
            data.forEach(datum => {
                // Skip falsey
                if (!datum) { return; }
                // Skip if not item
                if (datum.type !== 'item') { return; }
                // If there is a shortcut, add it to hotkeys
                if (datum.shortcut) {
                    hotkeys.push([datum.shortcut.join('+').toLowerCase(), () => datum.onClick?.() ]);
                }
                // Add submenu to stack if exists
                if (datum.submenu) {
                    stack.push(datum.submenu);
                }
            });           
        }
        // Return hotkeys
        return hotkeys;        
    }, [props.data]);
    /* Bind them */
    useHotkeys(hotkeys);

    /* Return menu */
    return getKeys(props.data).map(key => (
        <Menu key={key} offset={0} position='top-start' classNames={styles.menu}>
            <Menu.Target>
                <Button variant="default" size='xs' className={styles.headerMenu}>
                    {key}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <MenuItems data={props.data[key]!} />
            </Menu.Dropdown>
        </Menu>
    ));
};