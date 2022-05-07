import React, { useCallback, useMemo, useState } from 'react';

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
    Checkbox,
    useBoolean,
} from '@chakra-ui/react';

import { IssueObject } from '../../views/ScanWebsite/data';

import Paginator from '../Paginator';

interface IssueListProps {
    issue: IssueObject;
    selectedIssues: IssueObject['name'][] | undefined;
    onUpdateSelectedIssue: (id: IssueObject['name']) => void;
}

function IssueItem(props: IssueListProps) {
    const {
        issue,
        selectedIssues,
        onUpdateSelectedIssue,
    } = props;

    const [isExpanded, setIsExpanded] = useBoolean();

    const [currentOccurenceIndex, setCurrentOccurenceIndex] = useState(0);

    const currentOccurence = useMemo(
        () => {
            if (!issue.occurences || issue.occurences.length <= 0) {
                return undefined;
            }
            return issue.occurences[currentOccurenceIndex];
        },
        [currentOccurenceIndex, issue.occurences],
    );

    const isSelected = useMemo(
        () => [...selectedIssues ?? []]?.includes(issue.name),
        [issue.name, selectedIssues],
    );

    const onClickCheckbox = useCallback(
        () => onUpdateSelectedIssue(issue.name),
        [issue.name, onUpdateSelectedIssue],
    );

    const wcagCriteria = useMemo(
        () => issue.criteria.filter((c) => c.criteriaId.toLowerCase().startsWith('wcag')),
        [issue.criteria],
    );

    const tags = useMemo(
        () => issue.criteria.filter((c) => !c.criteriaId.toLowerCase().startsWith('wcag')),
        [issue.criteria],
    );

    if (!currentOccurence) {
        return null;
    }

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
                    <Checkbox
                        aria-label={issue.name}
                        isChecked={isSelected}
                        onChange={onClickCheckbox}
                        borderColor={isSelected ? 'transparent' : '#045981'}
                        marginLeft={4}
                    />
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
                            {issue.occurences.length}
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
                                            key={criteria.criteriaId + criteria.name}
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
                                                key={tag.criteriaId + tag.name}
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
                            <Paginator
                                pageIndex={currentOccurenceIndex}
                                totalPages={issue.occurences.length}
                                onChangePage={setCurrentOccurenceIndex}
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

export default IssueItem;
