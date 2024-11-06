import { Tunnel3D, Tunnel3DOverlay, TunnelEditor } from '@app/ui/workspace/WorkspaceTunnel';
import { TreeBlueprint3DView, TreeBlueprint3DViewController } from '@app/blueprint/TreeBlueprint3DView';
import { TreeBlueprintOverlay } from './TreeBlueprintOverlay';
import { TreeBlueprintEditor } from './TreeBlueprintEditor';
import { useReactiveRef } from '@utils/react/hooks/state';

export const TreeBlueprint = () => {
    /* Create a reactive ref for the view controller */
    const [controllerRef, controller] = useReactiveRef<TreeBlueprint3DViewController>();
    
    return (
        <>
            {/* The 3D context */}
            <Tunnel3D.In>
                <TreeBlueprint3DView
                    controllerRef={controllerRef}
                    environment={{ 
                        grid: { visibility: 'shown' },
                        lighting: {
                            ambient: { color: 0xffffff, intensity: 0.35 },
                            sun: { color: 0xffffff, intensity: 1.25 },
                        },
                    }} 
                />
            </Tunnel3D.In>

            {/* The view overlay */}
            <Tunnel3DOverlay.In>
                <TreeBlueprintOverlay
                    viewController={controller}
                />
            </Tunnel3DOverlay.In>

            {/* The editor */}
            <TunnelEditor.In>
                <TreeBlueprintEditor />
            </TunnelEditor.In>
        </>
    );
};