import { Number, Record, Static } from 'runtypes';

export type Vec2 = Static<typeof Vec2>;
export const Vec2 = Record({
    x: Number,
    y: Number,
});
export function vec2(x: number) : Vec2;
export function vec2(x: number, y: number) : Vec2;
export function vec2(x: number, y: number = 0) : Vec2 {
    return { x: x, y: y };
}

export type Vec3 = Static<typeof Vec3>;
export const Vec3 = Vec2.extend({
    z: Number,
});
export function vec3(x: number) : Vec3;
export function vec3(x: number, y: number) : Vec3;
export function vec3(x: number, y: number, z: number) : Vec3;
export function vec3(x: number, y: number = 0, z: number = 0) : Vec3 {
    return { x, y, z };
}

export type Vec4 = Static<typeof Vec4>;
export const Vec4 = Vec3.extend({
    w: Number,
});
export function vec4(x: number) : Vec4;
export function vec4(x: number, y: number) : Vec4;
export function vec4(x: number, y: number, z: number) : Vec4;
export function vec4(x: number, y: number, z: number, w: number) : Vec4;
export function vec4(x: number, y: number = 0, z: number = 0, w: number = 0) : Vec4 {
    return { x, y, z, w };
}
/* 
type Swizzler<D extends VecDim> = 
    & { [swizzler in SwizzlePath<D, 1>]: number }
    & { [swizzler in SwizzlePath<D, 2>]: Vec2 }
    & { [swizzler in SwizzlePath<D, 3>]: Vec3 }
    & { [swizzler in SwizzlePath<D, 4>]: Vec4 }

export type SwizzlePath<DIn extends VecDim, DOut extends VecDim> = 
    DOut extends 1 ? `${VecFields[DIn]}` :
    DOut extends 2 ? `${VecFields[DIn]}${VecFields[DIn]}` :
    DOut extends 3 ? `${VecFields[DIn]}${VecFields[DIn]}${VecFields[DIn]}` :
    DOut extends 4 ? `${VecFields[DIn]}${VecFields[DIn]}${VecFields[DIn]}${VecFields[DIn]}` :
    never


const swizzler = <const D extends VecDim>(d: D) : ProxyHandler<VecBox[D]> => ({
    get: (cible, prop, recepteur) {
        if (prop === "message2") {
          return "le monde";
        }
        return Reflect.get(cible, prop, recepteur);
    },
});

export function swizzle(v: number) : Swizzler<1>
export function swizzle(v: Vec2) : Swizzler<2>
export function swizzle(v: Vec3) : Swizzler<3>
export function swizzle(v: Vec4) : Swizzler<4>
export function swizzle(v: number | Vec2 | Vec3 | Vec4) : Swizzler<1> | Swizzler<2> | Swizzler<3> | Swizzler<4> {
    // Check size
    if (typeof v === 'number') { return new Proxy({ x: v }, swizzler(1)); } 
    else if (Vec2.guard(v)) { return new Proxy(v, swizzler(2)); }
    else if (Vec3.guard(v)) { return new Proxy(v, swizzler(3)); }
    else if (Vec4.guard(v)) { return new Proxy(v, swizzler(4)); }
    // Done
    assertExhaustive(v);
}

type VecFields = {
    1: 'x',
    2: keyof Vec2,
    3: keyof Vec3,
    4: keyof Vec4
}
type VecDim = 1 | 2 | 3 | 4;
type Vec = {
    1: number,
    2: Vec2,
    3: Vec3,
    4: Vec4
}
type VecBox = {
    1: { x: number },
    2: Vec2,
    3: Vec3,
    4: Vec4
} */