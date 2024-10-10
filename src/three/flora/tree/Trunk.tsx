import { Skeleton, SkeletonParameters } from '@three/flora/gen/Skeleton';
import { Limb, LimbParameters } from '../gen/Limb';
import { Static } from 'runtypes';
import { ReactNode } from 'react';

export const TrunkParameters = SkeletonParameters.extend(LimbParameters.fields);
export type TrunkParameters = Static<typeof TrunkParameters>;

type TrunkProps = TrunkParameters & {
    /* The seed of the generated skeleton & limn */
    seed: string;
    /* The name will be appended to the seed for better generation */
    name?: string;
    /* The shading used to render the trunk */
    shading: 'shaded' | 'wireframe' | 'skeletal';
    /* The children */
    children?: ReactNode | ReactNode[];
};

export const Trunk = (props: TrunkProps) => (
    <Skeleton
        bendAmount={props.bendAmount}
        bendDirection={props.bendDirection}
        segmentsLength={props.segmentsLength}
        sizeLength={props.sizeLength}
        crinklingMin={props.crinklingMin}
        crinklingMax={props.crinklingMax}
        seed={props.seed}
        name={props.name}
    >
        <Limb 
            curvature={props.curvature}
            shading={props.shading}
            segmentsRadius={props.segmentsRadius}
            sizeRadius={props.sizeRadius}
            tilingU={props.tilingU}
            tilingV={props.tilingV}
            textureURL={props.textureURL}
        />
        { props.children }
    </Skeleton>
);