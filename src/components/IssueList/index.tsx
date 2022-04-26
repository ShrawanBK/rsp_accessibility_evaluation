import React from 'react';

import { Box } from '@chakra-ui/react';

import IssueItem from './IssueItem';
import { IssueObject } from '../../views/ScanWebsite/data';
import Placeholder from '../Placeholder';

interface IssueListProps {
    issueList: IssueObject[] | undefined;
    selectedIssueIds: IssueObject['issueId'][] | undefined;
    onUpdateSelectedIssue: (id: IssueObject['issueId']) => void;
}

function IssueList(props: IssueListProps) {
    const {
        issueList,
        selectedIssueIds,
        onUpdateSelectedIssue,
    } = props;

    if (!issueList || issueList.length <= 0) {
        return (
            <Placeholder />
        );
    }

    return (
        <Box>
            {issueList.map((issue) => (
                <IssueItem
                    key={issue.issueId}
                    issue={issue}
                    selectedIssues={selectedIssueIds}
                    onUpdateSelectedIssue={onUpdateSelectedIssue}
                />
            ))}
        </Box>
    );
}

export default IssueList;
