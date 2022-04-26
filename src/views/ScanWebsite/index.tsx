import React, { useCallback, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Heading,
    HStack,
    Text,
    useBoolean,
    VStack,
} from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import IssueStats from '../../components/IssueStats';
import IssueList from '../../components/IssueList';
import SelectField from '../../components/SelectField';
import Loading from '../../components/Loading';
import Info from '../../components/Info';
import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import InvalidUrlIcon from '../../components/icons/InvalidUrl';

import {
    issuesMockData,
    IssueObject,
    ImpactStats,
    impactStatsMockData,
    IssueTypeStats,
    issueTypeMockStats,
    Criteria,
    Impact,
} from './data';

function ScanWebsite() {
    const [processingUrl, setProcessingUrl] = useBoolean();
    const [issues, setIssues] = useState<IssueObject[]>(issuesMockData);
    const [impactStats, setImpactStats] = useState<ImpactStats[]>(impactStatsMockData);
    const [issueTypeStats, setIssueTypeStats] = useState<IssueTypeStats[]>(issueTypeMockStats);
    const [urlInvalidStatus, setUrlInvalidStatus] = useBoolean();
    const [selectedIssueIds, setSelectedIssueIds] = useState<IssueObject['issueId'][]>();

    // handle control of Checkbox correspoding to "Select Issue"
    const [allIdsSelected, setAllIdsSelected] = useBoolean();

    const [filterableImpactLevel, setFilterableImpactLevel] = useState<Impact>();
    const [filterableCriteria, setFilterableCriteria] = useState<Criteria['criteriaId']>();
    const date = '27 December 2021';
    const time = '18:01 pm';

    const issuesShown = !urlInvalidStatus && issues && !processingUrl;

    const impactLevelOptions = useMemo(() => {
        if (!issues || issues.length <= 0) {
            return [];
        }
        const possibleImpact: Impact[] = ['Critical', 'Minor', 'Moderate', 'Serious'];
        const tmpImpact = [...issues].map((issue) => issue.impact);

        return possibleImpact.map((impact) => {
            const countImpact = tmpImpact.filter((tmp) => tmp === impact).length;
            return {
                label: `${impact} (${countImpact})`,
                value: impact,
            };
        });
    }, [issues]);

    const criteriaOptions = useMemo(() => {
        if (!issues || issues.length <= 0) {
            return [];
        }
        const seen = new Set();

        const tmpCriteria = [...issues].map((issue) => issue.criteria);
        const flatTmpCriteria = tmpCriteria.flat();
        const filteredCriteria = flatTmpCriteria.filter((c) => {
            const duplicate = seen.has(c.criteriaId);
            seen.add(c.criteriaId);
            return !duplicate;
        });
        return filteredCriteria.map((item) => ({
            label: item.name,
            value: item.criteriaId,
        }));
    }, [issues]);

    const onScanWebsite = useCallback(
        (url: string) => {
            setProcessingUrl.on();
            console.warn('on processing url - ', url);
            setTimeout(() => {
                setProcessingUrl.off();
                setIssues(issuesMockData);
                setImpactStats(impactStatsMockData);
                setUrlInvalidStatus.off();
                setIssueTypeStats(issueTypeMockStats);
                setSelectedIssueIds(undefined);
                setAllIdsSelected.off();
            }, 2000);
        },
        [setAllIdsSelected, setProcessingUrl, setUrlInvalidStatus],
    );

    const onSelectFilterableImpactLevel = useCallback(
        (value: string) => {
            if (value === '') {
                setFilterableImpactLevel(undefined);
                return;
            }
            setFilterableImpactLevel(value as Impact);
        },
        [],
    );

    const onSelectFilterableCriteria = useCallback(
        (value: string) => {
            if (value === '') {
                setFilterableCriteria(undefined);
                return;
            }
            setFilterableCriteria(value ?? undefined);
        },
        [],
    );

    const filteredIssues = useMemo(() => {
        if (!issues || issues.length === 0) {
            return issues;
        }

        const tmpIssues = [...issues];
        if (!filterableImpactLevel && !filterableCriteria) {
            return tmpIssues;
        }
        if (filterableImpactLevel && !filterableCriteria) {
            const filteredIssueByImpact = tmpIssues.filter(
                (issue) => issue.impact === filterableImpactLevel,
            );
            return filteredIssueByImpact;
        }
        if (!filterableImpactLevel && filterableCriteria) {
            const filteredIssueByCriteria = tmpIssues.filter((issue) => {
                const issueCriteriaIds = issue.criteria.map((c) => c.criteriaId);
                const criteriaIndex = issueCriteriaIds.findIndex((id) => id === filterableCriteria);

                if (criteriaIndex < 0) {
                    return undefined;
                }

                return issue;
            });
            return filteredIssueByCriteria.filter((issue) => !!issue);
        }

        const filteredIssueByImpact = tmpIssues.filter(
            (issue) => issue.impact === filterableImpactLevel,
        );
        const filteredIssueByCriteria = filteredIssueByImpact.filter((issue) => {
            const issueCriteriaIds = issue.criteria.map((c) => c.criteriaId);
            const criteriaIndex = issueCriteriaIds.findIndex((id) => id === filterableCriteria);
            if (criteriaIndex < 0) {
                return undefined;
            }
            return issue;
        });
        return filteredIssueByCriteria.filter((issue) => !!issue);
    }, [filterableCriteria, filterableImpactLevel, issues]);

    const totalIssuesCount = useMemo(
        () => {
            if (!impactStats) {
                return undefined;
            }
            const countArray = [...impactStats].map((i) => i.count);
            const sum = countArray.reduce((a, b) => a + b);
            return sum;
        },
        [impactStats],
    );

    const onSelectAllIssues = useCallback(
        () => {
            // filteredIssues
            if (!selectedIssueIds || selectedIssueIds.length < 0) {
                // const ids = impactLevelOptions.map((i) => i.value);
                const ids = [...filteredIssues].map((issue) => issue.issueId);
                setSelectedIssueIds(ids);
                setAllIdsSelected.on();
            } else {
                setSelectedIssueIds(undefined);
                setAllIdsSelected.off();
            }
        },
        [filteredIssues, selectedIssueIds, setAllIdsSelected],
    );

    const onUpdateSelectedIssue = useCallback(
        (id: IssueObject['issueId']) => {
            // Add first checkbox
            if (!selectedIssueIds || selectedIssueIds.length <= 0) {
                setSelectedIssueIds([id]);
                return;
            }

            const tmpSelectedIssueIds = [...selectedIssueIds];

            // check if the id exists
            const selectedIdIndex = tmpSelectedIssueIds.findIndex((item) => item === id);

            if (selectedIdIndex < 0) {
                // if id does not exist, add the id to check the checkbox
                setSelectedIssueIds([...tmpSelectedIssueIds, id]);

                if ([...tmpSelectedIssueIds, id].length === [...filteredIssues].length) {
                    // mark the "all checkbox" if all issues selected individually
                    setAllIdsSelected.on();
                }
                return;
            }

            // if id exist, remove the id to uncheck the checkbox
            setSelectedIssueIds(tmpSelectedIssueIds.filter((item) => item !== id));
            setAllIdsSelected.off();
        },
        [filteredIssues, selectedIssueIds, setAllIdsSelected],
    );

    return (
        <VStack
            align="stretch"
            spacing={8}
            p={4}
            role="main"
        >
            <Flex>
                <Heading
                    as="h2"
                    size="lg"
                    role="heading"
                >
                    Scan Website
                    <Divider />
                </Heading>
            </Flex>
            <Box
                width="60%"
                marginTop="1vh"
            >
                <ScanForm
                    processingUrl={processingUrl}
                    onScanWebsite={onScanWebsite}
                />
            </Box>
            <Box width="60%">
                {!processingUrl && !issues && (
                    <Info
                        title="Scan & Audit Webpage"
                        message="Get accessibility test result of your webpage by inputting URL and scan it."
                        icon={<ScanAndAuditIcon />}
                    />
                )}
                {processingUrl && <Loading message="Waiting for Result" />}
                {urlInvalidStatus && !processingUrl && (
                    <Info
                        title="Invalid URL"
                        message="There is something wrong with the webpage. Try again with different url."
                        icon={<InvalidUrlIcon />}
                    />
                )}
            </Box>

            {issuesShown && (
                <Box
                    background="white"
                    p={8}
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >
                        <VStack alignItems="baseline">
                            <Heading
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="2xl"
                                role="heading"
                                as="h2"
                            >
                                Result
                            </Heading>
                            <Text>
                                {`Scanned on ${date} at ${time}`}
                            </Text>
                        </VStack>
                        <Button
                            type="button"
                            colorScheme="brand"
                            px={4}
                            h={8}
                            letterSpacing={1}
                        >
                            SAVE
                        </Button>
                    </Box>
                    <Box
                        width="80%"
                        marginTop={8}
                    >
                        <IssueStats
                            impactStats={impactStats}
                            issueTypeStats={issueTypeStats}
                            totalIssuesCount={totalIssuesCount}
                        />
                    </Box>
                    <HStack
                        justifyContent="flex-start"
                        marginTop={8}
                    >
                        <Checkbox
                            aria-label="issue.name"
                            maxWidth="20px"
                            margin={4}
                            borderColor="#045981"
                            onChange={onSelectAllIssues}
                            isChecked={allIdsSelected}
                        />
                        <HStack width="80%">
                            <SelectField
                                options={impactLevelOptions}
                                placeholder={`All Issues (${totalIssuesCount})`}
                                label="Select Issues"
                                onSelectOption={onSelectFilterableImpactLevel}
                            />
                            <SelectField
                                options={criteriaOptions}
                                placeholder="All Criteria"
                                label="Select Criteria"
                                onSelectOption={onSelectFilterableCriteria}
                            />
                        </HStack>
                    </HStack>
                    <Box marginTop={4}>
                        <IssueList
                            issueList={filteredIssues}
                            selectedIssueIds={selectedIssueIds}
                            onUpdateSelectedIssue={onUpdateSelectedIssue}
                        />
                    </Box>
                </Box>
            )}
        </VStack>
    );
}

export default ScanWebsite;
