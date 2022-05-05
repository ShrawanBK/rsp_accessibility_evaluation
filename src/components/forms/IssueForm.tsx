import React, { ChangeEvent, useCallback, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    VStack,
    Textarea,
} from '@chakra-ui/react';
import { BasicData } from '../../views/ScanWebsite';
import SelectField from '../SelectField';

interface ResultFormData {
    url: BasicData['url'];
    scanTime: BasicData['scanTime'];
    website: string;
    webpage: string;
    note?: string;
}
interface Props {
    isLoading?: boolean;
    onSaveAction: (data: ResultFormData) => void;
    basicData: BasicData | undefined;
    onCloseAction: (() => void) | undefined;
    issueId: string | undefined,
}

const options = [
    { label: 'Critical', value: 'Critical' },
    { label: 'Minor', value: 'Minor' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Serious', value: 'Serious' },
];

function IssueForm(props: Props) {
    const {
        isLoading,
        onSaveAction,
        basicData,
        onCloseAction,
        issueId,
    } = props;

    const [name, setName] = useState<string>();
    const [criteriaTags, setCriteriaTags] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [note, setNote] = useState<string>();
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleCriteriaTagsChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => setCriteriaTags(e.target.value);
    const handleDescriptionChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
    ) => setDescription(e.target.value);
    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const onCancelSave = useCallback(
        () => {
            setName(undefined);
            setCriteriaTags(undefined);
            setDescription(undefined);
            setNote(undefined);
            if (onCloseAction) {
                onCloseAction();
            }
        },
        [onCloseAction],
    );

    const errored = !name || !criteriaTags;

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (!basicData || errored) {
                return;
            }
            console.warn({
                name,
                criteriaTags,
                description,
                note,
            });
            // NOTE: Time out is the response time when url processed
        },
        [basicData, criteriaTags, description, errored, name, note],
    );

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                {/* TODO: Handle isInvalid later */}
                <FormControl>
                    <FormLabel htmlFor="name">
                        Name
                    </FormLabel>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter issue name"
                        background="whiteAlpha.900"
                        tabIndex={-1}
                        isRequired
                        height={12}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="criteria-tags">
                        Criteria / Tags
                    </FormLabel>
                    {/* TODO: Implement multi-select */}
                    <Input
                        id="criteria-tags"
                        type="text"
                        value={criteriaTags}
                        onChange={handleCriteriaTagsChange}
                        placeholder="Select Criteria / Tags"
                        background="whiteAlpha.900"
                        tabIndex={-1}
                        isRequired
                        height={12}
                    />
                </FormControl>
                <SelectField
                    options={options}
                    placeholder="Select option"
                    label="Impact"
                    onSelectOption={() => console.warn('impact selected')}
                />
                <FormControl>
                    <FormLabel htmlFor="description">
                        description *
                    </FormLabel>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter issue description"
                        tabIndex={-1}
                        isRequired
                        rows={4}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="note">
                        Notes
                    </FormLabel>
                    <Textarea
                        id="note"
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Enter notes for the issue."
                        tabIndex={-1}
                        rows={4}
                    />
                </FormControl>
                <HStack
                    width="100%"
                    justifyContent="flex-end"
                    spacing={4}
                >
                    <Button
                        type="reset"
                        colorScheme="brand"
                        variant="outline"
                        letterSpacing={1}
                        tabIndex={-1}
                        onClick={onCancelSave}
                        py={4}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={errored || isLoading}
                        letterSpacing={1}
                        colorScheme="brand"
                        tabIndex={-1}
                        py={4}
                    >
                        Save
                    </Button>
                </HStack>
            </VStack>
            {/*
                WIP: Handle error
                {!errored ? (
                    <FormHelperText>
                        The website url is incorrect.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is isRequired
                )} */}
        </form>
    );
}
export default IssueForm;
