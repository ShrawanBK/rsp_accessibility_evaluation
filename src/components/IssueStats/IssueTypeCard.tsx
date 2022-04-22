import React, { useMemo } from 'react';
import {
    VStack,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';

import { IssueTypeStats } from '../../views/ScanWebsite/data';

export interface Props {
    issueTypeStats: IssueTypeStats[] | undefined;
}

const getIssueTypeCount = (
    type: IssueTypeStats['typeFound'],
    list: IssueTypeStats[] | undefined,
) => list?.find((i) => i.typeFound === type)?.count ?? 'N/A';

export default function IssueTypeCard(props: Props) {
    const {
        issueTypeStats,
        ...rest
    } = props;

    const automatic = useMemo(
        () => getIssueTypeCount('automatic', issueTypeStats),
        [issueTypeStats],
    );

    const reviewable = useMemo(
        () => getIssueTypeCount('needs review', issueTypeStats),
        [issueTypeStats],
    );

    const guided = useMemo(
        () => getIssueTypeCount('guided', issueTypeStats),
        [issueTypeStats],
    );

    return (
        <VStack
            p={2}
            align="stretch"
        >
            <Box
                p={2}
                {...rest}
            >
                <Heading
                    fontSize="small"
                    letterSpacing={2}
                    textTransform="uppercase"
                    fontWeight="semibold"
                    as="h3"
                >
                    automatic
                </Heading>
                <Text
                    mt={1}
                    fontSize="xl"
                    letterSpacing={1}
                    fontWeight="semibold"
                >
                    {`${automatic} issues (${reviewable} need reviews)`}
                </Text>
            </Box>
            <Box p={2}>
                <Heading
                    fontSize="small"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    letterSpacing={2}
                    as="h3"
                >
                    guided
                </Heading>
                <Text
                    mt={1}
                    fontSize="xl"
                    fontWeight="bold"
                >
                    {guided}
                    {' '}
                    Issues
                </Text>
            </Box>
        </VStack>
    );
}
