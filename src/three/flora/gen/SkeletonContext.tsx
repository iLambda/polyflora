/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from 'react';
import { SkeletonData } from './SkeletonData';

/* The parent skeleton context */
const skeletonContext = createContext<Readonly<SkeletonData> | null>(null);

/* Access parent skeleton context */
export const useParentSkeleton = () => useContext(skeletonContext);
/* The raw skeleton provider */
type SkeletonProviderProps = {
    children: ReactNode | ReactNode[];
    skeleton: SkeletonData;
};

export const SkeletonProvider = (props: SkeletonProviderProps) => (
    <skeletonContext.Provider value={props.skeleton}>
        { props.children }
    </skeletonContext.Provider>
);
