import React, { useCallback, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import ScanForm from '../../components/forms/ScanForm';

import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import Info from '../../components/Info';
import Paginator from '../../components/Paginator';
import SavedScanList from '../../components/SavedScanList';
import { SavedScanItem, savedScanItemColumn } from './data';
import ToastBox from '../../components/ToastBox';
import apis from '../../utils/apis';
import SearchScans from '../../components/forms/SearchScans';
import SelectField from '../../components/SelectField';

const options = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Type',
        value: 'type',
    },
];

function SavedScan() {
    const [savedScanList, setSavedScanList] = useState<SavedScanItem[]>();
    const [searchField, setSearchField] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [totalPages, setTotalPages] = useState<number>(1);
    useEffect(() => {
        const getInitialSavedScanList = async () => {
            try {
                const apiUrl = '/webpage?sortby=name&orderby=desc&pageNum=1&pageSize=10';
                const response = await apis.get(apiUrl);
                const dataResponse: SavedScanItem[] = await response.data;
                setTotalPages(1);
                if (!dataResponse || dataResponse.length <= 0) {
                    setSavedScanList(undefined);
                    return;
                }
                setSavedScanList(dataResponse);
            } catch (error) {
                console.warn({ error });
            }
        };
        getInitialSavedScanList();
    }, []);

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

    const onDeleteItem = useCallback(
        async () => {
            try {
                if (!deletableId) {
                    return;
                }
                const response = await apis.delete(`/webpage/${deletableId}`);
                const deleteDataResponse: string = await response.data;
                if (deleteDataResponse === 'sucessfully deleted') {
                    setSavedScanList((currentList) => (
                        currentList?.filter((item) => item.id !== deletableId)
                    ));

                    // NOTE MAKE IT ACCESSIBLE
                    const toastComponent = toast({
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
                    const toastComponent = toast({
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
                const toastComponent = toast({
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
        [deletableId, onCloseToast, toast],
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
                            setSearchField={setSearchField}
                            onSearch={getSavedScanList}
                        />
                    </Box>
                    <Spacer />
                    <Box width="20%">
                        <SelectField
                            options={options}
                            label="Sort By"
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
