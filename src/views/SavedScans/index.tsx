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
    useToast,
    ToastId,
    Button,
    Center,
} from '@chakra-ui/react';

import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import Info from '../../components/Info';
import Paginator from '../../components/Paginator';
import SavedScanList from '../../components/SavedScanList';
import { SavedScanItem, savedScanItemColumn } from './data';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';
import SearchScans from '../../components/forms/SearchScans';
import SelectField from '../../components/SelectField';
import { ToastBoxContext } from '../../contexts/ToastBoxContext';

const sortByOptions = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Scanned Date',
        value: 'scannedDate',
    },
    {
        label: 'URL',
        value: 'url',
    },
];

function SavedScan() {
    const [savedScanList, setSavedScanList] = useState<SavedScanItem[]>();
    const [searchField, setSearchField] = useState<string>('');
    const handleSearchFieldChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value), [],
    );

    const [sortBy, setSortBy] = useState<string>('name');
    const [totalPages, setTotalPages] = useState<number>(1);
    const getInitialSavedScanList = async () => {
        try {
            const apiUrl = '/webpage?sortby=name&orderby=desc&pageNum=1&pageSize=10';
            const response = await apis.get(apiUrl);
            const dataResponse: SavedScanItem[] = await response.data;
            if (!dataResponse || dataResponse.length <= 0) {
                setSavedScanList(undefined);
                return;
            }
            setTotalPages(1);
            setSavedScanList(dataResponse);
        } catch (error) {
            console.warn({ error });
        }
    };
    useEffect(() => {
        getInitialSavedScanList();
    }, []);

    const onResetSearchList = useCallback(
        () => {
            setSearchField('');
            getInitialSavedScanList();
        },
        [setSearchField],
    );

    const getSavedScanList = useCallback(
        async () => {
            try {
                const apiUrl = `/webpage?sortby=${sortBy}&searchField=${searchField}&orderby=desc&pageNum=1&pageSize=10`;
                const response = await apis.get(apiUrl);
                const dataResponse: SavedScanItem[] = await response.data;
                if (!dataResponse || dataResponse.length <= 0) {
                    setSavedScanList(undefined);
                    return;
                }
                setSavedScanList(dataResponse);
                // NOTE - Upate this
                setTotalPages(1);
            } catch (error) {
                console.warn({ error });
            }
        },
        [searchField, sortBy],
    );

    const onSelectSortBy = useCallback(
        (value: string) => {
            setSortBy(value);
            getSavedScanList();
        },
        [getSavedScanList],
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
                            searchField={searchField}
                            handleSearchFieldChange={handleSearchFieldChange}
                            onSearch={getSavedScanList}
                        />
                    </Box>
                    <Spacer />
                    <Box width="20%">
                        <SelectField
                            options={sortByOptions}
                            label="Sort By"
                            // date, url, scannedDate
                            onSelectOption={onSelectSortBy}
                        />
                    </Box>
                </Flex>
            </Box>
            <Box background="white" p={8} borderWidth="1px" borderRadius="md">
                {(!savedScanList || savedScanList.length <= 0) && (
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
