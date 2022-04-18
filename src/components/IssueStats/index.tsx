import React from 'react';

import {
    Grid,
    GridItem,
    Center,
    Divider,
} from '@chakra-ui/react';

import {
    impactMockData,
    ImpactData,
    issueTypeData,
} from './data';

import TotalIssueCard from './TotalIssueCard';
import ImpactDataItem from './ImpactDataItem';
import IssueTypeCard from './IssueTypeCard';

export interface IssueStatsProps {
    impactDataList?: ImpactData[];
}

// TODO: Finalize the data structure with BE
function IssueStats(props: IssueStatsProps) {
    const {
        impactDataList = impactMockData,
    } = props;
    return (
        <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={4}
            alignItems="center"
        >
            <GridItem
                rowSpan={2}
                colSpan={1}
                height="100%"
            >
                <TotalIssueCard totalCount={34} />
            </GridItem>
            <GridItem
                colSpan={3}
                rowSpan={2}
            >
                <IssueTypeCard
                    automatic={issueTypeData.automatic}
                    guided={issueTypeData.guided}
                    reviewable={issueTypeData.reviewable}
                />
            </GridItem>
            <GridItem
                rowSpan={2}
                colSpan={1}
                height="100%"
            >
                <Center height="100%">
                    <Divider
                        orientation="vertical"
                        color="#E5E5E5"
                        borderLeftWidth="2px"
                    />
                </Center>
            </GridItem>

            <GridItem
                colSpan={3}
                rowSpan={2}
            >
                <Grid
                    p={2}
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
