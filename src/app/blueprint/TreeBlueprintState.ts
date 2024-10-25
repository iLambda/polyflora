import { createBlueprintMolecule } from '@app/state/Blueprint';
import { BranchesParameters } from '@three/flora/tree/Branches';
import { LeavesParameters } from '@three/flora/tree/Leaves';
import { TrunkParameters } from '@three/flora/tree/Trunk';
import { Boolean, Literal, Number, Record, Static, String, Tuple, Union } from 'runtypes';
import { ref } from 'valtio';

/* The state of the blueprint */
export type TreeBlueprintState = Static<typeof TreeBlueprintState>;
export const TreeBlueprintState = Record({
    env: Record({
        camera: Record({
            position: Tuple(Number, Number, Number),
            target: Tuple(Number, Number, Number),
        }),
    }),
    seed: String,
    shading: Union(Literal('shaded'), Literal('wireframe'), Literal('skeletal')),
    trunk: TrunkParameters,
    branch: BranchesParameters.extend({ textureURL: String }),
    leaves: LeavesParameters.extend({ enabled: Boolean }),
});

/* The initial value of the state of this blueprint */
export const initialState = () : TreeBlueprintState => ({
    env: {
        camera: ref({
            position: [68, 37, 0],
            target: [0, 35, 0],
        }),
    },
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
        textureURL: 'Bark01.png',
    },
    branch: {
        bendAmount: -65,
        bendDirection: 'normal',
        crinklingMin: 0,
        crinklingMax: 10,
        curvature: 0.8,
        distribution: 'random',
        geometryMode: ['cross-x', 'cross-y'],
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
        textureURL: 'Cross01.png',
    },
    leaves: {
        enabled: false,
        distribution: 'null',
        nArticulations: 15,
        minAngle: 0,
        maxAngle: 0,
        minPosition: 0,
        maxPosition: 1, 
        orientationSpace: 'local',
        palette: [
            '#ABBE7D',
            '#9CCF64',
            '#A2D077',
            '#D5FF4C',
            '#C9E65D',
            '#C3D276',
            '#AAC682',
            '#B4CC88',
            '#C3E186',
        ],
        sizeHeight: 2.5,
        sizeWidth: 2.5,
        texturePivotU: 0.4711,
        texturePivotV: 0.0,
        textureURL: 'Leaf01.png',
    },
});

/* The molecule storing the state */
export const TreeBlueprintMolecule = createBlueprintMolecule(TreeBlueprintState, initialState);