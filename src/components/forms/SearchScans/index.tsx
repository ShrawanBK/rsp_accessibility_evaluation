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
    setSearchField: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

function SearchScans(props: Props) {
    const {
        onSearch,
        searchField,
        setSearchField,
    } = props;

    const handleSearchFieldChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value), [setSearchField],
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (searchField === '') {
                return;
            }
            onSearch();
        },
        [onSearch, searchField],
    );

    const buttonDisabled = searchField.length < 2;
    return (
        <form onSubmit={handleSubmit}>
            { }
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
                        defaultValue={searchField}
                    />
                    <Button
                        type="submit"
                        width="10%"
                        colorScheme="brand"
                        borderTopLeftRadius={0}
                        borderBottomLeftRadius={0}
                        disabled={buttonDisabled}
                    >
                        Search
                    </Button>
                </HStack>
            </FormControl>
        </form>
    );
}

export default SearchScans;
