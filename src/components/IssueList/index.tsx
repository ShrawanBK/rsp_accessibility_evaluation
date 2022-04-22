import React, { useCallback, useState } from 'react';

import {
    Box,
} from '@chakra-ui/react';

import IssueItem from './IssueItem';
import { IssueObject } from '../../views/ScanWebsite/data';
import Placeholder from '../Placeholder';

interface IssueListProps {
    issueList: IssueObject[] | undefined;
}

function IssueList(props: IssueListProps) {
    const {
        issueList,
    } = props;

    const [selectedIssueIds, setSelectedIssueIds] = useState<IssueObject['issueId'][]>();

    const onUpdateSelectedIssue = useCallback(
        (id: string) => {
            // Add first checkbox
            if (!selectedIssueIds || selectedIssueIds.length <= 0) {
                setSelectedIssueIds([id]);
                return;
            }

            const tmpSelectedIssueIds = [...selectedIssueIds];

            // check if the id exists
            const selectedIdIndex = tmpSelectedIssueIds.findIndex((item) => item === id);

            if (selectedIdIndex < 0) {
                // if id does not exist, add the id to check the checkbox
                setSelectedIssueIds([...tmpSelectedIssueIds, id]);
                return;
            }

            // if id exist, remove the id to uncheck the checkbox
            setSelectedIssueIds(tmpSelectedIssueIds.filter((item) => item !== id));
        },
        [selectedIssueIds],
    );

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
