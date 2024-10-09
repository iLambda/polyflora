import { useFlora } from '@app/state/Flora';
import { AspectRatio, Center, Fieldset, FileInput, Flex, Image, Loader, NumberInput, Overlay, Select } from '@mantine/core';
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
                <Flex direction='row' gap='md'>
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Length' 
                        size='xs'
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsLength} 
                        onChange={setter((v) => flora.trunk.segmentsLength = Math.max(1, v))} 
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Radius'
                        size='xs' 
                        step={0.5}
                        allowDecimal={false}
                        allowNegative={false}
                        value={floraSnapshot.trunk.segmentsRadius} 
                        onChange={setter((v) => flora.trunk.segmentsRadius = Math.max(3, v))} 
                    />
                </Flex>
            </Fieldset>
            {/* Control size */}
            <Fieldset legend='Size' className={styles.fieldset}>
                <Flex direction='row' gap='md' >
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Trunk length' 
                        size='xs'
                        allowNegative={false}
                        value={floraSnapshot.trunk.sizeLength} 
                        onChange={setter((v) => flora.trunk.sizeLength = v)}  
                    />
                    <NumberInput 
                        style={{ flex: 1 }}
                        label='Trunk radius' 
                        size='xs'
                        allowNegative={false}
                        step={0.1}
                        value={floraSnapshot.trunk.sizeRadius} 
                        onChange={setter((v) => flora.trunk.sizeRadius = v)}  
                    />
                </Flex>
            </Fieldset>
            {/* Shape control */}
            <Fieldset legend='Shape' className={styles.fieldset}>
                {/* Curvature */}
                <NumberInput 
                    label='Curvature' 
                    size='xs'
                    allowNegative={false}
                    step={0.1}
                    value={floraSnapshot.trunk.curvature} 
                    onChange={setter((v) => flora.trunk.curvature = Math.max(0.01, v))}  
                />
                {/* Crinlking */}
                <Fieldset legend='Crinkling' className={`${styles.fieldset} ${styles.fieldsetInline}`}>
                    <Flex direction='row' gap='md' >
                        <NumberInput 
                            style={{ flex: 1 }}
                            label='Min' 
                            size='xs'
                            allowNegative={false}
                            step={0.25}
                            suffix='°'
                            value={floraSnapshot.trunk.crinklingMin} 
                            onChange={setter((v) => flora.trunk.crinklingMin = Math.max(0, Math.min(v, flora.trunk.crinklingMax)))}  
                        />
                        <NumberInput 
                            style={{ flex: 1 }}
                            label='Max' 
                            size='xs'
                            allowNegative={false}
                            step={0.25}
                            suffix='°'
                            value={floraSnapshot.trunk.crinklingMax} 
                            onChange={setter((v) => flora.trunk.crinklingMax = Math.max(0, Math.max(v, flora.trunk.crinklingMin)))}  
                        />
                    </Flex>
                </Fieldset>
                {/* Bending control */}
                <Fieldset legend='Bending' className={`${styles.fieldset} ${styles.fieldsetInline}`}>
                  <Flex direction='row' gap='md' >
                    <Select
                        style={{ flex: 5 }}
                        size='xs'
                        label='Direction'
                        defaultValue='normal'
                        data={[
                            { value: 'up', label: 'Up' },
                            { value: 'down', label: 'Down' },
                            { value: 'normal', label: 'Normal' },
                        ]}
                    />                                        
                    <NumberInput 
                        style={{ flex: 4 }}
                        label='Amount' 
                        size='xs'
                        suffix='°'
                        step={0.1}
                        value={-65}
                    />
                    </Flex>
                </Fieldset>
            </Fieldset>
            {/* Texture zone */}
            <Fieldset legend='Texture'>
                <Flex direction='column' gap='md' >
                    {/* The file input */}
                    <FileInput accept={imageMIME.join(',')} 
                        size='xs'
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