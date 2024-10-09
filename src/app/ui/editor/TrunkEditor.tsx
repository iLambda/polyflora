import { useFlora } from '@app/state/Flora';
import { AspectRatio, Center, Fieldset, FileInput, Flex, Image, Loader, NumberInput, Overlay } from '@mantine/core';
import { styles } from './TrunkEditor.css';
import { imageMIME } from '@utils/mime';
import { useEffect, useState } from 'react';
import { useConstantWithInit } from '@utils/react/hooks/refs';

const setter = (set: (v: number) => void) => ((v: unknown) => {if (typeof v === 'number') { set(v); }});

export const TrunkEditor = () => {
    /* Setup state */
    const [floraSnapshot, flora] = useFlora();
    const [textureFile, setTextureFile] = useState<File | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    /* Create the dummy file w/ default texture */
    const dummyFile = useConstantWithInit(() => new File([], 'Wood03.png'));
    
    /* Generate texture URL */
    useEffect(() => {
        /* Check if texture is real */
        if (!textureFile) { return; }
        /* Generate URL and set it */
        const blobURL = URL.createObjectURL(textureFile);
        flora.trunk.textureURL = blobURL;
        /* Cleanup function */
        return () => URL.revokeObjectURL(blobURL);
        
    }, [textureFile, flora]);
    

    /* Return the editor */
    return (
        <Flex direction='column' gap='sm'>
            {/* Control segments */}
            <Fieldset legend='Segments' className={styles.fieldset}>
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        label='Length' 
                        value={floraSnapshot.trunk.segmentsLength} 
                        onChange={setter((v) => flora.trunk.segmentsLength = v)} 
                    />
                    <NumberInput 
                        label='Radius' 
                        value={floraSnapshot.trunk.segmentsRadius} 
                        onChange={setter((v) => flora.trunk.segmentsRadius = v)} 
                    />
                </Flex>
            </Fieldset>
            {/* Control size */}
            <Fieldset legend='Size' className={styles.fieldset}>
                    <NumberInput 
                        label='Trunk length' 
                        value={floraSnapshot.trunk.sizeLength} 
                        onChange={setter((v) => flora.trunk.sizeLength = v)}  
                    />
                    <NumberInput 
                        label='Trunk radius' 
                        value={floraSnapshot.trunk.sizeRadius} 
                        onChange={setter((v) => flora.trunk.sizeRadius = v)}  
                    />
            </Fieldset>
            {/* Growth control */}
            <Fieldset legend='Growth' className={styles.fieldset}>
                <span style={{color: 'red'}}><b>TODO !!!</b></span>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Texture'>
                <Flex direction='column' gap='md' >
                    {/* The file input */}
                    <FileInput accept={imageMIME.join(',')} 
                        value={textureFile ?? dummyFile}
                        onChange={setTextureFile} 
                    />
                    {/* The texture display */}
                    <Center style={{ width: '100%' }}>
                        <AspectRatio ratio={1} maw={'325px'} style={{ width: '100%' }} pos='relative'>
                            <Image 
                                src={floraSnapshot.trunk.textureURL} 
                                onLoadStart={() => setLoading(true)}
                                onLoad={() => setLoading(false)}
                            />
                            {
                                isLoading &&
                                    (<Overlay blur={5} component={Center}>
                                        <Loader />
                                    </Overlay>)
                            }
                        </AspectRatio>
                    </Center>
                </Flex>
            </Fieldset>
        </Flex>
    );
};