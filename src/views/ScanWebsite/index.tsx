import React, { useCallback } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Text,
    useBoolean,
    VStack,
} from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import IssueStats from '../../components/IssueStats';
import IssueList from '../../components/IssueList';
import UpdatedIssueList from '../../components/IssueList/UpdatedIndex';

function ScanWebsite() {
    const [processingUrl, setProcessingUrl] = useBoolean();
    const onScanWebsite = useCallback(
        (url: string) => {
            setProcessingUrl.on();
            console.log('on processing url - ', url);
            setTimeout(() => setProcessingUrl.off(), 2000);
        },
        [setProcessingUrl],
    );

    const date = '27 December 2021';
    const time = '18:01 pm';
    return (
        <VStack
            align="stretch"
            spacing={8}
            p={4}
        >
            <Flex>
                <Heading
                    as="h5"
                    size="lg"
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
                {/*
                    <Info
                        title="Scan & Audit Webpage"
                        message="Get accessibility test
                        result of your webpage by inputting URL and scan it."
                        icon=""
                    />
                {processingUrl && <Loading message="Waiting for Result" />} */}
            </Box>
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
                    <IssueStats />
                </Box>
                <Box
                    marginTop={8}
                >
                    <IssueList />
                </Box>
                <Divider />
                <Box
                    marginTop={8}
                >
                    <UpdatedIssueList />
                </Box>
            </Box>
        </VStack>
    );
}

export default ScanWebsite;
