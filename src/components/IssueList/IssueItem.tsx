import React, { useState } from 'react';

import {
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Heading,
    Divider,
    Code,
    HStack,
    Tag,
} from '@chakra-ui/react';

import {
    IssueDataObject,
} from './data';
import Paginator from '../Paginator';

interface IssueItemProps {
    // Make this compulsory
    issueItem: IssueDataObject;
}

function IssueItem(props: IssueItemProps) {
    // TODO: import issueData and work on this later
    const {
        issueItem,
    } = props;

    const [currentIssueItemIndex, setCurrentIssueItemIndex] = useState(0);

    const currentIssueItem = issueItem.issues[currentIssueItemIndex];

    return (
        <Accordion
            allowToggle
            defaultIndex={0}
            borderColor="transparent"
        >
            <AccordionItem>
                <AccordionButton
                    _expanded={{
                        bg: '#B3EFFF',
                        color: '#045981',
                    }}
                    bg="rgba(0, 0, 0, 0.04)"
                >
                    <Box
                        flex="1"
                        textAlign="left"
                    >
                        {issueItem.title}
                    </Box>
                    {/* <AccordionIcon /> */}
                    <Text>
                        {issueItem.issues.length}
                    </Text>
                </AccordionButton>
                <AccordionPanel
                    pb={4}
                    border="1px solid #E5E5E5"
                    borderBottomRadius={4}
                    borderTop="none"
                >
                    <VStack
                        alignItems="baseline"
                        spacing={4}
                        marginTop={4}
                        key={currentIssueItem.id}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <VStack
                                alignItems="baseline"
                                spacing={2}
                            >
                                <HStack alignItems="center">
                                    <Heading
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="md"
                                    >
                                        WCAG Criteria:
                                    </Heading>
                                    <Text>
                                        {currentIssueItem.criteria}
                                    </Text>
                                    <Divider
                                        orientation="vertical"
                                        borderColor="black"
                                        borderLeftWidth={2}
                                        height={4}
                                    />
                                    <Heading
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="md"
                                    >
                                        Tags:
                                    </Heading>
                                    <HStack>
                                        {currentIssueItem.tags.map((tag) => (
                                            <Tag key={tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </HStack>
                                </HStack>
                                <HStack alignItems="center">
                                    <Heading
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="md"
                                    >
                                        Impact:
                                    </Heading>
                                    <Text>
                                        {currentIssueItem.impact}
                                    </Text>
                                    <Divider
                                        orientation="vertical"
                                        borderColor="black"
                                        borderLeftWidth={2}
                                        height={4}
                                    />
                                    <Heading
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="md"
                                    >
                                        Found:
                                    </Heading>
                                    <Text>
                                        {currentIssueItem.found}
                                    </Text>
                                </HStack>
                            </VStack>
                            <Paginator
                                pageIndex={currentIssueItemIndex}
                                totalPages={issueItem.issues.length}
                                onChangePage={setCurrentIssueItemIndex}
                            />
                        </Box>
                        <Divider />
                        <VStack
                            spacing={2}
                            alignItems="baseline"
                        >
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="md"
                            >
                                Issue Description
                            </Heading>
                            <Text>
                                {currentIssueItem.description}
                            </Text>
                        </VStack>
                        <VStack
                            spacing={2}
                            alignItems="baseline"
                        >
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="md"
                            >
                                Issue Description
                            </Heading>
                            <Text>
                                {currentIssueItem.description}
                            </Text>
                        </VStack>
                        <VStack
                            spacing={2}
                            alignItems="baseline"
                        >
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="md"
                                ml={1}
                            >
                                • Element Location
                            </Heading>
                            <Text>
                                {currentIssueItem.location}
                            </Text>
                        </VStack>
                        <VStack
                            align="stretch"
                            alignItems="baseline"
                            marginLeft="10px"
                            spacing={2}
                        >
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="md"
                                ml={1}
                            >
                                • Element Source
                            </Heading>
                            <Code ml={1} p={4}>
                                {currentIssueItem.source}
                            </Code>
                        </VStack>
                        <VStack
                            alignItems="baseline"
                            spacing={2}
                        >
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="md"
                            >
                                How to Fix?
                            </Heading>
                            <Text>
                                {currentIssueItem.solution}
                            </Text>
                        </VStack>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default IssueItem;
