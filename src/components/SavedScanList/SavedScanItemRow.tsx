import React, { useCallback } from 'react';

import {
    Button,
    HStack,
    Td,
    Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { SavedScanItem } from '../../views/SavedScans/data';

export interface Props {
    setDeletableId: React.Dispatch<React.SetStateAction<string | undefined>>;
    item: SavedScanItem;
}

function SavedScansItemRow(props: Props) {
    const {
        item,
        setDeletableId,
    } = props;

    const onViewButtonClicked = useCallback(
        () => console.warn('item--', item),
        [item],
    );

    const onDeleteButtonClicked = useCallback(
        () => setDeletableId(item.id),
        [item.id, setDeletableId],
    );

    return (
        <Tr>
            <Td>{item.webpage}</Td>
            <Td>{item.url}</Td>
            <Td>{item.website}</Td>
            <Td>{item.scannedDate}</Td>
            <Td>{item.severity}</Td>
            <Td>
                <HStack spacing={2}>
                    <Link
                        to={`/saved_scans/${item.id}`}
                        aria-label={`opening /saved_scans/${item.id}`}
                    >
                        <Button
                            type="button"
                            h={10}
                            letterSpacing={1}
                            tabIndex={-1}
                            colorScheme="blue"
                            background="blue.700"
                            onClick={onViewButtonClicked}
                        >
                            View
                        </Button>
                    </Link>
                    <Button
                        type="button"
                        h={10}
                        letterSpacing={1}
                        tabIndex={-1}
                        colorScheme="red"
                        background="red.700"
                        onClick={onDeleteButtonClicked}
                    >
                        Delete
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}

export default SavedScansItemRow;
