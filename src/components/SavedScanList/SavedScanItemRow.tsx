import React, { useCallback, useMemo } from 'react';

import {
    Button,
    HStack,
    Td,
    Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { formatDateTime } from '../../utils/common';
import { SavedScanItem } from '../../typings/savedscans';

export interface Props {
    setDeletableId: React.Dispatch<React.SetStateAction<string | undefined>>;
    item: SavedScanItem;
    negativeTabIndex?: boolean;
}

function SavedScansItemRow(props: Props) {
    const {
        item,
        setDeletableId,
        negativeTabIndex,
    } = props;

    const navigate = useNavigate();
    const onViewButtonClicked = useCallback(
        () => navigate(`/saved_scans/${item.id}`),
        [item.id, navigate],
    );

    const onDeleteButtonClicked = useCallback(
        () => setDeletableId(item.id),
        [item.id, setDeletableId],
    );

    const scannedTime = useMemo(
        () => formatDateTime(item.scanTime),
        [item.scanTime],
    );

    return (
        <Tr>
            <Td>{item.name}</Td>
            <Td>{item.url}</Td>
            <Td>{item.website}</Td>
            <Td>{scannedTime}</Td>
            <Td>
                <HStack spacing={2}>
                    <Button
                        type="button"
                        h={10}
                        letterSpacing={1}
                        colorScheme="blue"
                        background="blue.700"
                        tabIndex={negativeTabIndex ? -1 : undefined}
                        onClick={onViewButtonClicked}
                    >
                        View
                    </Button>
                    <Button
                        type="button"
                        h={10}
                        letterSpacing={1}
                        colorScheme="red"
                        background="red.700"
                        tabIndex={negativeTabIndex ? -1 : undefined}
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
