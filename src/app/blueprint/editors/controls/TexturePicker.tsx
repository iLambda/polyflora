import { AspectRatio, Center, Flex, Image, Loader, Overlay, rem } from '@mantine/core';
import { imageMIME } from '@utils/mime';
import { useEffect, useMemo, useState } from 'react';
import { DataControl } from './DataControl';
import { FilePicker } from './FilePicker';
import { ComponentScope, molecule, useMolecule } from 'bunshi/react';
import { BlobLibraryMolecule } from '@app/state/BlobLibrary';
import { blueprintScope } from '@app/state/Blueprint';
import { proxy, ref, useSnapshot } from 'valtio';
import { PivotPicker } from '@app/blueprint/editors/controls/PivotPicker';

export type TexturePickerProps = {
    blobLibraryID: string;
    disabled?: boolean;
    label: string;
    url: string;
    onURLChanged: (url: string) => void;
    pivot?: { x: number, y: number };
    onPivotChanged?: (v: { x: number, y: number }) => void;
};

const TexturePickerInternalMolecule = molecule<{ file: File | null }>((mol, scope) => {
    scope(ComponentScope);
    scope(blueprintScope);
    return proxy({ file: null });
});

export const TexturePicker = (props: TexturePickerProps) => {
    /* Access the blob library */
    const blobLibrary = useMolecule(BlobLibraryMolecule);

    /* Setup state */
    const [isLoading, setLoading] = useState<boolean>(false);
    const state = useMolecule(TexturePickerInternalMolecule);
    const snapshot = useSnapshot(state);
    const file = snapshot.file;
 
    /* Generate texture URL */
    const onURLChanged = props.onURLChanged;
    useEffect(() => {
        /* Check if texture is real, avoid re-register if same file */
        if (!(file && file?.size > 0)) { return; }
        if (blobLibrary.data.get(props.blobLibraryID)?.file === file) { return; }
        /* Register in BlobLib */
        const blobURL = blobLibrary.register(props.blobLibraryID, file);
        /* Set it */
        onURLChanged?.(blobURL);
    }, [props.blobLibraryID, blobLibrary, file, onURLChanged]);

    /* Set loading */
    useEffect(() => setLoading(true), [props.url]);

    /* Compute the displayed file */
    const displayedFile : File = useMemo(() => {
        // If we have a file, return it
        if (file) { return file; }
        // If the URL corresponds to the one stored in bloblib, make a dummy with the right name
        // By default, return normal
        return new File([], blobLibrary.data.get(props.blobLibraryID)?.file?.name ?? props.url);
    }, [file, props.url, props.blobLibraryID, blobLibrary.data]);

    return (
        <Flex direction='column' gap={rem(6)} >
            {/* The file input */}
            <DataControl label={props.label}>
                <FilePicker accept={imageMIME.join(',')} 
                    disabled={props.disabled}
                    value={displayedFile}
                    onChange={v => state.file = v ? ref(v) : null}
                />
            </DataControl>
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
                        style={{ filter: `grayscale(${props.disabled ? 1 : 0})` }}
                    />
                    {
                        props.pivot && props.onPivotChanged && (<Overlay backgroundOpacity={0}>
                            <PivotPicker 
                                style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
                                value={props.pivot}
                                onChanged={props.onPivotChanged}
                            />
                        </Overlay>)  
                    }
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