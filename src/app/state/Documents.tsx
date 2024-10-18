/* eslint-disable react-refresh/only-export-components */
import { useRefWithInit } from '@utils/react/hooks/refs';
import { createContext, forwardRef, MutableRefObject, ReactNode, useContext, useImperativeHandle, useRef } from 'react';
import { proxy, Snapshot, useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';

// The type of the store 
export type DocumentStore = {
    current: string | null;
    data: Map<string, { name: string }>;
    order: string[];

    newDocument: () => string;
    closeDocument: (id: string) => boolean;
};

/* Create the store */
const createDocumentStore = (idCounterRef: MutableRefObject<number>) : DocumentStore => {
    // Create state 
    const state = proxy<DocumentStore>({
        current: null,
        data: proxyMap(),
        order: [],

        newDocument: () => {
            /* Get its ID */
            const ID = idCounterRef.current++;
            const fullID = `document${ID}`;
            /* Add it */
            state.data.set(fullID, { name: `Untitled (${ID})` });
            state.order.push(fullID);
            state.current = fullID;
            /* Return */
            return fullID;
        },
        
        closeDocument: (id: string) => {
            /* Done */
            return false;
        },
    });
    // Return it
    return state;

};

/* The context that gives store data */
const DocumentStoreContext = createContext<DocumentStore | null>(null);
type DocumentStoreProviderProps = { children?: ReactNode | ReactNode[] };
export const DocumentStoreProvider = forwardRef<DocumentStore, DocumentStoreProviderProps>(({ children }, ref) => {
    // Create a ref to hold the store
    const nextDocumentNumber = useRef(0);
    const storeRef = useRefWithInit(() => createDocumentStore(nextDocumentNumber));
    // Expose ref
    useImperativeHandle(ref, () => storeRef.current, [storeRef]);
    // Create the provider
    return (
        <DocumentStoreContext.Provider value={storeRef.current}>
            {children}
        </DocumentStoreContext.Provider>
    );
});

/* Get a snapshot of the store */
export const useDocuments = () : [Snapshot<DocumentStore>, DocumentStore] => {
    // Get store for context
    const store = useDocumentsStore();    // Return data
    return [useSnapshot(store), store];
};

/* Get the store itself */
export const useDocumentsStore = () : DocumentStore => {
    // Get store for context
    const store = useContext(DocumentStoreContext);
    if (store === null) {
        throw new Error('useDocumentStore called outside of <DocumentStoreProvider>.');
    }
    // Return data
    return store;
};