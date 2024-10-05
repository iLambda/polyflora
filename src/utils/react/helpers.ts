import { ComponentType, MutableRefObject, memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const typedMemo: <T extends ComponentType<any>>(
    c: T,
    areEqual?: (
        prev: React.ComponentProps<T>,
        next: React.ComponentProps<T>
    ) => boolean
) => T = memo;


/* Initialize a react reference */
export function initRef<T>(ref: MutableRefObject<T | null>, initializer: () => T, notify?: (v: T) => void) : asserts ref is MutableRefObject<T> {
    if (ref.current === null) {
        ref.current = initializer();
        notify?.(ref.current);
    }
}
