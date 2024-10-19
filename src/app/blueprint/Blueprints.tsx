import { TreeBlueprint } from '@app/blueprint/TreeBlueprint';
import { TreeBlueprintMolecule, TreeBlueprintState, TreeBlueprintTag } from '@app/blueprint/TreeBlueprintState';
import { BlueprintState } from '@app/state/Blueprint';
import { Molecule } from 'bunshi';
import { FC } from 'react';
import { Literal, Runtype, Static, Union } from 'runtypes';

/* The data associated to a blueprint */
export type Blueprint = {
    readonly component: FC,
    readonly state: {
        readonly type: Runtype<BlueprintState>,
        readonly molecule: Molecule<BlueprintState>
    }
};

/* The list of blueprint tags */
export type BlueprintTags = Static<typeof BlueprintTags>;
export const BlueprintTags = Union(
    Literal(TreeBlueprintTag),
);

/* The list of blueprints */
export const Blueprints = {
    // Tree blueprint
    [TreeBlueprintTag]: {
        component: TreeBlueprint,
        state: {
            type: TreeBlueprintState,
            molecule: TreeBlueprintMolecule,
        },
    },
} as const satisfies Record<BlueprintTags, Blueprint>;