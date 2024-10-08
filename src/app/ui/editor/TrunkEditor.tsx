import { useFlora } from '@app/state/flora';
import { AspectRatio, Center, Container, Fieldset, FileInput, Flex, NumberInput } from '@mantine/core';
import { styles } from './TrunkEditor.css';
import { imageMIME } from '@utils/mime';
import { useState } from 'react';

const setter = (set: (v: number) => void) => ((v: unknown) => {if (typeof v === 'number') { set(v); }});

export const TrunkEditor = () => {
    /* Setup state */
    const [floraSnapshot, flora] = useFlora();
    const [textureFile, setTextureFile] = useState<File | null>(null);

    /* Return the editor */
    return (
        <Flex direction='column' gap='sm'>
            <Fieldset legend='Segments' className={styles.fieldset}>
                <Flex direction='row' gap='md' >
                    <NumberInput label='Length' value={floraSnapshot.trunk.segmentsLength} onChange={setter((v) => flora.trunk.segmentsLength = v)} />
                    <NumberInput label='Radius' value={floraSnapshot.trunk.segmentsRadius} onChange={setter((v) => flora.trunk.segmentsRadius = v)} />
                </Flex>
            </Fieldset>
            <Fieldset legend='Size' className={styles.fieldset}>
                    <NumberInput label='Trunk length' />
                    <NumberInput label='Trunk radius' />
            </Fieldset>
            <Fieldset legend='Texture'>
                <Flex direction='column' gap='md' >
                    <FileInput accept={imageMIME.join(',')} 
                        value={textureFile}
                        onChange={setTextureFile} 
                    />
                    <Center style={{ width: '100%' }}>
                        <AspectRatio ratio={1} maw='250px' style={{ width: '100%' }}>
                            <Container  style={{ backgroundColor: 'orange' }} />
                        </AspectRatio>
                    </Center>
                </Flex>
            </Fieldset>
        </Flex>
    );
};