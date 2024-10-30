import { Line } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

const LogoPlane = (props: GroupProps) => (
    <group {...props}>
        {/* The transparent plane */}
        <mesh>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial 
                side={THREE.DoubleSide} 
                transparent
                color='white'
                opacity={0.75} 
            />
        </mesh>
        {/* The plane contour */}
        <Line segments
            color='black' 
            points={[
                [-10, 10, 0], [-10, -10, 0], 
                [10, 10, 0], [10, -10, 0], 
                [10, 10, 0], [-10, 10, 0],
                [10,- 10, 0], [-10, -10, 0],
            ]} 
        />
    </group>
);

export const Logo = (props: GroupProps) => (
    <group {...props}>
        {/* Both planes */}
        <group>
            <LogoPlane />
            <LogoPlane rotation={[0, Math.PI/2, 0]} />            
        </group>
        {/* The middle dashed line */}
        <Line segments
            polygonOffset
            polygonOffsetFactor={-50}
            linewidth={1}
            dashed dashScale={0.25}
            color='#222'
            points={[
                [0, 10, 0], [0, -10, 0],
            ]}
        />
    </group>
);