import { OrbitControls } from '@react-three/drei';
import { deg2rad } from '@utils/math';
import { Grid, GridSettings } from './viewer/Grid';
import { Lighting, LightingSettings } from './viewer/Lighting';
import { Record, Static } from 'runtypes';


/* The environment settings. These are to be serialized */
export type EnvironmentSettings = Static<typeof EnvironmentSettings>;
export const EnvironmentSettings = Record({
    /* The grid settings */
    grid: GridSettings,
    /* The lighting settings */
    lighting: LightingSettings,
});

/* The properties of the viewer */
type ViewerProps = {
    environment: EnvironmentSettings,
};

export const View = (props: ViewerProps) => {

    /* Return the control */
    return (
        <>
            {/* The environment (grid, shadows, etc) */}
            <Grid {...props.environment.grid} />
            <Lighting {...props.environment.lighting} />

            <mesh>
                <boxGeometry args={[10, 10, 10]} />
                <meshPhongMaterial />
            </mesh>

            <OrbitControls makeDefault
                enablePan={true}
                minPolarAngle={0} 
                maxPolarAngle={deg2rad(130)}
                minDistance={15}
                maxDistance={250}
            />
        </>
    );
};