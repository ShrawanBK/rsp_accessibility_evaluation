import React, { ChangeEvent, useCallback } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
} from '@chakra-ui/react';

interface Props {
    processingUrl: boolean;
    onScanWebpage: () => void;
    handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
    url: string;
    negativeTabIndex?: boolean;
}

function ScanForm(props: Props) {
    const {
        handleUrlChange,
        url,
        processingUrl,
        onScanWebpage,
        negativeTabIndex = false,
    } = props;

    const errored = !url;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            onScanWebpage();
        },
        [onScanWebpage],
    );

    return (
        <form onSubmit={handleSubmit}>
            {/* TODO: Handle isInvalid later */}
            <FormControl
                isInvalid={false}
                flex={2}
            >
                <FormLabel htmlFor="url">
                    URL
                </FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        width="90%"
                        placeholder="Enter webpage url (https://www.examplewebsite.example)"
                        background="whiteAlpha.900"
                        borderTopRightRadius={0}
                        borderBottomRightRadius={0}
                        tabIndex={negativeTabIndex ? -1 : undefined}
                        height={12}
                        autoComplete="off"
                    />
                    <Button
                        type="submit"
                        disabled={errored || processingUrl}
                        width="10%"
                        colorScheme="brand"
                        borderTopLeftRadius={0}
                        borderBottomLeftRadius={0}
                        tabIndex={negativeTabIndex ? -1 : undefined}
                        height={12}
                    >
                        SCAN
                    </Button>
                </HStack>
                {/*
                WIP: Handle error
                {!errored ? (
                    <FormHelperText>
                        The website url is incorrect.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )} */}
            </FormControl>
        </form>
    );
}
export default ScanForm;
