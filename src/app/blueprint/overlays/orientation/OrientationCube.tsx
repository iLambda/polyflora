import { OrientationCubeView } from '@app/blueprint/overlays/orientation/OrientationCubeView';
import { rem } from '@mantine/core';
import { View } from '@react-three/drei/web/View';
import { CSSProperties } from 'react';
import { Vector3Tuple } from 'three';

type OrientationCubeProps = {
    style?: CSSProperties;
    className?: string;
    size?: string;
    onDirectionChanged?: (dir: Vector3Tuple) => void;
};
export const OrientationCube = (props: OrientationCubeProps) => {
    /* Get size */
    const size = props.size ?? rem(100);
    /* Return component */
    return (
        <div
            className={props.className} 
            style={{
                pointerEvents: 'auto',
                ...props.style,
            }}
        >
            <View style={{ width: size, height: size }}>
                <OrientationCubeView onDirectionChanged={props.onDirectionChanged} />
            </View>
        </div>
    );
};