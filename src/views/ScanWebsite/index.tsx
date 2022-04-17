import React, { useCallback } from 'react';
import {
    Box,
    Divider,
    Flex,
    Heading,
    useBoolean,
    VStack,
} from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import Info from '../../components/Info';
import Loading from '../../components/Loading';
import IssueStats from '../../components/IssueStats';

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
    return (
        <VStack align="stretch" spacing={8}>
            <Flex>
                <Heading>
                    Scan Website
                    <Divider />
                </Heading>
            </Flex>
            <Box width="60%" marginTop="1vh">
                <ScanForm
                    processingUrl={processingUrl}
                    onScanWebsite={onScanWebsite}
                />
                {!processingUrl && (
                    <Info
                        title="Scan & Audit Webpage"
                        message="Get accessibility test result of your webpage by inputting URL and scan it."
                        icon=""
                    />
                )}
                {processingUrl && <Loading message="Waiting for Result" />}
            </Box>
            <Box width="70%">
                <IssueStats />
            </Box>
        </VStack>
    );
}

export default ScanWebsite;
