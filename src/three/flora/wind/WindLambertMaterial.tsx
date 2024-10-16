
import CustomShaderMaterial, { CustomShaderMaterialProps } from 'three-custom-shader-material';
import CustomShaderMaterialData from 'three-custom-shader-material/vanilla';
import windGlsl from '@three/flora/wind/wind.glsl';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import * as THREE from 'three';

export type WindLambertMaterialProps = Omit<
    CustomShaderMaterialProps<typeof THREE.MeshLambertMaterial>, 
    'vertexShader' | 'uniforms' | 'baseMaterial'
>;
export const WindLambertMaterial = (props: WindLambertMaterialProps) => {

    /* Update material time */
    const materialRef = useRef<CustomShaderMaterialData | null>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uWindDirection: { value: [1, 0, 0, 0] },
        uWindForce: { value: 1 },
        uWindSpeed: { value: 1 },
        uWindFrequency: { value: 1 },
        uAlphaWindSpeed: { value: 1 },
        uAlphaWindFrequency: { value: 1 },
    }), []);

    useFrame(({ clock }) => {
        // Skip if no ref 
        if (!materialRef.current) { return; }
        // Set
        materialRef.current.uniforms.uTime!.value = clock.elapsedTime;
    });

    // Return material
    return (
        <CustomShaderMaterial
                    ref={materialRef}
                    baseMaterial={THREE.MeshLambertMaterial}
                    vertexShader={windGlsl}
                    uniforms={uniforms}
                    { ...props }
                />
    );
};