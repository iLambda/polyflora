import * as FBXParser from './fbx-parser';
import * as FBXBuilder from './fbx-builder';

export const serialize = FBXParser.serialize;
export const unserialize = FBXParser.parse;

export const Builder = {
    document: FBXBuilder.document,
    node: FBXBuilder.node,
    prop: FBXBuilder.prop,
};

export type FBXDocument = FBXParser.FBXDocument;
export type FBXProperty = FBXParser.FBXProperty;
export type FBXNode = FBXParser.FBXNode;