export type Impact = 'critical' | 'moderate' | 'serious' | 'minor';

export interface IssueBody {
    id: string | number;
    criteria: string;
    impact: Impact;
    foundDate: string;
    found: string;
    tags: string[];
    description: string;
    location?: string;
    source?: string;
    solution?: string;
}

export interface Criteria {
    criteriaId: string;
    name: string;
    note: string;
}

export interface Occurence {
    occurenceId: string;
    description: string;
    location?: string;
    source?: string;
    fix?: string;
    note?: string;
}

export interface IssueObject {
    issueId: string;
    name: string;
    criteria: Criteria[];
    occurences: Occurence[];
    impact: Impact;
    timestamp: string;
    found: string;
    note: string;
}

export interface ImpactStatistics {
    impact: Impact;
    count: number;
}

export type FoundType = 'automatic' | 'guided' | 'needsReview' | 'manual';

export interface FoundStatistics {
    found: FoundType;
    count: number;
}

export interface BasicData {
    scantime: string;
    url: string;
    name: string;
}

export interface DeletableOccurenceData {
    occurenceId: string;
    issueId: string;
    issueName: string;
    issueDeletable: boolean;
}

export interface ScanWebsiteResponse {
    name: string;
    url: string;
    scanTime: string;
    issues: IssueObject[];
    impactStatistics: ImpactStatistics[];
    foundStatistics: FoundStatistics[];
}
