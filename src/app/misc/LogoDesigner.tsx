import { DataControl } from '@app/blueprint/editors/controls/DataControl';
import { Fieldgroup } from '@app/blueprint/editors/controls/Fieldgroup';
import { NumberPicker } from '@app/blueprint/editors/controls/NumberPicker';
import { LogoRenderer } from '@app/misc/LogoRenderer';
import { Flex } from '@mantine/core';
import { molecule } from 'bunshi';
import { useMolecule } from 'bunshi/react';
import { useRef } from 'react';
import { proxy, useSnapshot } from 'valtio';

const LogoDesignerMolecule = molecule((_mol, _scope) => {
    return proxy({
        width: 256,
        height: 256,
    });
});

export const LogoDesigner = () => {
    // State of the logo designer
    const logoDesignerStore = useMolecule(LogoDesignerMolecule);
    const logoDesignerSnapshot = useSnapshot(logoDesignerStore);
    // The reference to the canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    // The component itself
    return (
        <Flex direction='row' gap='md' style={{ height: '100%', width: '100%' }}>
            {/* The renderer itself */}
            <div style={{ flex: 1, height: '100%', position: 'relative', backgroundColor: 'white' }}>
                <LogoRenderer ref={canvasRef}
                    style={{ position: 'absolute', inset: '0' }}
                />
                <div style={{
                    opacity: 0.75,
                    position: 'absolute',
                    inset: '0',
                    pointerEvents: 'none',
                }}>
                    <div style={{ position: 'absolute', inset: `0 0 calc(50% + ${logoDesignerSnapshot.height / 2}px) 0`, backgroundColor: 'black' }} />
                    <div style={{ position: 'absolute', inset: `calc(50% + ${logoDesignerSnapshot.height / 2}px) 0 0 0`, backgroundColor: 'black' }} />
                    <div style={{ position: 'absolute', inset: `0 calc(50% + ${logoDesignerSnapshot.width / 2}px) 0 0`, backgroundColor: 'black' }} />
                    <div style={{ position: 'absolute', inset: `0 0 0 calc(50% + ${logoDesignerSnapshot.width / 2}px)`, backgroundColor: 'black' }} />
                </div>
            </div>
            {/* The editor */}
            <div style={{ width: '300px' }}>
                <Fieldgroup legend='Dimensions'>
                    <DataControl label='Size'>
                        <NumberPicker 
                            min={0}
                            max={512}
                            step={1}
                            value={logoDesignerSnapshot.width}
                            onChange={v => logoDesignerStore.width = v}
                        />
                        <NumberPicker 
                            min={0}
                            max={512}
                            step={1}
                            value={logoDesignerSnapshot.height}
                            onChange={v => logoDesignerStore.height = v}
                        />
                    </DataControl>
                </Fieldgroup>
            </div>
        </Flex>
    );
};