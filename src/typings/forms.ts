import { FoundType, Impact, Criteria } from './webpage';

export interface IssueFormData {
    name: string;
    impact: Impact;
    found: FoundType;
    note?: string;
    occurences: {
        description: string;
    }[];
    criteria: Criteria[];
}

export interface SaveResultFormData {
    websiteName: string;
    webpageName: string;
    note?: string;
}
