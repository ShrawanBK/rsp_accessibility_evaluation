export interface Column {
    description: string;
    accessor: string;
}

export interface SavedScanItem {
    id: string;
    webpage: string;
    url: string;
    website: string;
    scannedDate: string;
    severity: string;
}

export const savedScanItemColumn: Column[] = [
    {
        description: 'Webpage',
        accessor: 'webPage',
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
        accessor: 'scannedDate',
    },
    {
        description: 'Severity',
        accessor: 'severity',
    },
    {
        description: 'Actions',
        accessor: 'actions',
    },
];

export const savedScanItemList: SavedScanItem[] = [
    {
        id: '1',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '2',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '3',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '4',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '5',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '6',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '7',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '8',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '9',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '10',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '11',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
    {
        id: '12',
        webpage: 'Facebook Profile Page',
        url: 'https://facebook.com',
        website: 'Facebook',
        scannedDate: '1:31 22 April 2022',
        severity: '10%',
    },
];
