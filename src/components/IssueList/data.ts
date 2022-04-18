// eslint-disable-next-line import/prefer-default-export

export type Impact = 'Critical' | 'Moderate' | 'Serious' | 'Minor';

interface IssueBody {
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
