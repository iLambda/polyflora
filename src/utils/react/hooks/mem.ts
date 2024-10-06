import { useRefWithInit } from './refs';

export type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

/* Create a buffer from an array */
export function useBuffer<T extends TypedArray>(ctor: (new () => T) & { from: ((al: ArrayLike<number>) => T) }, data: ArrayLike<number>) {
    return useRefWithInit(() => ctor.from(data)).current;
}

/* Create a buffer that is the requested size,  */