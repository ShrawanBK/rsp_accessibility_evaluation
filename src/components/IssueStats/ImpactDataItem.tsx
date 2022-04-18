import React from 'react';

import {
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';
import { ImpactData } from './data';

interface ImpactDataItemProps extends ImpactData {
    rest?: {
        [x: string]: number;
    }
}

export default function ImpactDataItem(props: ImpactDataItemProps) {
    const {
        impact,
        count,
        ...rest
    } = props;
    return (
        <Box
            p={2}
            {...rest}
        >
            <Heading
                fontSize="small"
                letterSpacing={2}
                textTransform="uppercase"
                fontWeight="semibold"
            >
                {impact}
            </Heading>
            <Text
                mt={1}
                fontSize="xl"
                letterSpacing={1}
                fontWeight="semibold"
            >
                {count}
                {' '}
                Issues
            </Text>
        </Box>
    );
}
