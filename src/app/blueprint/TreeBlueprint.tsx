import { Tunnel3D, Tunnel3DOverlay, TunnelEditor } from '@app/ui/workspace/WorkspaceTunnel';
import { TreeBlueprint3DView, TreeBlueprint3DViewController } from '@app/blueprint/TreeBlueprint3DView';
import { ReactNode } from 'react';
import { TreeBlueprintOverlay } from './TreeBlueprintOverlay';
import { TreeBlueprintEditor } from './TreeBlueprintEditor';
import { FloraStoreProvider } from '@app/state/Flora';
import { useReactiveRef } from '@utils/react/hooks/state';

export type TreeBlueprintProps = {
    children?: ReactNode | ReactNode[];
};

export const TreeBlueprint = (props: TreeBlueprintProps) => {
    /* State and references */
    const [controllerRef, controller] = useReactiveRef<TreeBlueprint3DViewController>();
    
    return (
        <>
            {/* The state itself */}
            <FloraStoreProvider>
                { props.children }
            </FloraStoreProvider>

            {/* The 3D context */}
            <Tunnel3D.In>
                <TreeBlueprint3DView key='3d'
                    controllerRef={controllerRef}
                    environment={{ 
                        grid: { visibility: 'shown' },
                        lighting: {
                            ambient: { color: 0xffffff, intensity: 0.2 },
                            sun: { color: 0xffffff, intensity: 1 },
                        },
                    }} 
                />
            </Tunnel3D.In>

            {/* The view overlay */}
            <Tunnel3DOverlay.In>
                <TreeBlueprintOverlay key='overlay'
                    viewController={controller}
                />
            </Tunnel3DOverlay.In>

            {/* The editor */}
            <TunnelEditor.In>
                <TreeBlueprintEditor key='editor' />
            </TunnelEditor.In>
        </>
    );
};