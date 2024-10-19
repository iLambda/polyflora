import { Number, Tuple } from 'runtypes';

export const Matrix3Tuple = Tuple(
    Number, Number, Number,
    Number, Number, Number,
    Number, Number, Number,
);

export const Matrix4Tuple = Tuple(
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
    Number, Number, Number, Number,
);