import React from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Box,
} from '@chakra-ui/react';

import SavedScansItemRow from './SavedScanItemRow';
import { Column, SavedScanItem } from '../../typings/savedscans';

interface Props {
    columns: Column[];
    data: SavedScanItem[];
    setDeletableId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function SavedScanList(props: Props) {
    const {
        columns,
        data,
        setDeletableId,
    } = props;

    return (
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
    );
}

export default SavedScanList;
