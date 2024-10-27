 
import { molecule } from 'bunshi';
import { euclideanModulo } from 'three/src/math/MathUtils.js';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';
import { saveAs } from 'file-saver';

// The type of the store 
export type DocumentStore = {
    current: string | null;
    order: string[];
    data: Map<string, 
        { 
            name: string, 
            state: unknown 
            blobs: Map<string, { url: string, file: File }>,
        }>;

    readonly new: () => string;
    readonly save: (id: string) => void;
    readonly close: (id: string) => boolean;
    readonly cycle: (offset: number) => void;
};

/* Create the store */
export const DocumentStoreMolecule = molecule(() => {
    // Create id counter holder
    const id = { current: 0 };
    // Create state 
    const state : DocumentStore = proxy<DocumentStore>({
        current: null,
        order: [],
        data: proxyMap(),
        
        // Create new file
        new: () => {
            /* Get its ID */
            const ID = id.current++;
            const fullID = `document${ID}`;
            /* Add it */
            state.data.set(fullID, { 
                name: `Untitled (${ID})`, 
                state: undefined,
                blobs: proxyMap(),
            });
            state.order.push(fullID);
            state.current = fullID;
            /* Return */
            return fullID;
        },
        
        // Close a file
        close: (documentID: string) => {
            /* If docID is wrong, return */
            if (!state.data.has(documentID)) {
                return false;
            }
            /* Get the index of the document ID in the ordered list */
            const orderIdx = state.order.findIndex(v => v === documentID);
            /* Try to find the tab to pivot to, but only if we were focused */
            if (state.current === documentID) {
                // Compute the pivot tab
                const pivotID : string | null = 
                    orderIdx > 0   ? (state.order[orderIdx + 1] ?? state.order[orderIdx - 1] ?? null) :
                    orderIdx === 0 ? (state.order[1] ?? null) 
                                : null;
                // Pivot
                state.current = pivotID;
            }
            /* Remove from order list */
            if (orderIdx > -1) {
                state.order.splice(orderIdx, 1);
            }
            /* Release all blobs */
            const blobs = state.data.get(documentID)!.blobs;
            blobs.forEach(({ url }) => {
                URL.revokeObjectURL(url);
            });

            /* Remove from state list */
            return state.data.delete(documentID);
        },

        // Save a file
        // TODO: Make work when electron
        save: (documentID: string) => {

            /* If docID is wrong, return */
            if (!state.data.has(documentID)) {
                return;
            }
            /* Get document and state */
            const entry = state.data.get(documentID)!;
            const name = entry.name;
            const data = entry.state;
            /* Save */
            const textPayload = JSON.stringify(data, undefined, 4);
            const blob = new Blob([textPayload], { type: 'application/json' });
            saveAs(blob, `${name}.json`);
        },

        // Go to next/previous item
        cycle: (offset: number) => {
            // Find index 
            const orderIdx = state.order.findIndex(v => v === state.current);
            if (orderIdx < 0) { return; }
            // Find next index
            const targetIdx = euclideanModulo(orderIdx + offset, state.order.length);
            state.current = state.order[targetIdx]!;
            // Return
            return state.current;
        },

        // 

    });
    // Return it
    return state;
});