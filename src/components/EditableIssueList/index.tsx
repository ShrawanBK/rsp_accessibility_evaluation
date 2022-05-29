import React, { Dispatch, SetStateAction } from 'react';

import { Box } from '@chakra-ui/react';

import EditableIssueItem from './EditableIssueItem';
import { IssueObject, DeletableOccurenceData } from '../../typings/webpage';
import Placeholder from '../Placeholder';

interface IssueListProps {
    issueList: IssueObject[] | undefined;
    setDeletableOccurenceData: Dispatch<SetStateAction<DeletableOccurenceData | undefined>>;
    onSetEditableIssue: (issueItem: IssueObject) => void;
    negativeTabIndex?: boolean;
}

function EditableIssueList(props: IssueListProps) {
    const {
        issueList,
        setDeletableOccurenceData,
        onSetEditableIssue,
        negativeTabIndex = false,
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
                    onSetEditableIssue={onSetEditableIssue}
                    negativeTabIndex={negativeTabIndex}
                />
            ))}
        </Box>
    );
}

export default EditableIssueList;
