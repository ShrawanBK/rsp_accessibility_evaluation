import React, { useCallback } from 'react';

import { CloseButton, HStack, VStack, Text, useToast, ToastOptions } from '@chakra-ui/react';

interface Props {
    onCloseToast: () => void;
    title?: string;
    description?: string;
    status?: ToastOptions['status'],
}

const backgroundColorOption = {
    default: 'white',
    success: 'green.600',
    info: 'green.100',
    error: 'red',
    warning: 'blue',
};

function ToastBox(props: Props) {
    const {
        onCloseToast,
        title = 'title',
        description = 'description',
        status = 'success',
    } = props;

    const bgColor = backgroundColorOption[status];

    return (
        <HStack
            p={3}
            bg={bgColor}
            width="auto"
            maxWidth={400}
            alignItems="flex-start"
            px={4}
            py={3}
            borderRadius="lg"
            boxShadow="md"
            role="alert"
        >
            <VStack alignItems="flex-start">
                <Text
                    color="white"
                    fontWeight="bold"
                >
                    {title}
                </Text>
                <Text color="white">
                    {description}
                </Text>
            </VStack>
            <CloseButton
                size="sm"
                onClick={onCloseToast}
                alignSelf="flex-start"
                color="whiteAlpha.800"
            />
        </HStack>
    );
}

export default ToastBox;
