import { MutableRefObject, useCallback, useRef } from 'react';
import { initRef } from '../helpers';

/* Make a passively initialized react ref */
export const useRefWithInit = <T>(initializer: () => T, notify?: (v: T) => void) : MutableRefObject<T> => {
    /* Create the ref */
    const ref = useRef<T | null>(null);
    /* Initialize */
    initRef<T>(ref, initializer, notify);
    /* Return */
    return ref;
};

/* Reuse an instance */
export const useInstance = <T,  const U extends unknown[] = []>(Ctor: new (...args: U) => T, ...args: U) => {
    const ref = useRefWithInit(useCallback(() => new Ctor(...args), [Ctor, args]));
    return ref.current;
};

/* Reuse an object */
export const useConstant = <T>(value : T) : T => {
    return useRef(value).current;
};

export const useConstantWithInit = <T>(init: () => T) : T => {
    return useRefWithInit(init).current;
};

export const useRefWithSetter = <T>(value: T) : [MutableRefObject<T>, (v: T) => void] => {
    const ref = useRef<T>(value);
    return [ref, (v: T) => ref.current = v];
};