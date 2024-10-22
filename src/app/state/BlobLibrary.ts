import { blueprintScope } from '@app/state/Blueprint';
import { DocumentStoreMolecule } from '@app/state/Documents';
import { molecule } from 'bunshi';
import { proxy, ref } from 'valtio';

export type BlobLibrary = {
    data: Map<string, { url: string, file: File }>;

    readonly register: (name: string, file: File) => string;
    readonly dispose: (name: string) => boolean;
};

export const BlobLibraryMolecule = molecule((mol, scope) => {
    /* Get the document ID from the blueprint scope and the documents store */
    const documentID = scope(blueprintScope);
    const documentStore = mol(DocumentStoreMolecule);
    
    /* If ID is null, something wrong happened */
    if (documentID === null) {
        throw new Error('BlobLibraryMolecule was supplied a null DocumentID.');
    }
    /* Ensure the state is already stored in documents */
    if (!documentStore.data.has(documentID)) {
        throw new Error(`BlobLibraryMolecule was supplied a DocumentID that didn't actually exist in the store.`);
    }

    /* Get the document store entry */
    const documentEntry = documentStore.data.get(documentID)!;
    /* Create state */
    const state : BlobLibrary = proxy<BlobLibrary>({
        // The library data
        data: documentEntry.blobs,

        // Add something to the blob lib
        register: (name, file) => {
            // Check if we have something to revoke
            const toRevoke = state.data.get(name)?.url;
            // Create new URL and register (!!!! DO NOT FORGET REF ON FILE)
            const url = URL.createObjectURL(file);
            state.data.set(name, { url, file: ref(file) });
            // Revoke old URL if we need to
            if (toRevoke) {
                URL.revokeObjectURL(toRevoke);
            }
            // Return the URL
            return url;
        },

        // Remove from blob lib
        dispose: (name) => {
            // Get value. If nonexistent, return
            const blobEntry = state.data.get(name);
            if (!blobEntry) { return false; }
            // Remove and revoke
            state.data.delete(name);
            // Revoke
            URL.revokeObjectURL(blobEntry.url);
            // OK
            return true;
        },
    });

    /* Return it */
    return state;
});