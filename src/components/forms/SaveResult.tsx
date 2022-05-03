import React, { ChangeEvent, useCallback, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    VStack,
    Textarea,
} from '@chakra-ui/react';
import { BasicData } from '../../views/ScanWebsite';

interface ResultFormData {
    url: BasicData['url'];
    scanTime: BasicData['timeDate'];
    website: string;
    webpage: string;
    note?: string;
}
interface Props {
    isLoading?: boolean;
    onSaveAction: (data: ResultFormData) => void;
    basicData: BasicData | undefined;
    onCloseAction: (() => void) | undefined;
}

function SaveResultForm(props: Props) {
    const {
        isLoading,
        onSaveAction,
        basicData,
        onCloseAction,
    } = props;

    const [webpage, setWebpage] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [note, setNote] = useState<string>();

    const handleWebpageChange = (e: ChangeEvent<HTMLInputElement>) => setWebpage(e.target.value);
    const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value);
    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const onCancelSave = useCallback(
        () => {
            setWebpage('');
            setWebsite('');
            setNote(undefined);
            if (onCloseAction) {
                onCloseAction();
            }
        },
        [onCloseAction],
    );

    const errored = !website || !webpage;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (!basicData || errored) {
                return;
            }
            onSaveAction({
                url: basicData.url,
                scanTime: basicData.timeDate,
                website,
                webpage,
                note,
            });
            // NOTE: Time out is the response time when url processed
        },
        [basicData, errored, note, onSaveAction, webpage, website],
    );

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                {/* TODO: Handle isInvalid later */}
                <FormControl>
                    <FormLabel htmlFor="url">
                        URL
                    </FormLabel>
                    <Input
                        id="saved-url"
                        type="url"
                        value={basicData?.url ?? ''}
                        placeholder="Website"
                        background="blackAlpha.300"
                        tabIndex={-1}
                        readOnly
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="scanTime">
                        Scan Time
                    </FormLabel>
                    <Input
                        id="scanTime"
                        type="text"
                        value={basicData?.timeDate ?? ''}
                        placeholder="Scan Time"
                        background="blackAlpha.300"
                        tabIndex={-1}
                        readOnly
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="webpage">
                        Webpage *
                    </FormLabel>
                    <Input
                        id="webpage"
                        type="text"
                        value={webpage}
                        onChange={handleWebpageChange}
                        placeholder="Enter webpage name (Example - Homepage)"
                        background="whiteAlpha.900"
                        tabIndex={-1}
                        isRequired
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="website">
                        Website *
                    </FormLabel>
                    <Input
                        id="website"
                        type="url"
                        value={website}
                        onChange={handleWebsiteChange}
                        placeholder="Enter website name (Example Website)"
                        background="whiteAlpha.900"
                        tabIndex={-1}
                        isRequired
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="note">
                        Notes
                    </FormLabel>
                    <Textarea
                        id="note"
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Enter notes for the result."
                        tabIndex={-1}
                        rows={5}
                    />
                </FormControl>
                <HStack
                    width="100%"
                    justifyContent="flex-end"
                    spacing={4}
                >
                    <Button
                        type="reset"
                        colorScheme="brand"
                        variant="outline"
                        letterSpacing={1}
                        tabIndex={-1}
                        onClick={onCancelSave}
                        py={4}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={errored || isLoading}
                        letterSpacing={1}
                        colorScheme="brand"
                        tabIndex={-1}
                        py={4}
                    >
                        Save
                    </Button>
                </HStack>
            </VStack>
            {/*
                WIP: Handle error
                {!errored ? (
                    <FormHelperText>
                        The website url is incorrect.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is isRequired
                )} */}
        </form>
    );
}
export default SaveResultForm;
