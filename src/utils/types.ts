export function assertExhaustive(value: never): never {
    throw new Error(`ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(value)}`);
}

export function error(message: string): never {
    throw Error(message);
}

export function getKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}

export function getValues<const T extends object>(obj: T) {
    return Object.values(obj) as (T[keyof T])[];
}

export function extendWith<T extends NonNullable<unknown>, TAdded extends object>(base: T, extended: TAdded) {
    return Object.assign(base, extended);
}

export type IfEqual<C, D, T, F> = 
    [C] extends [D] ? [D] extends [C] ? T : F : F;

export type ExtendedReadonly<T> =
    T extends object ? Readonly<T> :
    T extends (infer TArray)[] ? readonly TArray[] :
    T extends readonly (infer TArray)[] ? readonly TArray[] :
    T extends number | string | boolean | null | undefined ? T :
    never;

export type Override<T, TOverriden> = 
    Omit<TOverriden, keyof T> & T;
    
// Forces type normalization
export type Expand<T, mode extends 'shallow' | 'deep' = 'shallow'> = T extends unknown
    ? { [K in keyof T]: mode extends 'shallow' ? T[K] : Expand<T[K], 'deep'> }
    : never;

export type Pair<T, U = T> = [T, U];
export type Triplet<T, U = T, V = T> = [T, U, V];

export type NonEmptyArray<T> = [T, ...T[]];
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];