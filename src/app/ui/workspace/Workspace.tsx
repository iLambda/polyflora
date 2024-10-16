import { CSSProperties, useMemo } from 'react';
import { Flex, Tabs, rem } from '@mantine/core';
import { IconLeaf } from '@tabler/icons-react';
import { styles } from './Workspace.css';
import { FloraStoreProvider } from '@app/state/Flora';
import { Allotment } from 'allotment';
import { Tab } from '@app/ui/workspace/Tab';
import { PolygonCounter } from '@app/state/PolygonCount';

export const Workspace = () => {
    
    /* Icon style */
    const iconStyle = useMemo(() : CSSProperties => ({ 
        width: rem(14), 
        height: rem(14),  
        margin: 0,
        strokeWidth: rem(1),
    }), []);
    
    return (
        <Flex direction='column' className={styles.root}>
            <FloraStoreProvider>
                <Allotment className={styles.workPanel}>
                    <Allotment.Pane minSize={500}>
                        <PolygonCounter>
                            {/* <Viewer /> */}
                            <div style={{ backgroundColor: '#2b2b2b', width: '100%', height: '100%'}}/>
                        </PolygonCounter>
                    </Allotment.Pane>
                    <Allotment.Pane minSize={300} maxSize={900} preferredSize='300px'>
                        {/* <Editor /> */}
                        <div/>
                    </Allotment.Pane>
                </Allotment>
            </FloraStoreProvider>
            <Tabs variant='outline' radius='md' defaultValue='test1' inverted classNames={styles.tabbar}>
                <Tab />
                <Tabs.Tab value='test2' leftSection={<IconLeaf style={iconStyle} />}>Test2.plf</Tabs.Tab>
                <Tabs.Tab value='test3'>Test3.plf</Tabs.Tab>
                <Tabs.Tab value='test4'>Test4.plf</Tabs.Tab>
                <Tabs.Tab value='test5'>Test5.plf</Tabs.Tab>
                <Tabs.Tab value='test6'>Test6.plf</Tabs.Tab>
            </Tabs>
        </Flex>
    );
};