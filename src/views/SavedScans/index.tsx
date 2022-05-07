import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
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
import { GetSavedScanResponse, SavedScanItem, savedScanItemColumn } from './data';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';
import SearchScans from '../../components/forms/SearchScans';
import SelectField from '../../components/SelectField';
import { ToastBoxContext } from '../../contexts/ToastBoxContext';
import Loading from '../../components/Loading';

const sortByOptions = [
    {
        label: 'Scan Time',
        value: 'scanTime',
    },
    {
        label: 'Webpage',
        value: 'name',
    },
    {
        label: 'Website',
        value: 'website',
    },
    {
        label: 'URL',
        value: 'url',
    },
];

function SavedScan() {
    const [savedScanList, setSavedScanList] = useState<SavedScanItem[]>();
    const [searchFormText, setSearchFormText] = useState('');

    const [searchField, setSearchField] = useState<string>('');
    const [loadingScanList, setLoadingScanList] = useBoolean();

    const [sortBy, setSortBy] = useState<string>('scanTime');
    const [totalPages, setTotalPages] = useState<number>(1);
    const getSavedScanList = useCallback(
        async () => {
            try {
                // TODO - Manage api calls and response properly
                setLoadingScanList.on();
                const apiUrl = `/webpage?sortBy=${sortBy}&searchField=${searchField}&orderBy=desc&pageNum=1&pageSize=10`;
                console.log({ apiUrl });
                const response = await apis.get(apiUrl);
                const dataResponse: GetSavedScanResponse = await response.data;

                const scanListResponse = dataResponse.data;
                if (!scanListResponse || scanListResponse.length <= 0) {
                    setSavedScanList(undefined);
                    setLoadingScanList.off();
                    return;
                }
                // fix - TOTAL COUNT IS NOT TOTAL PAGES
                setTotalPages(dataResponse.totalCount);
                setSavedScanList(scanListResponse);
                setLoadingScanList.off();
            } catch (error) {
                console.warn({ error });
            }
        },
        [searchField, setLoadingScanList, sortBy],
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
            // Note - This is not working
            setSortBy(value);
            // getSavedScanList();
        },
        [],
    );

    const [deletableId, setDeletableId] = useState<string>();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const resetButtonShown = searchField && (!savedScanList || savedScanList.length <= 0);

    const {
        toast,
        showToast,
        onCloseToast,
    } = useContext(ToastBoxContext);

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
                    setSavedScanList((currentList) => (
                        currentList?.filter((item) => item.id !== deletableId)
                    ));

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
        [deletableId, onCloseToast, showToast, toast],
    );

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
                {savedScanList && savedScanList.length > 0 && (
                    <VStack align="stretch">
                        <SavedScanList
                            columns={savedScanItemColumn}
                            data={savedScanList}
                            numberOfRecords={savedScanList.length}
                            deletableId={deletableId}
                            setDeletableId={setDeletableId}
                            onDeleteItem={onDeleteItem}
                        />
                        <HStack justifyContent="flex-end">
                            <Text>
                                1 - 10 out of
                                {' '}
                                {savedScanList.length}
                            </Text>
                            <Paginator
                                pageIndex={currentPageIndex}
                                totalPages={totalPages}
                                onChangePage={setCurrentPageIndex}
                            />
                        </HStack>
                    </VStack>
                )}
            </Box>
        </VStack>
    );
}

export default SavedScan;
