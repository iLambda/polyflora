import { DocumentStoreMolecule } from '@app/state/Documents';
import { createScope, molecule } from 'bunshi';
import { Runtype } from 'runtypes';
import { proxy } from 'valtio';

/* The scope of blueprints */
export const blueprintScope = createScope<string | null>(null);

/* Create a blueprint state molecule */
export const createBlueprintMolecule = <T extends object>(stateTy: Runtype<T>, initialStateFactory: () => T) => molecule((mol, scope) : T => {
    /* Get the document ID from the blueprint scope and the documents store */
    const documentID = scope(blueprintScope);
    const documentStore = mol(DocumentStoreMolecule);

    /* If ID is null, something wrong happened */
    if (documentID === null) {
        throw new Error('TreeBlueprintMolecule was supplied a null DocumentID.');
    }

    /* Check if the state is already stored in documents */
    if (!documentStore.data.has(documentID)) {
        throw new Error(`TreeBlueprintMolecule was supplied a DocumentID that didn't actually exist in the store.`);
    }

    /* Check if state is existing in store, and validating its type.
       If it is the right type, return it ! */
    const documentEntry = documentStore.data.get(documentID)!;
    if (stateTy.guard(documentEntry.state)) {
        return documentEntry.state;
    }

    /* Else, overwrite state and return */
    return (documentEntry.state = proxy(initialStateFactory()));
});