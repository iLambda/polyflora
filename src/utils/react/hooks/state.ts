import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebouncedState<T>(defaultValue: T, wait: number, options = { leading: false }) {
    const [value, setValue] = useState(defaultValue);
    const timeoutRef = useRef<number | undefined>(undefined);
    const leadingRef = useRef(true);
    
    const clearTimeout = useCallback(() => window.clearTimeout(timeoutRef.current), []);
    useEffect(() => clearTimeout, [clearTimeout]);
    
    const debouncedSetValue = useCallback((newValue: T) => {
        clearTimeout();
        if (leadingRef.current && options.leading) {
            setValue(newValue);
        } else {
            timeoutRef.current = window.setTimeout(() => {
                leadingRef.current = true;
                setValue(newValue);
            }, wait);
        }
        leadingRef.current = false;
    }, [clearTimeout, options.leading, wait]);
    
    return [value, wait === 0 ? setValue : debouncedSetValue] as const;
}

export function useIdempotentState<T>(defaultValue: T | (() => T)) : [T, (value: T) => void] {
    const [value, setValue] = useState<T>(defaultValue);
    const setIdValue = useCallback((v: T) => { value !== v && setValue(v); }, [value, setValue]);
    return [value, setIdValue];
}

export function useHasChanged(deps: unknown[]) : boolean {
    const oldRef = useRef<unknown[] | null>(null);
    const hasChanged =
        oldRef.current === null
        || oldRef.current.some((old, i) => old !== deps[i]);
    oldRef.current = deps;
    return hasChanged;    
}


export const useReactiveRef = <T>() : [(node: T | null) => void, T | null] => {
    /* We use state to be reactive */
    const [ref, setRef] = useState<T | null>(null);
    /* Return */
    return [setRef, ref];
};
