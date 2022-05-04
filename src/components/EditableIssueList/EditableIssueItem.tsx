import React, {
    useCallback,
    useMemo,
    useState,
    SetStateAction,
    Dispatch,
} from 'react';

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
    Tooltip,
    useBoolean,
    Button,
} from '@chakra-ui/react';

import { IssueObject } from '../../views/ScanWebsite/data';

import Paginator from '../Paginator';
import { DeletableOccurenceData } from '../../views/ScannedWebsiteDetail';

interface IssueListProps {
    // Make this compulsory
    issue: IssueObject;
    setDeletableOccurenceData: Dispatch<SetStateAction<DeletableOccurenceData | undefined>>;
}

function EditableIssueItem(props: IssueListProps) {
    const {
        issue,
        setDeletableOccurenceData,
    } = props;

    const [isExpanded, setIsExpanded] = useBoolean();

    const [currentOccurenceIndex, setCurrentOccurenceIndex] = useState(0);

    const currentOccurence = issue.occurence[currentOccurenceIndex];

    const wcagCriteria = useMemo(
        () => issue.criteria.filter((c) => !c.name.startsWith('wcag')),
        [issue.criteria],
    );

    const tags = useMemo(
        () => issue.criteria.filter((c) => c.name.startsWith('wcag')),
        [issue.criteria],
    );

    const onClickDelete = useCallback(
        () => {
            setDeletableOccurenceData({
                occurenceId: currentOccurence.occurenceId,
                issueId: issue.issueId,
                issueName: issue.name,
            });
        },
        [
            currentOccurence.occurenceId,
            issue.issueId,
            issue.name,
            setDeletableOccurenceData,
        ],
    );

    return (
        <Accordion
            allowToggle
            borderColor="transparent"
            onChange={setIsExpanded.toggle}
        >
            <AccordionItem>
                <HStack
                    justifyContent="center"
                    alignItems="center"
                    background={isExpanded ? '#B3EFFF' : 'rgba(0, 0, 0, 0.04)'}
                >
                    <AccordionButton
                        _expanded={{
                            bg: '#B3EFFF',
                            color: '#045981',
                        }}
                        justifyContent="space-between"
                    >
                        <Text>
                            {issue.name}
                        </Text>
                        <Text>
                            {issue.occurence.length}
                        </Text>
                    </AccordionButton>
                </HStack>
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
                        key={currentOccurence.occurenceId}
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
                                        as="h3"
                                    >
                                        WCAG Criteria:
                                    </Heading>
                                    {wcagCriteria.map((criteria) => (
                                        <Tooltip
                                            key={criteria.criteriaId}
                                            label={criteria.note}
                                        >
                                            <Tag>
                                                {criteria.name}
                                            </Tag>
                                        </Tooltip>
                                    ))}
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
                                        as="h3"
                                    >
                                        Tags:
                                    </Heading>
                                    <HStack>
                                        {tags.map((tag) => (
                                            <Tooltip
                                                key={tag.criteriaId}
                                                label={tag.note}
                                            >
                                                <Tag>
                                                    {tag.name}
                                                </Tag>
                                            </Tooltip>
                                        ))}
                                    </HStack>
                                </HStack>
                                <HStack alignItems="center">
                                    <Heading
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="md"
                                        as="h3"
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
                                        as="h3"
                                    >
                                        Found:
                                    </Heading>
                                    <Text>
                                        {issue.found}
                                    </Text>
                                </HStack>
                            </VStack>
                            <VStack alignItems="flex-end">
                                <Paginator
                                    pageIndex={currentOccurenceIndex}
                                    totalPages={issue.occurence.length}
                                    onChangePage={setCurrentOccurenceIndex}
                                />
                                <HStack spacing={2}>
                                    <Button
                                        type="button"
                                        h={10}
                                        letterSpacing={1}
                                        tabIndex={-1}
                                        colorScheme="blue"
                                        background="blue.700"
                                        onClick={() => console.warn('edit')}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        h={10}
                                        letterSpacing={1}
                                        tabIndex={-1}
                                        colorScheme="red"
                                        background="red.700"
                                        onClick={onClickDelete}
                                    >
                                        Delete
                                    </Button>
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
                                as="h3"
                            >
                                Issue Description
                            </Heading>
                            <Text>
                                {currentOccurence.description}
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
                                as="h3"
                            >
                                Issue Description
                            </Heading>
                            <Text>
                                {currentOccurence.description}
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
                                as="h4"
                            >
                                • Element Location
                            </Heading>
                            <Text>
                                {currentOccurence.location}
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
                                as="h4"
                            >
                                • Element Source
                            </Heading>
                            <Code ml={1} p={4}>
                                {currentOccurence.source}
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
                                as="h3"
                            >
                                How to Fix?
                            </Heading>
                            <Text>
                                {currentOccurence.fix}
                            </Text>
                        </VStack>
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default EditableIssueItem;
