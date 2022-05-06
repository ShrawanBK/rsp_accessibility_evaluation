import React, { ChangeEvent, useCallback } from 'react';
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
    onScanWebpage: () => void;
    label?: string;
    buttonLabel?: string;
    placeholder?: string;
    handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
    url: string;
}

function ScanForm(props: Props) {
    const {
        handleUrlChange,
        url,
        processingUrl,
        onScanWebpage,
        label = 'URL',
        buttonLabel = 'SCAN',
        placeholder = 'Enter webpageurl (https://www.examplewebsite.example)',
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
                <FormLabel
                    htmlFor={label}
                >
                    {label}
                </FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        width="90%"
                        placeholder={placeholder}
                        background="whiteAlpha.900"
                        borderTopRightRadius={0}
                        borderBottomRightRadius={0}
                        tabIndex={-1}
                        height={12}
                    />
                    <Button
                        type="submit"
                        disabled={errored || processingUrl}
                        width="10%"
                        colorScheme="brand"
                        borderTopLeftRadius={0}
                        borderBottomLeftRadius={0}
                        tabIndex={-1}
                        height={12}
                    >
                        {buttonLabel}
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
