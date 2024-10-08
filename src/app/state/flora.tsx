/* eslint-disable react-refresh/only-export-components */
import { TrunkParameters } from '@three/flora/tree/Trunk';
import { useRefWithInit } from '@utils/react/hooks/refs';
import { createContext, ReactNode, useContext } from 'react';
import { proxy, Snapshot, useSnapshot } from 'valtio';

/* The data contained in the store */
type FloraData = {
    seed: string;
    trunk: TrunkParameters;
};
/* The initial value */
const initialFloraData : FloraData = {
    seed: '3551376191',
    trunk: {
        segmentsLength: 4,
        segmentsRadius: 6,
        sizeLength: 45,
        sizeRadius: 0.5,
        tilingU: 1,
        tilingV: 8,
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