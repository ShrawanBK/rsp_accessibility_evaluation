import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
} from '@chakra-ui/react';
import React, { ChangeEvent, useCallback, useState } from 'react';

interface Props {
  onSearch: (url: string) => void;
}

function SearchScans(props: Props) {
    const { onSearch } = props;
    const [url, setUrl] = useState<string>();

    const errored = !url;

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (!url) {
                return;
            }
            onSearch(url);
        },
        [onSearch, url],
    );

    return (
        <form onSubmit={handleSubmit}>
            {}
            <FormControl isInvalid={false} flex={2}>
                <FormLabel htmlFor="url">Webpage or Website Name</FormLabel>
                <HStack spacing={0}>
                    <Input
                        id="url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        width="80%"
                        placeholder="Enter website url (https://www.examplewebsite.example) "
                        background="whiteAlpha.900"
                        borderTopRightRadius={0}
                        borderBottomRightRadius={0}
                    />
                    <Button
                        type="submit"
                        disabled={errored}
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
