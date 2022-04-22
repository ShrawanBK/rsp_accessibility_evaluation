import React from 'react';
import { VStack, Box, Heading, Text } from '@chakra-ui/react';

import {
    IssueTypeDataInterface as IssueTypeCardProps,
} from './data';

export default function IssueTypeCard(props: IssueTypeCardProps) {
    const {
        automatic,
        guided,
        reviewable,
        ...rest
    } = props;
    return (
        <VStack
            p={2}
            align="stretch"
        >
            <Box
                p={2}
                {...rest}
            >
                <Heading
                    fontSize="small"
                    letterSpacing={2}
                    textTransform="uppercase"
                    fontWeight="semibold"
                    as="h3"
                >
                    automatic
                </Heading>
                <Text
                    mt={1}
                    fontSize="xl"
                    letterSpacing={1}
                    fontWeight="semibold"
                >
                    {`${automatic} issues (${reviewable} need reviews)`}
                </Text>
            </Box>
            <Box p={2}>
                <Heading
                    fontSize="small"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    letterSpacing={2}
                    as="h3"
                >
                    guided
                </Heading>
                <Text
                    mt={1}
                    fontSize="xl"
                    fontWeight="bold"
                >
                    {guided}
                    {' '}
                    Issues
                </Text>
            </Box>
        </VStack>
    );
}
