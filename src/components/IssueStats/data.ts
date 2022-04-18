// eslint-disable-next-line import/prefer-default-export

export type Impact = 'Critical' | 'Moderate' | 'Serious' | 'Minor';

export interface ImpactData {
    impact: Impact;
    count: number;
}

export const impactMockData: ImpactData[] = [
    {
        impact: 'Critical',
        count: 20,
    },
    {
        impact: 'Serious',
        count: 20,
    },
    {
        impact: 'Moderate',
        count: 20,
    },
    {
        impact: 'Minor',
        count: 0,
    },
];

export type Issue = 'automatic' | 'guided' | 'reviewable';

export type IssueTypeDataInterface = {
    [x in Issue]: number;
};

export const issueTypeData : IssueTypeDataInterface = {
    automatic: 10,
    guided: 20,
    reviewable: 1,
};
