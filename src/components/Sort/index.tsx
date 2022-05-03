import React from 'react';
import { Flex, FormLabel, Select } from '@chakra-ui/react';

function Sort() {
    return (
        <Flex direction="column">
            <FormLabel htmlFor="url">Sort By</FormLabel>
            <Select placeholder="Select option">
                <option value="option1">Name</option>
                <option value="option2">Date</option>
                <option value="option3">Type</option>
            </Select>
        </Flex>
    );
}

export default Sort;
