import { Tunnel3D, Tunnel3DOverlay, TunnelEditor } from '@app/ui/workspace/WorkspaceTunnel';
import { View, ViewController } from '@three/View';
import { ReactNode, useRef } from 'react';
import { TreeBlueprintOverlay } from './TreeBlueprintOverlay';
import { TreeBlueprintEditor } from './TreeBlueprintEditor';

export type TreeBlueprintProps = {
    children?: ReactNode | ReactNode[];
};

export const TreeBlueprint = (props: TreeBlueprintProps) => {
    /* State and references */
    const controllerRef = useRef<ViewController | null>(null);
    
    return (
        <>
            {/* The state itself */}
            { props.children }

            {/* The 3D context */}
            <Tunnel3D.In>
                <View 
                    key='3d'
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
                <TreeBlueprintOverlay key='overlay' />
            </Tunnel3DOverlay.In>

            {/* The editor */}
            <TunnelEditor.In>
                <TreeBlueprintEditor key='editor' />
            </TunnelEditor.In>
        </>
    );
};