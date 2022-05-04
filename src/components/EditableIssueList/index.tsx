import React, { Dispatch, SetStateAction } from 'react';

import { Box } from '@chakra-ui/react';

import EditableIssueItem from './EditableIssueItem';
import { IssueObject } from '../../views/ScanWebsite/data';
import Placeholder from '../Placeholder';
import { DeletableOccurenceData } from '../../views/ScannedWebsiteDetail';

interface IssueListProps {
    issueList: IssueObject[] | undefined;
    setDeletableOccurenceData: Dispatch<SetStateAction<DeletableOccurenceData | undefined>>;
}

function EditableIssueList(props: IssueListProps) {
    const {
        issueList,
        setDeletableOccurenceData,
    } = props;

    if (!issueList || issueList.length <= 0) {
        return (
            <Placeholder />
        );
    }

    return (
        <Box>
            {issueList.map((issue) => (
                <EditableIssueItem
                    key={issue.issueId}
                    issue={issue}
                    setDeletableOccurenceData={setDeletableOccurenceData}
                />
            ))}
        </Box>
    );
}

export default EditableIssueList;
