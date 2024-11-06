import { OrientationCubeView } from '@app/blueprint/overlays/orientation/OrientationCubeView';
import { rem } from '@mantine/core';
import { View } from '@react-three/drei';
import { CSSProperties } from 'react';

type OrientationCubeProps = {
    style?: CSSProperties;
    className?: string;
    size?: string;
};
export const OrientationCube = (props: OrientationCubeProps) => {
    /* Get size */
    const size = props.size ?? rem(100);
    /* Return component */
    return (
        <div
            className={props.className} 
            style={{
                ...props.style,
            }}
        >
            <View style={{ width: size, height: size }}>
                <OrientationCubeView />
            </View>
        </div>
    );
};