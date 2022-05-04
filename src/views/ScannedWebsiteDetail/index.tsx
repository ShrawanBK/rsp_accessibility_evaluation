import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    toast,
    useBoolean,
    VStack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';

import IssueStats from '../../components/IssueStats';
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
import IssueForm from '../../components/forms/IssueForm';
import EditableIssueList from '../../components/EditableIssueList';
import NextArrowIcon from '../../components/icons/NextArrow';

export interface BasicData {
    timeDate: string;
    url: string;
}

export interface DeletableOccurenceData {
    occurenceId: string;
    issueId: string;
}

function ScannedWebsiteDetail() {
    const { id } = useParams();

    const [processingUrl, setProcessingUrl] = useBoolean();
    const [issues, setIssues] = useState<IssueObject[]>(issuesMockData);
    const [impactStats, setImpactStats] = useState<ImpactStats[]>(impactStatsMockData);
    const [issueTypeStats, setIssueTypeStats] = useState<IssueTypeStats[]>(issueTypeMockStats);
    const [urlInvalidStatus, setUrlInvalidStatus] = useBoolean();

    const [modalOpened, setModalOpened] = useBoolean();

    const [filterableImpactLevel, setFilterableImpactLevel] = useState<Impact>();
    const [filterableCriteria, setFilterableCriteria] = useState<Criteria['criteriaId']>();
    const date = '27 December 2021';
    const time = '18:01 pm';

    const [basicData, setBasicData] = useState<BasicData>();

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

    useEffect(
        () => {
            setTimeout(() => {
                setProcessingUrl.off();
                setIssues(issuesMockData);
                setImpactStats(impactStatsMockData);
                setUrlInvalidStatus.off();
                setIssueTypeStats(issueTypeMockStats);
                setBasicData({
                    timeDate: new Date().toISOString(),
                    url: 'www.facebook.com',
                });
            }, 2000);
        },
        [setProcessingUrl, setUrlInvalidStatus],
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
                const criteriaIndex = issueCriteriaIds.findIndex(
                    (cid) => cid === filterableCriteria,
                );

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
            const criteriaIndex = issueCriteriaIds.findIndex((cid) => cid === filterableCriteria);
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

    const [deletableOccurenceData, setDeletableOccurenceData] = useState<DeletableOccurenceData>();

    const onDeleteIssue = useCallback(
        () => {
            if (!deletableOccurenceData) {
                return;
            }
            // setSavedScanList((currentList) => (
            //     currentList?.filter((item) => item.id !== deletableId)
            // ));

            // toast({
            //     status: 'success',
            //     isClosable: true,
            //     variant: 'subtle',
            //     id: deletableOccurenceData,
            //     duration: null,
            //     position: 'top',
            //     // render: () => (
            //     //     <ToastBox
            //     //         onCloseToast={onClose}
            //     //         title="Delete Success"
            //     //         description={`Webpage - ${deletableId} deleted successfully`}
            //     //         status="success"
            //     //     />
            //     // ),
            // });

            setDeletableOccurenceData(undefined);
        },
        [deletableOccurenceData],
    );

    return (
        <VStack
            align="stretch"
            spacing={4}
            p={4}
            role="main"
        >
            <HStack spacing={0}>
                <Link to="/saved_scans">
                    <Text
                        textDecoration="underline"
                        color="blue.700"
                        fontWeight="semibold"
                        letterSpacing={1}
                    >
                        Saved Scans
                    </Text>
                </Link>
                <Box width={10}>
                    <NextArrowIcon fill="black" />
                </Box>
                <Text>
                    Website Id -
                    {' '}
                    {id}
                </Text>
                <Spacer />
            </HStack>
            <Heading
                as="h2"
                size="lg"
                role="heading"
            >
                Facebook Home - Scan Detail
                <Divider />
            </Heading>
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
                                URL: https://www.facebook.com
                            </Heading>
                            <Text>
                                Website: Facebook |
                                {' '}
                                {`Scanned on ${date} at ${time}`}
                            </Text>
                        </VStack>
                        <Button
                            type="button"
                            colorScheme="brand"
                            letterSpacing={1}
                            onClick={setModalOpened.on}
                            tabIndex={-1}
                            py={4}
                        >
                            Add Issue
                        </Button>
                    </Box>
                    <Modal
                        isOpen={modalOpened}
                        onClose={setModalOpened.off}
                        blockScrollOnMount={false}
                        closeOnOverlayClick={false}
                        aria-label="save-result-modal"
                        id="modalling"
                        aria-describedby="save-result-modal"
                        aria-modal="false"
                        isCentered
                    >
                        <ModalOverlay aria-modal="true" role="dialog" />
                        <ModalContent
                            role="main"
                            tabIndex={-1}
                            py={2}
                        >
                            <ModalHeader
                                tabIndex={-1}
                            >
                                <Heading
                                    as="h1"
                                    size="md"
                                >
                                    Add Issue
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton tabIndex={-1} />
                            <ModalBody tabIndex={-1}>
                                <IssueForm
                                    onSaveAction={() => console.warn('save issue')}
                                    basicData={basicData}
                                    onCloseAction={setModalOpened.off}
                                    issueId={undefined}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
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
                        <EditableIssueList
                            issueList={filteredIssues}
                            setDeletableOccurenceData={setDeletableOccurenceData}
                            deletableOccurenceData={deletableOccurenceData}
                        />
                    </Box>
                </Box>
            )}
        </VStack>
    );
}

export default ScannedWebsiteDetail;
