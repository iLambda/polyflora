
import { styles } from '@app/ui/menu/MenuBar.css';
import { MenuItems } from '@app/ui/menu/MenuItems';
import { Menu, Button, DefaultMantineColor } from '@mantine/core';
import { getKeys } from '@utils/types';
import { ReactNode } from 'react';


export type MenuLabelData = {
    type: 'label',
    label: string;
};
export type MenuItemData = {
    type: 'item',
    icon?: ReactNode;
    shortcut?: string[];
    submenu?: MenuData;
    color?: DefaultMantineColor,
    text: string;
};
export type MenuSeparatorData = {
    type: 'separator',
};
export type MenuData = (MenuSeparatorData | MenuLabelData | MenuItemData)[];
export type MenuBarData = Record<string, MenuData>;

type MenuBarProps = {
    // The data of the menu
    data: MenuBarData
};

export const MenuBar = (props: MenuBarProps) => {
    return getKeys(props.data).map(key => (
        <Menu key={key} offset={0} classNames={styles.menu}>
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