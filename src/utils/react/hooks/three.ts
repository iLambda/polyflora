import { ColorSource, setColor } from '@utils/datatypes/color';
import { useInstance, useRefWithInit } from './refs';
import { Vec2, Vec3 } from '@utils/datatypes/vec';

import * as THREE from 'three';
import { getKeys } from '@utils/types';
import { useLoader } from '@react-three/fiber';


export function useVector2(x: number, y: number) : THREE.Vector2
export function useVector2(data: Vec2) : THREE.Vector2
export function useVector2(dataOrX: number | Vec2, layerOrY?: number) : THREE.Vector2 {
    const vec = useInstance(THREE.Vector2);
    if (typeof dataOrX === 'object') {
        vec.set(dataOrX.x, dataOrX.y);
    } else {
        vec.set(dataOrX, layerOrY!);
    }
    return vec;
}

export function useVector3(x: number, y: number, z: number) : THREE.Vector3
export function useVector3(data: Vec2, layer: number) : THREE.Vector3
export function useVector3(dataOrX: number | Vec2, layerOrY: number, z?: number) : THREE.Vector3 {
    const vec = useInstance(THREE.Vector3);
    if (typeof dataOrX === 'object') {
        vec.set(dataOrX.x, dataOrX.y, layerOrY);
    } else {
        vec.set(dataOrX, layerOrY, z!);
    }
    return vec;
}

export function useVector4(x: number, y: number, z: number, w: number) : THREE.Vector4 {
    const vec = useInstance(THREE.Vector4);
    vec.set(x, y, z, w);
    return vec;
}


export function useColor(src: ColorSource, convert?: 'linear-to-srgb' | 'srgb-to-linear') : THREE.Color {
    const color = useInstance(THREE.Color, 0, 0, 0);
    setColor(color, src);
    if (convert === 'linear-to-srgb') {
        color.convertLinearToSRGB();
    }
    else if (convert === 'srgb-to-linear') {
        color.convertSRGBToLinear();
    }

    return color;    
}

export function useSphere(x: number, y: number, z: number, radius: number) : THREE.Sphere
export function useSphere(data: Vec3, radius: number) : THREE.Sphere
export function useSphere(dataOrX: number | Vec3, radiusOrY: number, z?: number, radius?: number) : THREE.Sphere {
    const sphere = useInstance(THREE.Sphere);
    if (typeof dataOrX === 'object') {
        sphere.center.set(dataOrX.x, dataOrX.y, dataOrX.z);
        sphere.radius = radiusOrY;
    } else {
        sphere.center.set(dataOrX, radiusOrY, z!);
        sphere.radius = radius!;
    }
    return sphere;
}

export type LayerID = 
    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
    | 30 | 31 
     
export function useLayers(layers: Partial<Record<LayerID, boolean>>) : THREE.Layers {
    const layerMask = useInstance(THREE.Layers);
    // Reset
    layerMask.disableAll();
    // Set all needed
    getKeys(layers).forEach(layer => {
        if (layers[layer] === true) {
            layerMask.enable(layer);
        }
    });
    // Return
    return layerMask;
}

export function useBuffer<T extends THREE.TypedArray>(ctor: (new () => T) & { from: ((al: ArrayLike<number>) => T) }, data: ArrayLike<number>) {
    return useRefWithInit(() => ctor.from(data)).current;
}


type TextureOptions = {
    minFilter: THREE.MinificationTextureFilter,
    magFilter: THREE.MagnificationTextureFilter,
    colorSpace: THREE.ColorSpace,
};
export function useTexture(url: string, options?: Partial<TextureOptions>) : THREE.Texture {
    const tex = useLoader(THREE.TextureLoader, url);
    options?.minFilter && (tex.minFilter = options?.minFilter);
    options?.magFilter && (tex.magFilter = options?.magFilter);
    options?.colorSpace !== undefined && (tex.colorSpace = options?.colorSpace);
    return tex;
}

export function useUniform<T>(data: T) : THREE.Uniform<T> {
    const uniform = useInstance(THREE.Uniform<T>, data);
    uniform.value = data;
    return uniform;
}