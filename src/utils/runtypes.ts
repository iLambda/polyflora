import { Runtype } from 'runtypes';

export const NonNullable = <T>(t: Runtype<T>) : Runtype<NonNullable<T>> => t.withGuard(x => x !== null && x !== undefined);