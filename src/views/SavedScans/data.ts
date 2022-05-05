export interface Column {
    description: string;
    accessor: string;
}

export interface SavedScanItem {
    id: string;
    name: string;
    url: string;
    website: string;
    scanTime: string;
}

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
        description: 'Scanned Date',
        accessor: 'scanTime',
    },
    {
        description: 'Actions',
        accessor: 'actions',
    },
];

export const savedScanItemList: SavedScanItem[] = [
    {
        id: '1',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '2',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '3',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '4',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '5',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '6',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '7',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '8',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '9',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '10',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '11',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
    {
        id: '12',
        name: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scanTime: '1:31 22 April 2022',
    },
];
