import React from 'react';

import {
    CircularProgress,
    Text,
    VStack,
} from '@chakra-ui/react';

export interface LoadingProps {
    message: string;
}

function Loading(props: LoadingProps) {
    const {
        message,
    } = props;
    return (
        <VStack p={5} spacing={4}>
            <CircularProgress isIndeterminate />
            <Text mt={4} width="50%" align="center" fontSize="xl">{message}</Text>
        </VStack>
    );
}

export default Loading;
