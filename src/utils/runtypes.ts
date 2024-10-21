import { Function as FunctionRt, Runtype } from 'runtypes';

export const NonNullable = <T>(t: Runtype<T>) : Runtype<NonNullable<T>> => t.withGuard(x => x !== null && x !== undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FunctionTyped = <T extends (...args: any[]) => any>() => FunctionRt.withGuard((x) : x is T => true);