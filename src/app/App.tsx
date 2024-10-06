import { Context2D } from '@three/Context2D';
import { View } from '@three/View';

export const App = () => {

    /* Return component */
    return (
        <>
            <Context2D>
                <View environment={{ 
                    grid: { visibility: 'shown' },
                    lighting: {
                        ambient: { color: 0xffffff, intensity: 0.2 },
                        sun: { color: 0xffffff, intensity: 1 },
                    },
                }} />
            </Context2D>
        </>
    );
};