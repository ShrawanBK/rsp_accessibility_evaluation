import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    Spacer,
    Text,
    VStack,
    Button,
    Center,
    useBoolean,
} from '@chakra-ui/react';

import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import Info from '../../components/Info';
import Paginator from '../../components/Paginator';
import SavedScanList from '../../components/SavedScanList';
import { savedScanItemColumn, sortByOptions, orderOptions } from './constant';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';
import SearchScans from '../../components/forms/SearchScans';
import SelectField from '../../components/SelectField';
import { ToastBoxContext } from '../../contexts/ToastBoxContext';
import Loading from '../../components/Loading';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { GetSavedScanResponse, SavedScanItem } from '../../typings/savedscans';

function SavedScans() {
    const [savedScanList, setSavedScanList] = useState<SavedScanItem[]>();
    const [searchFormText, setSearchFormText] = useState('');

    const [searchField, setSearchField] = useState<string>('');
    const [loadingScanList, setLoadingScanList] = useBoolean();

    const [sortBy, setSortBy] = useState<string>('scantime');
    const [order, setOrder] = useState<string>('desc');
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalDataCount, setTotalDataCount] = useState<number>(0);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const getSavedScanList = useCallback(
        async () => {
            try {
                const pageNumber = currentPageIndex + 1;
                // TODO - Manage api calls and response properly
                setLoadingScanList.on();
                const apiUrl = `/webpage?sortBy=${sortBy}&searchField=${searchField}&orderBy=${order}&pageNum=${pageNumber}&pageSize=10`;
                const response = await apis.get(apiUrl);
                const dataResponse: GetSavedScanResponse = await response.data;

                const scanListResponse = dataResponse.data;

                if (!scanListResponse || scanListResponse.length <= 0) {
                    setSavedScanList(undefined);
                    setLoadingScanList.off();
                    return;
                }
                setTotalPages(dataResponse.lastPage);
                setTotalDataCount(dataResponse.totalCount);
                setSavedScanList(scanListResponse);
                setLoadingScanList.off();
            } catch (error) {
                console.warn({ error });
            }
        },
        [searchField, setLoadingScanList, sortBy, order, currentPageIndex],
    );

    useEffect(() => {
        getSavedScanList();
    }, [getSavedScanList]);

    const onResetSearchList = useCallback(
        () => {
            setSearchFormText('');
            setSearchField('');
        },
        [],
    );

    const onSelectSortBy = useCallback(
        (value: string) => {
            setSortBy(value);
        },
        [],
    );

    const onSelectOrder = useCallback(
        (value: string) => {
            setOrder(value);
        },
        [],
    );

    const [deletableId, setDeletableId] = useState<string>();

    const resetButtonShown = searchField && (!savedScanList || savedScanList.length <= 0);

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

    // NOTE - To show on pagination
    const [listCountStart, listCountEnd] = useMemo(
        () => {
            const startCount = currentPageIndex * 10 + 1;
            // eslint-disable-next-line max-len
            const endCount = savedScanList ? savedScanList.length + currentPageIndex * 10 : startCount;
            return [startCount, endCount];
        },
        [currentPageIndex, savedScanList],
    );

    const onDeleteItem = useCallback(
        async () => {
            try {
                if (!deletableId) {
                    return;
                }
                const response = await apis.delete(`/webpage/${deletableId}`);
                const deleteDataResponse: string = await response.data;
                // FIX - Get appropriate response status from BE
                if (deleteDataResponse === 'sucessfully deleted') {
                    // setSavedScanList((currentList) => (
                    //     currentList?.filter((item) => item.id !== deletableId)
                    // ));

                    // NOTE - MAKE IT ACCESSIBLE
                    const toastComponent = toast && toast({
                        status: 'success',
                        isClosable: true,
                        variant: 'subtle',
                        id: deletableId,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Delete Success"
                                description={`Webpage - ${deletableId} deleted successfully`}
                                status="success"
                            />
                        ),
                    });
                    showToast(toastComponent);

                    setDeletableId(undefined);

                    getSavedScanList();
                } else {
                    // NOTE MAKE IT ACCESSIBLE
                    const toastComponent = toast && toast({
                        status: 'error',
                        isClosable: true,
                        variant: 'subtle',
                        id: deletableId,
                        duration: null,
                        position: 'top',
                        render: () => (
                            <ToastBox
                                onCloseToast={onCloseToast}
                                title="Delete Failure"
                                description={`Webpage - ${deletableId} could not be deleted`}
                                status="error"
                            />
                        ),
                    });
                    showToast(toastComponent);
                }
            } catch (error) {
                console.warn({ error });
                // NOTE MAKE IT ACCESSIBLE
                const toastComponent = toast && toast({
                    status: 'error',
                    isClosable: true,
                    variant: 'subtle',
                    id: deletableId,
                    duration: null,
                    position: 'top',
                    render: () => (
                        <ToastBox
                            onCloseToast={onCloseToast}
                            title="Delete Failure"
                            description={`Error deleting Webpage - ${deletableId}`}
                            status="error"
                        />
                    ),
                });

                showToast(toastComponent);
            }
        },
        [deletableId, onCloseToast, showToast, toast, getSavedScanList],
    );

    const openDeleteRecordDialog = !!deletableId;

    const onCloseDeleteRecordDialog = useCallback(
        () => setDeletableId(undefined),
        [setDeletableId],
    );

    const deletableItem = useMemo(() => {
        if (!deletableId || !savedScanList) {
            return undefined;
        }
        const item = [...savedScanList].find(
            (scanItem) => scanItem.id === deletableId,
        );
        return item;
    }, [savedScanList, deletableId]);

    return (
        <VStack
            align="stretch"
            spacing={8}
            p={4}
            role="main"
        >
            <Heading as="h1" size="lg">
                Saved Scans
                <Divider />
            </Heading>
            <Box width="100%" marginTop="1vh">
                <Flex alignItems="center">
                    <Box width="70%">
                        <SearchScans
                            onSubmitSearch={setSearchField}
                            searchFormText={searchFormText}
                            setSearchFormText={setSearchFormText}
                        />
                    </Box>
                    <Spacer />
                    <Box width="20%">
                        <SelectField
                            options={sortByOptions}
                            label="Sort By"
                            onSelectOption={onSelectSortBy}
                        />
                    </Box>
                </Flex>
            </Box>
            <Box background="white" p={8} borderWidth="1px" borderRadius="md">
                <HStack mb={4} spacing={8}>
                    <Heading as="h2" size="md">
                        {`${savedScanList ? SavedScanList.length : ''} Result(s)`}
                    </Heading>
                    <Spacer />
                    <Box minW="19%">
                        <SelectField
                            options={orderOptions}
                            label="Order"
                            onSelectOption={onSelectOrder}
                        />
                    </Box>
                </HStack>
                {loadingScanList && (
                    <Loading message="Waiting for Result" />
                )}
                {!loadingScanList && (!savedScanList || savedScanList.length <= 0) && (
                    <Info
                        title="No Saved Scan"
                        message="Currently there is no saved scan of websites. Click here to start scan."
                        icon={<ScanAndAuditIcon />}
                    />
                )}
                {savedScanList && savedScanList.length > 0 && (
                    <VStack align="stretch">
                        {resetButtonShown && (
                            <Center>
                                <Button
                                    colorScheme="red"
                                    onClick={onResetSearchList}
                                    background="red.700"
                                    alignSelf="center"
                                    justifySelf="center"
                                >
                                    Reset Search
                                </Button>
                            </Center>
                        )}
                        <SavedScanList
                            columns={savedScanItemColumn}
                            data={savedScanList}
                            setDeletableId={setDeletableId}
                        />
                        <HStack justifyContent="flex-end">
                            {loadingScanList ? (
                                <Text>
                                    Loading Count..
                                </Text>
                            ) : (
                                <Text>
                                    {`${listCountStart} - ${listCountEnd} out of ${totalDataCount}`}
                                </Text>
                            )}
                            <Paginator
                                pageIndex={currentPageIndex}
                                totalPages={totalPages}
                                onChangePage={setCurrentPageIndex}
                            />
                        </HStack>
                    </VStack>
                )}

                <DeleteConfirmationDialog
                    open={openDeleteRecordDialog}
                    onCancelDelete={onCloseDeleteRecordDialog}
                    deletableItemId={deletableItem?.id}
                    onDelete={onDeleteItem}
                    header="Delete webpage"
                    areYouSureMsg="Are you sure you want to delete the following webpage?"
                    dialogBody={(
                        <>
                            <br />
                            Webpage:
                            {' '}
                            {deletableItem?.name}
                            <br />
                            Website:
                            {' '}
                            {deletableItem?.website}
                        </>
                    )}
                />
            </Box>
        </VStack>
    );
}

export default SavedScans;
