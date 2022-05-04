// eslint-disable-next-line import/prefer-default-export

export type Impact = 'Critical' | 'Moderate' | 'Serious' | 'Minor';

export interface IssueBody {
    id: string | number;
    criteria: string;
    impact: Impact;
    foundDate: string;
    found: string;
    description: string;
    location: string;
    source: string;
    solution: string;
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
    occurence: Occurence[];
    impact: Impact;
    timestamp: string;
    found: string;
    note: string;
}

export const issuesMockData: IssueObject[] = [
    {
        issueId: 'landmark-issue',
        name: 'Document should have one main landmark',
        criteria: [
            {
                criteriaId: '1.1.1',
                name: 'C-1.1.1',
                note: 'This is C-1.1.1',
            },
            {
                criteriaId: 'wcag143',
                name: 'wcag143',
                note: 'This is wcag143',
            },
        ],
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
        impact: 'Critical',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the landmark-issue note.',
    },
    {
        issueId: 'heading-issue',
        name: 'Page should contain a level-one heading',
        criteria: [
            {
                criteriaId: '1.1.1',
                name: 'C-1.1.1',
                note: 'This is C-1.1.1',
            },
            {
                criteriaId: 'wcag243',
                name: 'wcag243',
                note: 'This is wcag243',
            },
        ],
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
    {
        issueId: 'ARIA-attributes-issue',
        name: 'Elements must only use allowed ARIA attributes',
        criteria: [
            {
                criteriaId: 'wcag412',
                name: 'C-wcag412',
                note: 'This is C-wcag412',
            },
            {
                criteriaId: 'wcag2a',
                name: 'wcag2a',
                note: 'This is wcag2a',
            },
            {
                criteriaId: 'cat.aria',
                name: 'cat.aria',
                note: 'This is cat.aria',
            },
        ],
        occurence: [
            {
                occurenceId: '625d636b0447d8d35ba977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                fix: 'Fix the following:aria-label attribute cannot be used on a div with no valid role attribute.',
                note: 'This is note to be noted for first occurence of ARIA-attributes-issue',
            },
            {
                occurenceId: '625d636b0447d8d3512a977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'body',
                source: '<body lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:aria-label attribute cannot be used on a div with no valid role attribute.',
                note: 'This is note to be noted for the second occurence of ARIA-attributes-issue',
            },
            {
                occurenceId: '625d636b0447d8d12351a977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'p',
                source: '<p lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:aria-label attribute cannot be used on a div with no valid role attribute.',
                note: 'This is note to be noted for the third occurence of ARIA-attributes-issue',
            },
        ],
        impact: 'Serious',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the ARIA-attributes-issue note',
    },
    {
        issueId: 'level-one-heading',
        name: 'Page should contain a level-one heading',
        criteria: [
            {
                criteriaId: 'best-practice',
                name: 'C-best-practice',
                note: 'This is C-best-practice',
            },
            {
                criteriaId: 'cat.semantics',
                name: 'cat.semantics',
                note: 'This is cat.semantics',
            },
            {
                criteriaId: 'cat.heading',
                name: 'cat.heading',
                note: 'This is cat.heading',
            },
        ],
        occurence: [
            {
                occurenceId: '625d636b0447d8d35ba977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                fix: 'Fix the following:Page must have a level-one heading.',
                note: 'This is note to be noted for first occurence of level-one heading',
            },
            {
                occurenceId: '625d636b0447d8d3512a977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'body',
                source: '<body lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:Page must have a level-one heading.',
                note: 'This is note to be noted for the second occurence of level-one heading',
            },
            {
                occurenceId: '625d636b0447d8d12351a977a2',
                description: "Ensures ARIA attributes are allowed for an element's role",
                location: 'p',
                source: '<p lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:Page must have a level-one heading.',
                note: 'This is note to be noted for the third occurence of level-one heading',
            },
        ],
        impact: 'Moderate',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the level-one heading note',
    },

    {
        issueId: 'image-text-alternatives',
        name: 'Images must have alternate text',
        criteria: [
            {
                criteriaId: 'text-alternatives',
                name: 'C-text-alternatives',
                note: 'This is C-text-alternatives',
            },
            {
                criteriaId: 'wcag2a',
                name: 'wcag2a',
                note: 'This is wcag2a',
            },
            {
                criteriaId: 'wcag111',
                name: 'wcag111',
                note: 'This is wcag111',
            },
        ],
        occurence: [
            {
                occurenceId: '625d636b0447d8d35ba977a2',
                description: 'Ensures <img> elements have alternate text or a role of none or presentation',
                location: 'html',
                source: '<html lang="en" data-theme="light" style="--chakra-ui-color-mode:light;">',
                fix: 'Fix the following:Element does not have an alt attribute.',
                note: 'This is note to be noted for first occurence of image-text-alternatives',
            },
            {
                occurenceId: '625d636b0447d8d3512a977a2',
                description: 'Ensures <img> elements have alternate text or a role of none or presentation',
                location: 'body',
                source: '<body lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:Element does not have an alt attribute.',
                note: 'This is note to be noted for the second occurence of image-text-alternatives',
            },
            {
                occurenceId: '625d636b0447d8d12351a977a2',
                description: 'Ensures <img> elements have alternate text or a role of none or presentation',
                location: 'p',
                source: '<p lang="en" data-theme="dark" style="--chakra-ui-color-mode:dark;">',
                fix: 'Fix the following:Element does not have an alt attribute.',
                note: 'This is note to be noted for the third occurence of image-text-alternatives',
            },
        ],
        impact: 'Moderate',
        timestamp: '2022-04-18 16:11:07',
        found: 'Automatically',
        note: 'This is the level-one heading note',
    },
];

export interface ImpactStats {
    impact: Impact;
    count: number;
}

export const impactStatsMockData: ImpactStats[] = [
    {
        impact: 'Critical',
        count: 1,
    },
    {
        impact: 'Serious',
        count: 1,
    },
    {
        impact: 'Moderate',
        count: 2,
    },
    {
        impact: 'Minor',
        count: 1,
    },
];

export type IssueType = 'automatic' | 'guided' | 'needs review';

export interface IssueTypeStats {
    typeFound: IssueType;
    count: number;
}

export const issueTypeMockStats: IssueTypeStats[] = [
    {
        typeFound: 'automatic',
        count: 4,
    },
    {
        typeFound: 'guided',
        count: 1,
    },
    {
        typeFound: 'needs review',
        count: 1,
    },
];
