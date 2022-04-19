// eslint-disable-next-line import/prefer-default-export

export type Impact = 'Critical' | 'Moderate' | 'Serious' | 'Minor';

export interface IssueBody {
    id: string | number;
    criteria: string;
    impact: Impact;
    foundDate: string;
    found: string;
    tags: string[];
    description: string;
    location: string;
    source: string;
    solution: string;
}
export interface IssueDataObject {
    title: string;
    id: string | number;
    issues: IssueBody[]
}

export interface Criteria {
    criteriaId: string;
    name: string;
    note: string;
}

export interface Occurence {
    occurenceId: string;
    description: string;
    location: string;
    source: string;
    fix: string;
    note: string;
}

export interface IssueObject {
    issueId: string;
    name: string;
    criteria: Criteria[];
    tags: string[];
    occurence: Occurence[];
    impact: Impact;
    timestamp: string;
    found: string;
    note: string;
}

export const issues: IssueObject[] = [
    {
        issueId: 'landmark-issue-1',
        name: 'Document should have one main landmark',
        criteria: [
            {
                criteriaId: '1.1.1',
                name: 'C-1.1.1',
                note: 'This is C-1.1.1',
            },
        ],
        tags: ['cat.semantics', 'best-practice'],
        occurence: [
            {
                occurenceId: '625d636b0447d8d35ba977a2',
                description: 'Ensures the document has a main landmark',
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                fix: 'Fix the following: Document does not have a main landmark',
                note: 'This is note to be noted for first occurence of landmark issue',
            },
            {
                occurenceId: '625d636b0447d8d351a977a2',
                description: 'Ensures the document has a main landmark',
                location: 'body',
                source: '<body lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following: Document does not have a main landmark',
                note: 'This is note to be noted for the second occurence of landmark issue',
            },
        ],
        impact: 'Minor',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the landmark-issue note.',
    },
    {
        issueId: 'heading-issue-1',
        name: 'Page should contain a level-one heading',
        criteria: [
            {
                criteriaId: '1.1.1',
                name: 'C-1.1.1',
                note: 'This is C-1.1.1',
            },
        ],
        tags: ['cat.semantics', 'best-practice'],
        occurence: [
            {
                occurenceId: '625d636b0447d8d35ba977a2',
                description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                fix: 'Fix the following: Page must have a level-one heading',
                note: 'This is note to be noted for first occurence of heading issue',
            },
            {
                occurenceId: '625d636b0447d8d3512a977a2',
                description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
                location: 'body',
                source: '<body lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following: Page must have a level-one heading',
                note: 'This is note to be noted for the second occurence of heading issue',
            },
            {
                occurenceId: '625d636b0447d8d12351a977a2',
                description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
                location: 'p',
                source: '<p lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following: Page must have a level-one heading',
                note: 'This is note to be noted for the third occurence of heading issue',
            },
        ],
        impact: 'Minor',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the heading-issue note',
    },
];

export const issueData: IssueDataObject[] = [
    {
        title: 'Document should have one main landmark',
        id: 'landmark-id',
        issues: [
            {
                id: 'landmark-issue-1',
                criteria: '1.1.1',
                impact: 'Moderate',
                foundDate: '4/18/2022 at 1:27 AM',
                found: 'Automatically',
                tags: ['cat.semantics', 'best-practice'],
                description: 'Ensures the document has a main landmark',
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                solution: 'Fix the following: Document does not have a main landmark',
            },
            {
                id: 'landmark-issue-2',
                criteria: '1.1.1',
                impact: 'Moderate',
                foundDate: '4/18/2022 at 1:27 AM',
                found: 'Automatically',
                tags: ['cat.semantics', 'best-practice'],
                description: 'Ensures the document has a main landmark',
                location: 'body',
                source: '<body lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                solution: 'Fix the following: Document does not have a main landmark',
            },
        ],
    },
    {
        title: 'Page should contain a level-one heading',
        id: 'heading-id',
        issues: [
            {
                id: 'heading-issue-1',
                criteria: '1.1.2',
                impact: 'Critical',
                foundDate: '14/18/2021 at 1:27 AM',
                found: 'Automatically',
                tags: ['cat.semantics', 'best-practice'],
                description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                solution: 'Fix the following: Page must have a level-one heading',
            },
            {
                id: 'heading-issue-2',
                criteria: '1.1.2',
                impact: 'Critical',
                foundDate: '14/18/2021 at 1:27 AM',
                found: 'Automatically',
                tags: ['cat.semantics', 'best-practice'],
                description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
                location: '.nav-link-active > .css-1bnxa12 > .css-6gs9hh',
                source: '<p class="chakra-text css-6gs9hh">Scan Website</p>',
                solution: 'Fix the following: Page must have a level-one heading',
            },
        ],
    },
];
