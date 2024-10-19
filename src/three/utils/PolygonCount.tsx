/* eslint-disable react-refresh/only-export-components */
import { useConstant, useRefWithInit } from '@utils/react/hooks/refs';
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';


/* The state */
const polygonCountContext = createContext<ReturnType<typeof proxyMap<symbol, PolygonCount>> | null>(null);
export const PolygonCounter = ({ children } : { children?: ReactNode | ReactNode[] }) => {
    /* The store ref */
    const storeRef = useRefWithInit(() => proxyMap<symbol, PolygonCount>());
    /* Return */
    return (
        <polygonCountContext.Provider value={storeRef.current}>
            { children }
        </polygonCountContext.Provider>
    );
};

export type PolygonCount = { verts: number; tris: number; };
export const usePolygonCount = () : PolygonCount => {   
    // Get context 
    const polygonCountStore = useContext(polygonCountContext);
    if (!polygonCountStore) { throw new Error('usePolygonCount called outside of <PolygonCounter>'); }
    // Get snapshot
    const snapshot = useSnapshot(polygonCountStore);
    // Accumulate
    const count = { verts: 0, tris: 0 };
    snapshot.forEach(({verts, tris}) => {
        count.verts += verts;
        count.tris += tris;
    });
    // Return
    return count;
};

export const useRegisterPolygonCount = (verts: number, tris: number) => {
    // Get context 
    const polygonCountStore = useContext(polygonCountContext);
    if (!polygonCountStore) { throw new Error('usePolygonCount called outside of <PolygonCounter>'); }
    // Create unique id
    const uniqueId = useConstant(Symbol('polycount'));
    const polyCount = useMemo(() => ({ verts, tris }), [verts, tris]);
    // Set data
    useEffect(() => {
        polygonCountStore.set(uniqueId, polyCount);
        return (() => void(polygonCountStore.delete(uniqueId)));
    }, [polyCount, uniqueId, polygonCountStore]);
};