import React, { useCallback } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Heading,
    HStack,
    Text,
    useBoolean,
    VStack,
} from '@chakra-ui/react';

import ScanForm from '../../components/forms/ScanForm';
import IssueStats from '../../components/IssueStats';
import IssueList from '../../components/IssueList';
import SelectField from '../../components/SelectField';

const mockIssueData = [
    {
        label: 'Issue 1',
        value: 'Issue-1',
    },
    {
        label: 'Issue 2',
        value: 'Issue-2',
    },
];

const mockCriteriaData = [
    {
        label: 'Criteria 1',
        value: 'Criteria-1',
    },
    {
        label: 'Criteria 2',
        value: 'Criteria-2',
    },
];

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
                            role="heading"
                            as="h2"
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
                <HStack
                    justifyContent="flex-start"
                    marginTop={8}
                >
                    <Checkbox
                        aria-label="issue.name"
                        maxWidth="20px"
                        margin={4}
                    />
                    <HStack width="80%">
                        <SelectField
                            options={mockIssueData}
                            optionLabelSelector="label"
                            valueSelector="value"
                            placeholder="All Issues"
                            label="Select Issues"
                        />
                        <SelectField
                            options={mockCriteriaData}
                            optionLabelSelector="label"
                            valueSelector="value"
                            placeholder="All Criteria"
                            label="Select Criteria"
                        />
                    </HStack>
                </HStack>
                <Box marginTop={4}>
                    <IssueList />
                </Box>
            </Box>
        </VStack>
    );
}

export default ScanWebsite;
