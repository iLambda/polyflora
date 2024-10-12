import { AspectRatio, Center, FileInput, Flex, Image, Loader, Overlay } from '@mantine/core';
import { imageMIME } from '@utils/mime';
import { useEffect, useState } from 'react';

export type TexturePickerProps = {
    url: string;
    onURLChanged: (url: string) => void;
    disabled?: boolean;
    label?: string;
};

export const TexturePicker = (props: TexturePickerProps) => {
    /* Setup state */
    const [url, setURL] = useState<string>(props.url);
    const [textureFile, setTextureFile] = useState<File | null>(() => new File([], props.url));
    const [isLoading, setLoading] = useState<boolean>(false);
    
    /* Generate texture URL */
    useEffect(() => {
        /* Check if texture is real */
        if (!textureFile) { return; }
        /* Generate URL */
        const blobURL = URL.createObjectURL(textureFile);
        /* Set it */
        setURL(blobURL);
        /* Cleanup function */
        return () => URL.revokeObjectURL(blobURL);
        
    }, [textureFile]);

    /* Send outwards */
    const onURLChanged = props.onURLChanged;
    useEffect(() => {setURL(props.url);}, [setURL, props.url]);
    useEffect(() => {onURLChanged?.(url);}, [onURLChanged, url]);

    /* Set loading */
    useEffect(() => setLoading(true), [url]);

    return (
        <Flex direction='column' gap='md' >
            {/* The file input */}
            <FileInput accept={imageMIME.join(',')} 
                size='xs'
                disabled={props.disabled}
                value={textureFile}
                onChange={setTextureFile} 
                label={props.label}
            />
            {/* The texture display */}
            <Center style={{ width: '100%' }}>
                <AspectRatio ratio={1} maw={'325px'} style={{ width: '100%' }} pos='relative'>
                    <Image
                        /* style={{
                            backgroundColor: '#444',
                            backgroundImage: `linear-gradient(45deg, #777 27%, transparent 27%),
                                              linear-gradient(135deg, #777 27%, transparent 27%),
                                              linear-gradient(45deg, transparent 75%, #777 75%),
                                              linear-gradient(135deg, transparent 75%, #777 75%)`,
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
                        }}      */ 
                        src={props.url}
                        onLoad={() => setLoading(false)}
                    />
                    {
                        isLoading &&
                            (<Overlay blur={5} component={Center}>
                                <Loader />
                            </Overlay>)
                    }
                    {
                        props.disabled === true &&
                            (<Overlay blur={10} backgroundOpacity={0} />)
                    }
                </AspectRatio>
            </Center>
        </Flex>
    );
};