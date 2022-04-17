import React from 'react';

import {
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    Image,
    VStack,
    Center,
    Divider,
} from '@chakra-ui/react';

import {
    impactMockData,
    ImpactData,
    issueTypeData,
    IssueTypeDataInterface as IssueTypeCardProps,
} from './data';

export interface IssueStatsProps {
    impactDataList?: ImpactData[];
}

interface ImpactDataItemProps extends ImpactData {
    rest?: {
        [x: string]: number;
    }
}

interface TotalIssueCardProps {
    totalCount: number;
}

function TotalIssueCard(props: TotalIssueCardProps) {
    const {
        totalCount,
    } = props;
    return (
        <Center p={1} h="100%" background="#B00D0D">
            <VStack justifyContent="center" alignItems="center">
                <Image src="https://www.designmuseum.fi/wp-content/uploads/2014/08/icon-info-white.png" height={30} width={30} alt="info" />
                <Heading fontSize="xl">{totalCount}</Heading>
                <Text fontSize="md">issues</Text>
            </VStack>
        </Center>
    );
}

function ImpactDataItem(props: ImpactDataItemProps) {
    const {
        impact,
        count,
        ...rest
    } = props;
    return (
        <Box p={1} {...rest}>
            <Heading fontSize="sm" textTransform="uppercase">{impact}</Heading>
            <Text mt={1} fontSize="xl" fontWeight="bold">
                {count}
                {' '}
                Issues
            </Text>
        </Box>
    );
}

function IssueTypeCard(props: IssueTypeCardProps) {
    const {
        automatic,
        guided,
        reviewable,
        ...rest
    } = props;
    return (
        <VStack p={5} align="stretch">
            <Box p={1} {...rest}>
                <Heading fontSize="sm" textTransform="uppercase">automatic</Heading>
                <Text mt={1} fontSize="xl" fontWeight="bold">
                    {`${automatic} issues ( ${reviewable} need reviews)`}
                </Text>
            </Box>
            <Box p={1}>
                <Heading fontSize="sm" textTransform="uppercase">guided</Heading>
                <Text mt={1} fontSize="xl" fontWeight="bold">
                    {guided}
                </Text>
            </Box>
        </VStack>
    );
}
// TODO: Finalize the data structure with BE
function IssueStats(props: IssueStatsProps) {
    const {
        impactDataList = impactMockData,
    } = props;
    return (
        <Grid
            h="180px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={1}>
                <TotalIssueCard totalCount={34} />
            </GridItem>
            <GridItem colSpan={2} rowSpan={2}>
                <IssueTypeCard
                    automatic={issueTypeData.automatic}
                    guided={issueTypeData.guided}
                    reviewable={issueTypeData.reviewable}
                />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
                <Center height="100%">
                    <Divider orientation="vertical" color="#E5E5E5" />
                </Center>
            </GridItem>

            <GridItem colSpan={3} rowSpan={2}>
                <Grid
                    p={5}
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                >
                    {
                        impactDataList.map((item) => (
                            <ImpactDataItem
                                key={item.impact}
                                impact={item.impact}
                                count={item.count}
                            />
                        ))
                    }
                </Grid>
            </GridItem>
        </Grid>
    );
}

export default IssueStats;
