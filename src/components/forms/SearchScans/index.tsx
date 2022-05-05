import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
} from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';

interface Props {
    searchField: string;
    handleSearchFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

function SearchScans(props: Props) {
    const {
        onSearch,
        searchField,
        handleSearchFieldChange,
    } = props;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            onSearch();
        },
        [onSearch],
    );

    return (
        <form onSubmit={handleSubmit}>
            <FormControl isInvalid={false} flex={2}>
                <FormLabel htmlFor="serachField">Webpage or Website Name</FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="searchField"
                        onChange={handleSearchFieldChange}
                        width="80%"
                        placeholder="Enter atleast 2 characters"
                        background="whiteAlpha.900"
                        borderTopRightRadius={0}
                        borderBottomRightRadius={0}
                        value={searchField}
                    />
                    <Button
                        type="submit"
                        width="10%"
                        colorScheme="brand"
                        borderTopLeftRadius={0}
                        borderBottomLeftRadius={0}
                    >
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </form>
    );
}

export default SearchScans;
