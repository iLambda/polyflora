/* eslint-disable react-refresh/only-export-components */
import { BranchesParameters } from '@three/flora/tree/Branches';
import { TrunkParameters } from '@three/flora/tree/Trunk';
import { useRefWithInit } from '@utils/react/hooks/refs';
import { createContext, ReactNode, useContext } from 'react';
import { proxy, Snapshot, useSnapshot } from 'valtio';

/* The data contained in the store */
export type FloraData = {
    seed: string;
    shading: 'shaded' | 'wireframe' | 'skeletal';
    trunk: TrunkParameters,
    branch: BranchesParameters & {
        textureURL: string;
    }
};
/* The initial value */
const initialFloraData : FloraData = {
    seed: '3551376191',
    shading: 'shaded',
    trunk: {
        bendAmount: 0,
        bendDirection: 'normal',
        crinklingMin: 0,
        crinklingMax: 8,
        curvature: 0.8,
        segmentsRadius: 6,
        segmentsLength: 4,
        sizeLength: 45,
        sizeRadius: 1,
        tilingU: 1,
        tilingV: 8,
        textureURL: 'Wood03.png',
    },
    branch: {
        bendAmount: -65,
        bendDirection: 'normal',
        crinklingMin: 0,
        crinklingMax: 10,
        curvature: 0.8,
        distribution: 'random',
        geometryMode: 'cross-xy',
        minAngle: 60,
        minLength: 0.5,
        minPosition: 0.35,
        minRadius: 0.9,
        minCrossWidth: 1,
        maxCrossWidth: 1,
        maxAngle: 90,
        maxLength: 0.8,
        maxPosition: 0.9,
        maxRadius: 1,
        nArticulations: 30,
        segmentsLength: 4,
        segmentsRadius: 3,
        textureURL: 'Cross09.png',
    },
};

/* The context that gives store data */
const FloraStoreContext = createContext<FloraData | null>(null);
export const FloraStoreProvider = ({ children } : { children?: ReactNode | ReactNode[] }) => {
    // Create a ref to hold the store
    const storeRef = useRefWithInit(() => proxy(initialFloraData));
    // Create the provider
    return (
        <FloraStoreContext.Provider value={storeRef.current}>
            {children}
        </FloraStoreContext.Provider>
    );
};

/* Get some data in the store */
export const useFlora = () : [Snapshot<FloraData>, FloraData] => {
    // Get store for context
    const store = useContext(FloraStoreContext);
    if (store === null) {
        throw new Error('useFlora called outside of <FloraStoreProvider>.');
    }
    // Return data
    return [useSnapshot(store), store];
};