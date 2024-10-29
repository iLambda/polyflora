import { FBXDocument, FBXNode, FBXProperties, FBXProperty, FBXPropertyType, FBXPropertyValue } from './fbx-parser';

export const prop = <T extends FBXPropertyType>(type: T, value: FBXPropertyValue<T>) : FBXProperties<T> => ({ type, value });
export const node = (str: TemplateStringsArray) => (data: (FBXNode | FBXProperty)[]) : FBXNode => ({
    name: str[0]!,
    properties: data.filter(p => 'type' in p),
    children: data.filter(p => 'name' in p),
});
export const document = (str: TemplateStringsArray) => (data: FBXNode[]) : FBXDocument => ({
    version: parseInt(str[0]!),
    children: data,
});