import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
    useBoolean,
    VStack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';

import IssueStats from '../../components/IssueStats';
import SelectField from '../../components/SelectField';

import {
    IssueObject,
    ImpactStatistics,
    FoundStatistics,
    Criteria,
    Impact,
    BasicData,
    DeletableOccurenceData,
    ScanWebsiteResponse,
} from '../../typings/webpage';

import IssueForm from '../../components/forms/IssueForm';
import { IssueFormData } from '../../typings/forms';

import EditableIssueList from '../../components/EditableIssueList';
import NextArrowIcon from '../../components/icons/NextArrow';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';
import { ToastBoxContext } from '../../contexts/ToastBoxContext';
import Loading from '../../components/Loading';
import { getCriteriaOptions, getImpactLevelOptions } from '../../utils/options';
import { formatDateTime } from '../../utils/common';
import { getFilteredIssues, getTotalIssuesCount } from '../../utils/issues';

function ScannedWebsiteDetail() {
    const { id } = useParams();

    const [processingUrl, setProcessingUrl] = useBoolean();
    const [issues, setIssues] = useState<IssueObject[]>();
    const [impactStatistics, setImpactStatistics] = useState<ImpactStatistics[]>();
    const [foundStatistics, setFoundStatistics] = useState<FoundStatistics[]>();

    const [modalOpened, setModalOpened] = useBoolean();

    const [filterableImpactLevel, setFilterableImpactLevel] = useState<Impact>();
    const [filterableCriteria, setFilterableCriteria] = useState<Criteria['criteriaId']>();

    const [basicData, setBasicData] = useState<BasicData>();

    const issuesShown = issues && !processingUrl;

    const filteredIssues = useMemo(
        () => getFilteredIssues(
            issues,
            filterableImpactLevel,
            filterableCriteria,
        ),
        [issues, filterableCriteria, filterableImpactLevel],
    );

    const impactLevelOptions = useMemo(
        () => getImpactLevelOptions(issues),
        [issues],
    );

    const criteriaOptions = useMemo(
        () => getCriteriaOptions(issues, filterableImpactLevel),
        [issues, filterableImpactLevel],
    );

    useEffect(() => {
        const getWebpageDetail = async () => {
            try {
                setProcessingUrl.on();
                const response = await apis.get(`/webpage/${id}`);
                const dataResponse: ScanWebsiteResponse = response.data;
                if (!dataResponse) {
                    setProcessingUrl.off();
                    return;
                }
                setIssues(dataResponse.issues);
                setImpactStatistics(dataResponse.impactStatistics);
                setFoundStatistics(dataResponse.foundStatistics);
                // setSelectedIssueIds(undefined);
                setBasicData({
                    scantime: dataResponse.scanTime,
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

    const [criteriaListForForm, setCriteriaListForForm] = useState<Criteria[]>();

    useEffect(() => {
        const getCriteria = async () => {
            try {
                const response = await apis.get('/criteria');
                if (response.status === 200) {
                    const criteriaList: Criteria[] = await response.data;
                    setCriteriaListForForm(criteriaList);
                }
            } catch (error) {
                console.warn({ error });
            }
        };
        getCriteria();
    }, []);

    const onSelectFilterableImpactLevel = useCallback(
        (value: string) => {
            setFilterableImpactLevel(
                value === '' ? undefined : value as Impact,
            );
            if (filterableCriteria) {
                setFilterableCriteria(undefined);
            }
        },
        [filterableCriteria],
    );

    const onSelectFilterableCriteria = useCallback(
        (value: string) => setFilterableCriteria(value === '' ? undefined : value),
        [],
    );

    const totalIssuesCount = useMemo(
        () => getTotalIssuesCount(impactStatistics),
        [impactStatistics],
    );

    const [deletableOccurenceData, setDeletableOccurenceData] = useState<DeletableOccurenceData>();

    const {
        toast,
        showToast,
        onCloseToast,
    } = useContext(ToastBoxContext);

    // close toast message if open
    useEffect(
        () => {
            if (toast) {
                onCloseToast();
            }
        },
        [onCloseToast, toast],
    );

    const onCancelDeleteOccurence = useCallback(
        () => setDeletableOccurenceData(undefined),
        [setDeletableOccurenceData],
    );

    const onDeleteOccurence = useCallback(
        async () => {
            if (!deletableOccurenceData) {
                return;
            }
            try {
                const apiUrl = `/occurence?webpageId=${id}&issueId=${deletableOccurenceData.issueId}&occurenceId=${deletableOccurenceData.occurenceId}`;
                const response = await apis.delete(apiUrl);
                const deleteResponse = await response.data;
                if (deleteResponse === 'successfully deleted') {
                    setIssues((prevIssues) => {
                        if (!prevIssues || prevIssues.length <= 0) {
                            return undefined;
                        }
                        const tmpIssueList = [...prevIssues];
                        const updatedIssueList = tmpIssueList.map((issueItem) => {
                            if (issueItem.issueId !== deletableOccurenceData.issueId) {
                                return issueItem;
                            }
                            return {
                                ...issueItem,
                                occurences: issueItem.occurences.filter(
                                    (o) => o.occurenceId !== deletableOccurenceData.occurenceId,
                                ),
                            };
                        });
                        return updatedIssueList;
                    });

                    const toastComponent = toast && toast({
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
        [deletableOccurenceData, id, onCloseToast, showToast, toast],
    );

    const onDeleteIssue = useCallback(
        async () => {
            try {
                if (!deletableOccurenceData) {
                    return;
                }

                // NOTE - Delete the issue as well.
                const apiUrl = `/issue?issueId=${deletableOccurenceData.issueId}&webpageId=${id}`;
                const response = await apis.delete(apiUrl);
                const deleteResponse = await response.data;

                if (deleteResponse === 'successfully deleted') {
                    setIssues((prevIssues) => {
                        if (!prevIssues) {
                            return undefined;
                        }
                        return [...prevIssues].filter(
                            (issue) => issue.issueId !== deletableOccurenceData.issueId,
                        );
                    });
                }
                const toastComponent = toast && toast({
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
            } catch (onDeleteOccurenceError) {
                console.warn({ onDeleteOccurenceError });
            }
        },
        [deletableOccurenceData, id, onCloseToast, showToast, toast],
    );

    const openDeleteOccurenceDialog = !!deletableOccurenceData;

    const [editableIssue, setEditableIssue] = useState<IssueObject>();

    const onSetEditableIssue = useCallback(
        (issueItem: IssueObject) => {
            setEditableIssue(issueItem);
            setModalOpened.on();
        },
        [setModalOpened],
    );

    const onResetEditableIssue = useCallback(
        () => {
            setEditableIssue(undefined);
            setModalOpened.off();
        },
        [setModalOpened],
    );

    const onSaveIssue = useCallback(
        async (formData: IssueFormData) => {
            try {
                const requestBody = formData;
                const apiUrl = `issue?webpageId=${id}`;
                const response = await apis.post(apiUrl, requestBody);

                if (response.status === 200) {
                    const issueData: IssueObject = response.data;
                    setIssues((prevIssues) => {
                        if (!prevIssues || prevIssues.length <= 0) {
                            return [issueData];
                        }
                        return [...prevIssues, issueData];
                    });
                    setModalOpened.off();

                    // NOTE - Update the manual count
                    setFoundStatistics((prevStat) => {
                        if (!prevStat) {
                            return undefined;
                        }
                        return prevStat.map((stat) => {
                            if (stat.found !== 'manual') {
                                return stat;
                            }
                            return {
                                ...stat,
                                count: stat.count + 1,
                            };
                        });
                    });

                    // NOTE - Update the impact statistics
                    setImpactStatistics((prevStat) => {
                        if (!prevStat) {
                            return undefined;
                        }
                        return prevStat.map((stat) => {
                            if (stat.impact === issueData.impact) {
                                return {
                                    ...stat,
                                    count: stat.count + 1,
                                };
                            }
                            return stat;
                        });
                    });

                    const successToastComponent = toast && toast({
                        status: 'success',
                        isClosable: true,
                        variant: 'subtle',
                        id: undefined,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Issue added successfully"
                                description="Your issue has been added successfully"
                                status="success"
                            />
                        ),
                    });
                    showToast(successToastComponent);
                }
            } catch (error) {
                const failureToastComponent = toast && toast({
                    status: 'error',
                    isClosable: true,
                    variant: 'subtle',
                    id: undefined,
                    duration: null,
                    position: 'top',
                    render: () => (
                        <ToastBox
                            onCloseToast={onCloseToast}
                            title="Error adding"
                            description="Could not add. Try again"
                            status="error"
                        />
                    ),
                });

                showToast(failureToastComponent);
            }
        },
        [id, setModalOpened, toast, showToast, onCloseToast],
    );

    const onUpdateIssue = useCallback(
        async (formData: IssueFormData) => {
            try {
                if (!editableIssue) {
                    return;
                }
                // FIXME - pass only data that was modified
                const requestBody = formData;
                const apiUrl = `issue?webpageId=${id}&issueId=${editableIssue.issueId}`;
                const updateResponse = await apis.put(apiUrl, requestBody);

                if (updateResponse.status === 200) {
                    const updatedIssueData: IssueObject = updateResponse.data;
                    setIssues((prevIssues) => {
                        if (!prevIssues || prevIssues.length <= 0) {
                            return [updatedIssueData];
                        }
                        const tmpIssueList = [...prevIssues];
                        const updatedIssueList = tmpIssueList.map(
                            (issueItem) => (issueItem.issueId === updatedIssueData.issueId
                                ? updatedIssueData : issueItem),
                        );
                        return updatedIssueList;
                    });
                    setModalOpened.off();

                    setEditableIssue(undefined);
                    const successToastComponent = toast && toast({
                        status: 'success',
                        isClosable: true,
                        variant: 'subtle',
                        id: undefined,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Issue updated successfully"
                                description="Your issue has been updated successfully"
                                status="success"
                            />
                        ),
                    });
                    showToast(successToastComponent);
                    // setEditableIssue(undefined);
                }
            } catch (error) {
                const failureToastComponent = toast && toast({
                    status: 'error',
                    isClosable: true,
                    variant: 'subtle',
                    id: undefined,
                    duration: null,
                    position: 'top',
                    render: () => (
                        <ToastBox
                            onCloseToast={onCloseToast}
                            title="Error adding"
                            description="Could not add. Try again"
                            status="error"
                        />
                    ),
                });

                showToast(failureToastComponent);
            }
        },
        [editableIssue, id, setModalOpened, toast, showToast, onCloseToast],
    );

    const onSaveAction = useMemo(
        () => (editableIssue ? onUpdateIssue : onSaveIssue),
        [editableIssue, onSaveIssue, onUpdateIssue],
    );

    const scannedTime = useMemo(
        () => {
            const dateString = basicData ? basicData.scantime : new Date().toISOString();
            return formatDateTime(dateString);
        },
        [basicData],
    );

    const areYouSureMsg = `Are you sure you want to delete the occurence?${deletableOccurenceData?.issueDeletable ? 'This will delete the issue as well' : ''}`;

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
                onDelete={deletableOccurenceData?.issueDeletable
                    ? onDeleteIssue : onDeleteOccurence}
                header="Delete Issue"
                areYouSureMsg={areYouSureMsg}
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
                {basicData?.name && ' - '}
                Scan Detail
                <Divider />
            </Heading>

            {processingUrl && !issuesShown && (
                <Loading message="Waiting for data to load" />
            )}

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
                                {/* FIXME: basicdata.name is not website name */}
                                {`Website: ${basicData?.name} | Scanned on ${scannedTime}`}
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
                        onClose={onResetEditableIssue}
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
                            minW="xl"
                        >
                            <ModalHeader
                                tabIndex={-1}
                            >
                                <Heading
                                    as="h1"
                                    size="md"
                                >
                                    {editableIssue ? 'Edit Issue' : 'Add Issue'}
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton tabIndex={-1} />
                            <ModalBody tabIndex={-1}>
                                <IssueForm
                                    onSaveAction={onSaveAction}
                                    onCloseAction={onResetEditableIssue}
                                    editableIssue={editableIssue}
                                    // onResetEditableIssue={onResetEditableIssue}
                                    criteriaListForForm={criteriaListForForm}
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
                                placeholder="All Criteria / Tags"
                                label="Select Criteria / Tag"
                                onSelectOption={onSelectFilterableCriteria}
                            />
                        </HStack>
                    </HStack>
                    <Box marginTop={4}>
                        <EditableIssueList
                            issueList={filteredIssues}
                            setDeletableOccurenceData={setDeletableOccurenceData}
                            onSetEditableIssue={onSetEditableIssue}
                        />
                    </Box>
                </Box>
            )}
        </VStack>
    );
}

export default ScannedWebsiteDetail;
