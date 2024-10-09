/* eslint-disable react-refresh/only-export-components */
import { LimbParameters } from '@three/flora/tree/Limb';
import { SkeletonParameters } from '@three/flora/tree/Skeleton';
import { useRefWithInit } from '@utils/react/hooks/refs';
import { createContext, ReactNode, useContext } from 'react';
import { proxy, Snapshot, useSnapshot } from 'valtio';

/* The data contained in the store */
export type FloraData = {
    seed: string;
    shading: 'shaded' | 'shaded-wireframe' | 'wireframe' | 'skeleton';
    trunk: SkeletonParameters & LimbParameters;
};
/* The initial value */
const initialFloraData : FloraData = {
    seed: '3551376191',
    shading: 'shaded',
    trunk: {
        segmentsLength: 4,
        sizeLength: 45,
        segmentsRadius: 6,
        sizeRadius: 0.5,
        tilingU: 1,
        tilingV: 8,
        textureURL: 'Wood03.png',
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