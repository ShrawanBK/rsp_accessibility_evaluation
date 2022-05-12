import { Column } from '../../typings/savedscans';

export const savedScanItemColumn: Column[] = [
    {
        description: 'webpage',
        accessor: 'webpage',
    },
    {
        description: 'URL',
        accessor: 'url',
    },
    {
        description: 'Website',
        accessor: 'website',
    },
    {
        description: 'Scanned Time',
        accessor: 'scantime',
    },
    {
        description: 'Actions',
        accessor: 'actions',
    },
];

export const sortByOptions = [
    {
        label: 'Scan Time',
        value: 'scantime',
    },
    {
        label: 'Webpage',
        value: 'name',
    },
    {
        label: 'Website',
        value: 'website',
    },
    {
        label: 'URL',
        value: 'url',
    },
];

export const orderOptions = [
    {
        label: 'Descending',
        value: 'desc',
    },
    {
        label: 'Ascending',
        value: 'asc',
    },
];
