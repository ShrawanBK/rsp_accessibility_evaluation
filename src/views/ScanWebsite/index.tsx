import React, { useCallback } from 'react';
import {
    Heading,
    useBoolean,
    VStack,
} from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import Info from '../../components/Info';
import Loading from '../../components/Loading';

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
        <VStack width="70%" align="stretch">
            <Heading> Scan Website </Heading>
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
        </VStack>
    );
}

export default ScanWebsite;
