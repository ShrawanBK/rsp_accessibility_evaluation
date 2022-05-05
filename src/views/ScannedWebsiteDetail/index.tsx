/* eslint-disable max-len */
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
    ToastId,
    useBoolean,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';

import IssueStats from '../../components/IssueStats';
import SelectField from '../../components/SelectField';

import {
    issuesMockData,
    IssueObject,
    ImpactStatistics,
    impactStatsMockData,
    FoundStatistics,
    issueTypeMockStats,
    Criteria,
    Impact,
} from './data';
import IssueForm from '../../components/forms/IssueForm';
import EditableIssueList from '../../components/EditableIssueList';
import NextArrowIcon from '../../components/icons/NextArrow';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';

export interface BasicData {
    scanTime: string;
    url: string;
    name: string;
}

export interface DeletableOccurenceData {
    occurenceId: string;
    issueId: string;
    issueName: string;
}

interface ScannedWebsiteDetailResponse {
    name: string;
    url: string;
    scanTime: string;
    issues: IssueObject[];
    impactStatistics: ImpactStatistics[];
    foundStatistics: FoundStatistics[];
}

function ScannedWebsiteDetail() {
    const { id } = useParams();

    const [processingUrl, setProcessingUrl] = useBoolean();
    const [issues, setIssues] = useState<IssueObject[]>(issuesMockData);
    const [impactStatistics, setImpactStatistics] = useState<ImpactStatistics[]>(impactStatsMockData);
    const [foundStatistics, setFoundStatistics] = useState<FoundStatistics[]>(issueTypeMockStats);

    const [modalOpened, setModalOpened] = useBoolean();

    const [filterableImpactLevel, setFilterableImpactLevel] = useState<Impact>();
    const [filterableCriteria, setFilterableCriteria] = useState<Criteria['criteriaId']>();

    const [basicData, setBasicData] = useState<BasicData>();

    const issuesShown = issues && !processingUrl;

    const impactLevelOptions = useMemo(() => {
        if (!issues || issues.length <= 0) {
            return [];
        }
        const possibleImpact: Impact[] = ['critical', 'minor', 'moderate', 'serious'];
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

    useEffect(() => {
        const getWebpageDetail = async () => {
            try {
                setProcessingUrl.on();
                const response = await apis.get(`/webpage/${id}`);
                const dataResponse: ScannedWebsiteDetailResponse = response.data;
                if (!dataResponse) {
                    setProcessingUrl.off();
                    return;
                }
                setIssues(dataResponse.issues);
                setImpactStatistics(dataResponse.impactStatistics);
                setFoundStatistics(dataResponse.foundStatistics);
                // setSelectedIssueIds(undefined);
                setBasicData({
                    scanTime: dataResponse.scanTime,
                    url: dataResponse.url,
                    name: dataResponse.name,
                });
                setProcessingUrl.off();
            } catch (error) {
                console.warn({ error });
            }
        };
        getWebpageDetail();
    }, [id, setProcessingUrl]);

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

        // remove the issue of there is no occurence.
        const tmpIssues = [...issues].filter((item) => item.occurences.length > 0);

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
            if (!impactStatistics) {
                return undefined;
            }
            const countArray = [...impactStatistics].map((i) => i.count);
            const sum = countArray.reduce((a, b) => a + b);
            return sum;
        },
        [impactStatistics],
    );

    const [deletableOccurenceData, setDeletableOccurenceData] = useState<DeletableOccurenceData>();

    const toast = useToast();

    const toastIdRef = React.useRef<string | number | undefined>();

    function showToast(showableToast: ToastId | undefined) {
        toastIdRef.current = showableToast;
    }

    const onCloseToast = useCallback(() => {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current);
            toast.closeAll();
        }
    }, [toast]);

    const onCancelDeleteOccurence = useCallback(
        () => setDeletableOccurenceData(undefined),
        [setDeletableOccurenceData],
    );

    const onDeleteOccurence = useCallback(
        async () => {
            try {
                if (!deletableOccurenceData) {
                    return;
                }

                const apiUrl = `/issue?webpageId=${id}&issueId=${deletableOccurenceData.issueId}`;
                const response = await apis.delete(apiUrl);

                if (response.data === 'successfully deleted') {
                    // TODO: Confirm and fix this
                    setIssues((prevIssues) => [...prevIssues].filter((issue) => issue.issueId !== deletableOccurenceData.issueId));
                    // Was for occurence delete
                    // setIssues((prevIssues) => {
                    //     const tmpIssueList = [...prevIssues];
                    //     const updatedIssueList = tmpIssueList.map((issueItem) => {
                    //         if (issueItem.issueId !== deletableOccurenceData.issueId) {
                    //             return issueItem;
                    //         }
                    //         return {
                    //             ...issueItem,
                    //             occurence: issueItem.occurences.filter(
                    //                 (oItem) => oItem.occurenceId !== deletableOccurenceData.occurenceId,
                    //             ),
                    //         };
                    //     });
                    //     return updatedIssueList;
                    // });

                    const toastComponent = toast({
                        status: 'success',
                        isClosable: true,
                        variant: 'subtle',
                        id: deletableOccurenceData.occurenceId,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Delete Success"
                                description={`Issue - ${deletableOccurenceData.issueName} deleted successfully`}
                                status="success"
                            />
                        ),
                    });
                    showToast(toastComponent);
                    setDeletableOccurenceData(undefined);
                }
            } catch (onDeleteOccurenceError) {
                console.warn({ onDeleteOccurenceError });
            }
        },
        [deletableOccurenceData, id, onCloseToast, toast],
    );

    const openDeleteOccurenceDialog = !!deletableOccurenceData;

    return (
        <VStack
            align="stretch"
            spacing={4}
            p={4}
            role="main"
        >
            <DeleteConfirmationDialog
                open={openDeleteOccurenceDialog}
                onCancelDelete={onCancelDeleteOccurence}
                deletableItemId={deletableOccurenceData?.occurenceId}
                onDelete={onDeleteOccurence}
                header="Delete Issue"
                areYouSureMsg="Are you sure you want to delete following issue?"
                dialogBody={(
                    <>
                        <br />
                        {deletableOccurenceData?.issueName}
                    </>
                )}
            />
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
                    {basicData?.name}
                </Text>
                <Spacer />
            </HStack>
            <Heading
                as="h2"
                size="lg"
                role="heading"
            >
                {basicData?.name}
                {' '}
                - Scan Detail
                <Divider />
            </Heading>

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
                                URL:
                                {' '}
                                {basicData?.url}
                            </Heading>
                            <Text>
                                Website: Facebook |
                                {' '}
                                {`Scanned on ${basicData?.scanTime}`}
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
                            impactStatistics={impactStatistics}
                            foundStatistics={foundStatistics}
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
                        />
                    </Box>
                </Box>
            )}
        </VStack>
    );
}

export default ScannedWebsiteDetail;
