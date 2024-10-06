import { Group, Button, Flex } from '@mantine/core';
import { styles } from './Header.css';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
  ];

export const Header = () => {

    const items = links.map((link) => (
        <Button>
            Aa
        </Button>
      ));

    return (
        <header className={styles.header}>
            <Flex justify='center' align='center'>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>
            </Flex>
        </header>
    );
};