import React, { useCallback } from 'react';

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
    Button,
} from '@chakra-ui/react';

import {
    issueData,
    IssueDataObject,
} from './data';

interface IssueListProps {
    // Make this compulsory
    issueList?: IssueDataObject[];
}

const maxValue = 10;

function IssueList(props: IssueListProps) {
    // TODO: import issueData and work on this later
    const {
        issueList = issueData,
    } = props;

    console.warn({ issueList });
    const data = issueData[0];
    const [currentIssueIndex, setCurrentIssueIndex] = React.useState(0);

    const onIncrementIndex = useCallback(() => {
        if (currentIssueIndex > maxValue) {
            return;
        }
        setCurrentIssueIndex(currentIssueIndex + 1);
    }, [currentIssueIndex]);

    const onDecrementIndex = useCallback(() => {
        if (currentIssueIndex === 0) {
            return;
        }
        setCurrentIssueIndex(currentIssueIndex - 1);
    }, [currentIssueIndex]);

    const onResetIndex = () => setCurrentIssueIndex(0);

    const onSetMaxIndex = () => setCurrentIssueIndex(maxValue);

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
                    <div>
                        <Button onClick={onResetIndex}>--</Button>
                        <Button onClick={onDecrementIndex}>-</Button>
                        <Box as="span" w="200px" mx="24px">
                            {currentIssueIndex}
                            {' '}
                            /
                            {' '}
                            {maxValue}
                        </Box>
                        <Button onClick={onIncrementIndex}>+</Button>
                        <Button onClick={onSetMaxIndex}>++</Button>
                    </div>
                    {data.issues.map((issue) => (
                        <VStack
                            alignItems="baseline"
                            spacing={4}
                            marginTop={4}
                            key={issue.id}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="column"
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
                                            {issue.criteria}
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
                                            {issue.tags.map((tag) => (
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
                                            {issue.impact}
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
                                            {issue.found}
                                        </Text>
                                    </HStack>
                                </VStack>
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
                                    {issue.description}
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
                                    {issue.description}
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
                                    {issue.location}
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
                                    {issue.source}
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
                                    {issue.solution}
                                </Text>
                            </VStack>
                        </VStack>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default IssueList;
