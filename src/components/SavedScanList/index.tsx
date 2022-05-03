import React, { useCallback, useMemo } from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Box,
    Heading,
} from '@chakra-ui/react';

import DeleteRecordDialog from '../DeleteRecordDialog';
import SavedScansItemRow from './SavedScanItemRow';
import { Column, SavedScanItem } from '../../views/SavedScans/data';

interface Props {
    columns: Column[];
    data: SavedScanItem[];
    numberOfRecords: number;
    deletableId: string | undefined;
    setDeletableId: React.Dispatch<React.SetStateAction<string | undefined>>;
    onDeleteItem: () => void
}

function SavedScansList(props: Props) {
    const {
        columns,
        data,
        numberOfRecords,
        setDeletableId,
        deletableId,
        onDeleteItem,
    } = props;

    const openDeleteRecordDialog = !!deletableId;

    const onCloseDeleteRecordDialog = useCallback(
        () => setDeletableId(undefined),
        [setDeletableId],
    );

    const deletableItem = useMemo(() => {
        if (!deletableId) {
            return undefined;
        }
        const item = data.find((d) => d.id === deletableId);
        return item;
    }, [data, deletableId]);

    return (
        <Box>
            <Heading as="h2" size="md">
                {`${numberOfRecords} Result(s)`}
            </Heading>
            <br />
            <Box background="white" p={8} borderWidth="1px" borderRadius="md">
                <Table>
                    <Thead>
                        <Tr>
                            {columns.map((col) => (
                                <Th key={col.description}>
                                    {col.description}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item) => (
                            <SavedScansItemRow
                                key={item.id}
                                item={item}
                                setDeletableId={setDeletableId}
                            />
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <DeleteRecordDialog
                open={openDeleteRecordDialog}
                onCancelDelete={onCloseDeleteRecordDialog}
                deletableItem={deletableItem}
                onDelete={onDeleteItem}
            />
        </Box>
    );
}

export default SavedScansList;
