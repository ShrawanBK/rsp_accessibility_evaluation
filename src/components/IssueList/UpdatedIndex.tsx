import React, { useState } from 'react';

import {
    Box,
} from '@chakra-ui/react';

import {
    issues,
    IssueObject,
} from './data';

import UpdatedIssueItem from './UpdatedIssueItem';

interface IssueListProps {
    // Make this compulsory
    issueList?: IssueObject[];
}

function UpdatedIssueList(props: IssueListProps) {
    const {
        issueList = issues,
    } = props;

    if (!issueList || issueList.length <= 0) {
        return null;
    }

    return (
        <Box>
            {issueList.map((issue) => (
                <UpdatedIssueItem
                    key={issue.issueId}
                    issue={issue}
                />
            ))}
        </Box>
    );
}

export default UpdatedIssueList;
