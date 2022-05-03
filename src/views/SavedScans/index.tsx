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
} from '@chakra-ui/react';
import ScanForm from '../../components/forms/ScanForm';

import ScanAndAuditIcon from '../../components/icons/ScanAndAudit';
import Info from '../../components/Info';
import Paginator from '../../components/Paginator';
import SavedScanList from '../../components/SavedScanList';
import Sort from '../../components/Sort';
import { SavedScanItem, savedScanItemColumn, savedScanItemList } from './data';

function SavedScan() {
    const [savedScanList, setSavedScanList] = useState<SavedScanItem[]>();

    useEffect(
        () => {
            setSavedScanList(savedScanItemList);
        },
        [],
    );

    const onSearch = useCallback(
        (url: string) => {
            console.log('on processing url - ', url);
        },
        [],
    );

    const [deletableId, setDeletableId] = useState<string>();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const totalPages = 3;
    const toast = useToast();

    const onDeleteItem = useCallback(
        () => {
            if (!deletableId) {
                return;
            }
            setSavedScanList((currentList) => (
                currentList?.filter((item) => item.id !== deletableId)
            ));

            // NOTE MAKE IT ACCESSIBLE
            toast({
                title: 'Scan Item Deleted.',
                description: "We've deleted the scan item.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setDeletableId(undefined);
        },
        [deletableId, toast],
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
                    <Box width="80%">
                        <ScanForm
                            processingUrl={false}
                            onScanWebsite={() => console.warn('search pressed')}
                            label="Webpage or Website Name"
                            placeholder="Enter atleast 2 characters"
                            buttonLabel="search"
                        />
                    </Box>
                    <Spacer />
                    <Box width="20%">
                        <Sort />
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
                {savedScanList && savedScanList.length >= 0 && (
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
