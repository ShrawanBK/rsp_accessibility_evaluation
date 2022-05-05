import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ToastId,
    useBoolean,
    useToast,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';

import ScanForm from '../../components/forms/ScanForm';
import IssueStats from '../../components/IssueStats';
import IssueList from '../../components/IssueList';
import SelectField from '../../components/SelectField';
import Loading from '../../components/Loading';
import Info from '../../components/Info';
import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import InvalidUrlIcon from '../../components/icons/InvalidUrl';

import {
    IssueObject,
    ImpactStatistics,
    FoundStatistics,
    Criteria,
    Impact,
} from './data';
import SaveResultForm, { SaveResultFormData } from '../../components/forms/SaveResult';
import apis from '../../utils/apis';
import ToastBox from '../../components/ToastBox';

export interface BasicData {
    scanTime: string;
    url: string;
    name: string;
}

interface ScanWebsiteResponse {
    name: string;
    url: string;
    scanTime: string;
    issues: IssueObject[];
    impactStatistics: ImpactStatistics[];
    foundStatistics: FoundStatistics[];
}
function ScanWebsite() {
    const [processingUrl, setProcessingUrl] = useBoolean();
    const [issues, setIssues] = useState<IssueObject[]>();
    const [impactStatistics, setImpactStatistics] = useState<ImpactStatistics[]>();
    const [foundStatistics, setFoundStatistics] = useState<FoundStatistics[]>();
    const [urlInvalidStatus, setUrlInvalidStatus] = useBoolean();
    const [selectedIssueIds, setSelectedIssueIds] = useState<IssueObject['issueId'][]>();

    const [modalOpened, setModalOpened] = useBoolean();

    // handle control of Checkbox correspoding to "Select Issue"
    const [allIdsSelected, setAllIdsSelected] = useBoolean();

    const [filterableImpactLevel, setFilterableImpactLevel] = useState<Impact>();
    const [filterableCriteria, setFilterableCriteria] = useState<Criteria['criteriaId']>();

    const [basicData, setBasicData] = useState<BasicData>();

    const issuesShown = !urlInvalidStatus && issues && !processingUrl;

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
            const duplicate = seen.has(c.name);
            seen.add(c.name);
            return !duplicate;
        });
        return filteredCriteria.map((item) => ({
            label: item.name,
            value: item.name,
        }));
    }, [issues]);

    //   const getArtworkDetail = async () => {
    //     try {
    //       const response = await apis.get(`/content/${artworkId}`, {
    //         headers: {
    //           "Access-Control-Allow-Origin": true,
    //         },
    //       });
    //       if (!response) {
    //         return;
    //       }

    //       setArtworkDetail(response.data);
    //     } catch (error) {
    //       console.warn({ error });
    //     }
    //   };

    //   useEffect(() => {
    //     getArtworkDetail();
    //   }, []);

    useEffect(() => {
        const getCriteria = async () => {
            try {
                const response = await axios.delete('http://35.228.111.234:3000/webpage/625d636b0447d8d35ba977a0', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                console.log('criteriaResponse--', response);
            } catch (error) {
                console.warn({ error });
            }
        };
        getCriteria();
    }, []);
    const onScanWebsite = useCallback(
        async (scanUrl: string) => {
            try {
                setProcessingUrl.on();
                const response = await axios.get(`http://localhost:8080/scan?url=${scanUrl}`);
                const dataResponse: ScanWebsiteResponse = response.data;
                if (!dataResponse) {
                    setProcessingUrl.off();
                    return;
                }
                setIssues(dataResponse.issues);
                setImpactStatistics(dataResponse.impactStatistics);
                setFoundStatistics(dataResponse.foundStatistics);
                setSelectedIssueIds(undefined);
                setBasicData({
                    scanTime: dataResponse.scanTime,
                    url: dataResponse.url,
                    name: dataResponse.name,
                });
                setUrlInvalidStatus.off();
                setAllIdsSelected.off();
                setProcessingUrl.off();
            } catch (error) {
                console.warn({ error });
            }
        },
        [setAllIdsSelected, setProcessingUrl, setUrlInvalidStatus],
    );

    // setTimeout(() => {
    //     setProcessingUrl.off();
    //     setIssues(issuesMockData);
    //     setImpactStatistics(impactStatisticsMockData);
    //     setUrlInvalidStatus.off();
    //     setFoundStatistics(issueTypeMockStats);
    //     setSelectedIssueIds(undefined);
    //     setAllIdsSelected.off();
    //     setBasicData({
    //         timeDate: new Date().toISOString(),
    //         url,
    //     });
    // }, 2000);

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
            setFilterableCriteria(value);
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
                const issueCriteriaIds = issue.criteria.map((c) => c.name);
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
            const issueCriteriaIds = issue.criteria.map((c) => c.name);
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
            if (!impactStatistics) {
                return undefined;
            }
            const countArray = [...impactStatistics].map((i) => i.count);
            const sum = countArray.reduce((a, b) => a + b);
            return sum;
        },
        [impactStatistics],
    );

    const onSelectAllIssues = useCallback(
        () => {
            // filteredIssues
            if (!selectedIssueIds || selectedIssueIds.length < 0) {
                // const ids = impactLevelOptions.map((i) => i.value);
                const ids = [...filteredIssues ?? []].map((issue) => issue.name);
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
                if (!filteredIssues) {
                    return;
                }
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
    // "name": "lapland web",
    // "url": "lappy.com",
    // "scanTime": "12:00pm",
    // "note": "me testing yet another website",
    // "website" : {
    //     "name":"facebook",
    //     "url": "fb.com"
    // },
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

    const onSaveResult = useCallback(
        async (formData: SaveResultFormData) => {
            try {
                if (!basicData) {
                    return;
                }
                console.log({
                    name: basicData.name,
                    url: basicData.url,
                    scanTime: basicData.scanTime,
                    note: formData.note,
                    website: {
                        name: formData.webpage,
                        url: formData.website,
                    },
                    // NOte - should be Selected Issues
                    issues: filteredIssues,
                });

                const response = await apis.post(
                    'webpage', {
                        name: basicData.name,
                        url: basicData.url,
                        scanTime: basicData.scanTime,
                        note: formData.note,
                        website: {
                            name: formData.webpage,
                            url: formData.website,
                        },
                        // NOte - should be Selected Issues
                        issues: filteredIssues,
                    },
                );

                if (response.status === 200) {
                    const successToastComponent = toast({
                        status: 'success',
                        isClosable: true,
                        variant: 'subtle',
                        id: undefined,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Added Success"
                                description="Added Successfully"
                                status="success"
                            />
                        ),
                    });
                    showToast(successToastComponent);
                    console.log('success---', response);
                }
            } catch (error) {
                const failureToastComponent = toast({
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
                            description="Could not add :( "
                            status="error"
                        />
                    ),
                });

                showToast(failureToastComponent);
                console.log('error bho yaar --', error);
            }
        },
        [basicData, filteredIssues, onCloseToast, toast],
    );

    // const onConfirmPayment = useCallback(
    //     async () => {
    //         try {
    //             const response = await apis.post(
    //                 'payment',
    //                 {
    //                     bookingId: id,
    //                     amount: totalPrice,
    //                 },
    //             );
    //             if (response.status === 200) {
    //                 showToastMessage('Payment Success. Thank you, have a nice visit');
    //                 onUpdatePayment();
    //                 onCloseModal();
    //             }
    //         } catch (error) {
    //             console.warn({ error });
    //             showToastMessage('Payment unsuccessful. Please retry.');
    //         }
    //     },
    //     [id, totalPrice, onCloseModal],
    // );
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
                            SAVE
                        </Button>
                    </Box>
                    <Modal
                        isOpen={modalOpened}
                        onClose={setModalOpened.off}
                        // blockScrollOnMount
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
                                    Save Result
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton tabIndex={-1} />
                            <ModalBody tabIndex={-1}>
                                <SaveResultForm
                                    onSaveAction={onSaveResult}
                                    basicData={basicData}
                                    onCloseAction={setModalOpened.off}
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
                        <Checkbox
                            aria-label="issue.name"
                            maxWidth="20px"
                            margin={4}
                            borderColor="#045981"
                            onChange={onSelectAllIssues}
                            isChecked={allIdsSelected}
                            tabIndex={-1}
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
