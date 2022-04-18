import React from 'react';

import {
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

export interface InfoProps {
    icon: string; // TODO: Update later to icon
    title: string;
    message: string;
}

function Info(props: InfoProps) {
    const {
        icon,
        title,
        message,
    } = props;
    return (
        <VStack p={5} spacing={4}>
            {/* TODO: Update image to icon */}
            <Image
                src="https://bit.ly/dan-abramov"
                height={100}
                width={100}
                alt={icon}
            />
            <Text
                fontSize="x-large"
                fontWeight="bold"
            >
                {title}
            </Text>
            <Text
                mt={4}
                width="40%"
                align="center"
                fontSize="xl"
            >
                {message}
            </Text>
        </VStack>
    );
}

export default Info;
