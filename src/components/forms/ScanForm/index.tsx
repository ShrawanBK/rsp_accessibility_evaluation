import React, { ChangeEvent, useCallback, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
} from '@chakra-ui/react';

import './styles.css';

interface Props {
    processingUrl: boolean;
    onScanWebsite: (url: string) => void;
}

function ScanForm(props: Props) {
    const {
        processingUrl,
        onScanWebsite,
    } = props;
    const [url, setUrl] = useState<string>();

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const errored = !url;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (!url) {
                return;
            }
            onScanWebsite(url);
            // NOTE: Time out is the response time when url processed
        },
        [onScanWebsite, url],
    );

    return (
        <form onSubmit={handleSubmit}>
            {/* TODO: Handle isInvalid later */}
            <FormControl isInvalid={false} flex={2}>
                <FormLabel htmlFor="url">URL</FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        width="80%"
                        placeholder="Enter website url (https://www.examplewebsite.example) "
                    />
                    <Button
                        type="submit"
                        disabled={errored || processingUrl}
                        width="20%"
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
