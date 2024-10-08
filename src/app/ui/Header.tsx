import { Button, Flex, Image, Menu, rem } from '@mantine/core';
import { styles } from './Header.css';
import { IconMessageCircle, IconSettings } from '@tabler/icons-react';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
  ];

export const Header = () => {

    return (
        <header className={styles.header}>
            <Flex>
                <Image className={styles.logo} w='32px' src='logo.png' />

                <Menu offset={0} position='bottom-start'>
                    <Menu.Target>
                        <Button variant="default" className={styles.headerMenu}>File</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            Settings
                        </Menu.Item>
                        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                            Messages
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>
        </header>
    );
};