import { IssueObject } from '../views/ScannedWebsiteDetail/data';
import { Impact } from '../views/ScanWebsite/data';

export const getCriteriaOptions = (issues: IssueObject[] | undefined) => {
    if (!issues || issues.length <= 0) {
        return [];
    }
    const seen = new Set();

    const tmpCriteria = [...issues].map((issue) => issue.criteria);
    const flatTmpCriteria = tmpCriteria.flat();
    const filteredCriteria = flatTmpCriteria.filter((c) => {
        const duplicate = seen.has(c.name);
        seen.add(c.name);
        return !duplicate;
    });
    return filteredCriteria.map((item) => ({
        label: item.name,
        value: item.criteriaId,
    }));
};

export const getImpactLevelOptions = (issues: IssueObject[] | undefined) => {
    if (!issues || issues.length <= 0) {
        return [];
    }
    const possibleImpact: Impact[] = ['critical', 'minor', 'moderate', 'serious'];
    const tmpImpact = [...issues].map((issue) => issue.impact);

    return possibleImpact.map((impact) => {
        const countImpact = tmpImpact.filter((tmp) => tmp === impact).length;
        return {
            label: `${impact} (${countImpact})`,
            value: impact,
        };
    });
};
