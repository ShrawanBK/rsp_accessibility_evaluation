import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Flex, Input, HStack, useBoolean } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback, useState } from 'react';
import './styles.css';

function ScanForm() {
    const [url, setUrl] = useState<string>();
    const [processingUrl, setProcessingUrl] = useBoolean();

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const errored = !url;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            setProcessingUrl.on();
            // NOTE: Time out is the response time when url processed
            setTimeout(() => setProcessingUrl.off(), 2000);
            console.warn(`Url: ${url}`);
        },
        [setProcessingUrl, url],
    );

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isInvalid={errored} flex={2}>
                <FormLabel htmlFor="url">URL</FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        width="75%"
                        placeholder="Enter website url"
                    />
                    <Button
                        type="submit"
                        disabled={errored || processingUrl}
                        width="25%"
                    >
                        Scan
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
