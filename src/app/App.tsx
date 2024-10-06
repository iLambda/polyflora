import { AppShell, Button, Flex, Overlay } from '@mantine/core';
import { Context2D } from '@three/Context2D';
import { View } from '@three/View';

export const App = () => {

    /* Return component */
    return (
        <>
            {/* The shell */}
            <AppShell
                header={{ height: 30 }}
                aside={{ width: 250, breakpoint: 'sm' }}
            >
                {/* The header */}
                <AppShell.Header>

                </AppShell.Header>

                {/* The aside */}
                <AppShell.Aside>
                    
                </AppShell.Aside>

                {/* The content */}
                <AppShell.Main style={{ position: 'relative', display: 'flex' }}>
                    <div style={{ width: '100%', position: 'relative' }}>
                        {/* The 3D context */}
                        <Context2D>
                            <View environment={{ 
                                    grid: { visibility: 'shown' },
                                    lighting: {
                                        ambient: { color: 0xffffff, intensity: 0.2 },
                                        sun: { color: 0xffffff, intensity: 1 },
                                    },
                                }} 
                            />
                        </Context2D>
                        {/* An overlay */}
                        <Overlay backgroundOpacity={0} style={{ pointerEvents: 'none' }}>
                            <Flex gap='xs' style={{ position: 'absolute', bottom: 0 }}>
                                <Button style={{ pointerEvents: 'all' }}> Test </Button>
                                <Button style={{ pointerEvents: 'all' }}> Test </Button>
                                <Button style={{ pointerEvents: 'all' }}> Test </Button>
                            </Flex>
                        </Overlay>
                    </div>

                </AppShell.Main>


            </AppShell>
        </>
    );
};