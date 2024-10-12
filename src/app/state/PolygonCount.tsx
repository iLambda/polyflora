import { useConstant } from '@utils/react/hooks/refs';
import { useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';


/* The state */
const globalPolygonCount = proxyMap<symbol, PolygonCount>();

export type PolygonCount = { verts: number; tris: number; };
export const usePolygonCount = () : PolygonCount => {    
    // Get snapshot
    const snapshot = useSnapshot(globalPolygonCount);
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
    // Create unique id
    const uniqueId = useConstant(Symbol('polycount'));
    const polyCount = useMemo(() => ({ verts, tris }), [verts, tris]);
    // Set data
    useEffect(() => {
        globalPolygonCount.set(uniqueId, polyCount);
        return (() => void(globalPolygonCount.delete(uniqueId)));
    }, [polyCount, uniqueId]);
};