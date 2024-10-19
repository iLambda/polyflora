 
import { BlueprintState } from '@app/state/Blueprint';
import { molecule } from 'bunshi';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

// The type of the store 
export type DocumentStore = {
    current: string | null;
    data: Map<string, { name: string, state: BlueprintState | undefined }>;
    order: string[];

    new: () => string;
    close: (id: string) => boolean;
};

/* Create the store */
export const DocumentStoreMolecule = molecule(() => {
    // Create id counter holder
    const id = { current: 0 };
    // Create state 
    const state = proxy<DocumentStore>({
        current: null,
        data: proxyMap(),
        order: [],

        new: () => {
            /* Get its ID */
            const ID = id.current++;
            const fullID = `document${ID}`;
            /* Add it */
            state.data.set(fullID, { name: `Untitled (${ID})`, state: undefined });
            state.order.push(fullID);
            state.current = fullID;
            /* Return */
            return fullID;
        },
        
        close: (_documentID: string) => {
            /* Done */
            return false;
        },
    });
    // Return it
    return state;
});