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
    issueData,
    IssueDataObject,
} from './data';
import Paginator from '../Paginator';

interface IssueListProps {
    // Make this compulsory
    issueList?: IssueDataObject[];
}

function IssueList(props: IssueListProps) {
    // TODO: import issueData and work on this later
    const {
        issueList = issueData,
    } = props;

    console.warn({ issueList });
    const data = issueData[0];

    const [currentIssueIndex, setCurrentIssueIndex] = useState(0);

    const currentIssue = data.issues[currentIssueIndex];

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
                        {data.title}
                    </Box>
                    {/* <AccordionIcon /> */}
                    <Text>
                        {data.issues.length}
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
                        key={currentIssue.id}
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
                                        {currentIssue.criteria}
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
                                        {currentIssue.tags.map((tag) => (
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
                                        {currentIssue.impact}
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
                                        {currentIssue.found}
                                    </Text>
                                </HStack>
                            </VStack>
                            <Paginator
                                pageIndex={currentIssueIndex}
                                totalPages={data.issues.length}
                                onChangePage={setCurrentIssueIndex}
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
                                {currentIssue.description}
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
                                {currentIssue.description}
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
                                {currentIssue.location}
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
                                {currentIssue.source}
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
                                {currentIssue.solution}
                            </Text>
                        </VStack>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default IssueList;
