import React from 'react';

import {
    Grid,
} from '@chakra-ui/react';

import ImpactDataItem from './ImpactDataItem';

import Placeholder from '../Placeholder';

import {
    ImpactStats,
} from '../../views/ScanWebsite/data';

export interface Props {
    impactStats: ImpactStats[] | undefined;
}

function ImpactDataCard(props: Props) {
    const {
        impactStats,
    } = props;

    if (!impactStats || impactStats.length <= 0) {
        return <Placeholder />;
    }
    return (
        <Grid
            p={2}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
        >
            {impactStats?.map((item) => (
                <ImpactDataItem
                    key={item.impact}
                    impact={item.impact}
                    count={item.count}
                />
            ))}
        </Grid>
    );
}

export default ImpactDataCard;
