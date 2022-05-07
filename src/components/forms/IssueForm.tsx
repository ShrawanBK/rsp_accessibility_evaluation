import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    VStack,
    Textarea,
} from '@chakra-ui/react';

import { MultiValue, OptionBase, Select } from 'chakra-react-select';

import SelectField from '../SelectField';
import { Criteria, Impact, IssueObject } from '../../views/ScannedWebsiteDetail/data';
import { FoundType } from '../../views/ScanWebsite/data';

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

interface Props {
    isLoading?: boolean;
    onSaveAction: (formData: IssueFormData) => void;
    onCloseAction: (() => void) | undefined;
    editableIssue: IssueObject | undefined;
    criteriaListForForm: Criteria[] | undefined;
    onResetEditableIssue: () => void;
}

const impactOptions = [
    { label: 'Critical', value: 'critical' },
    { label: 'Minor', value: 'minor' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Serious', value: 'serious' },
];

interface MultiCriteriaOption extends OptionBase {
    label: string;
    value: string;
    note: string;
    criteriaId: string;
    name: string;
}

function IssueForm(props: Props) {
    const {
        isLoading,
        onSaveAction,
        onCloseAction,
        editableIssue,
        onResetEditableIssue,
        criteriaListForForm,
    } = props;

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [selectedImpact, setSelectedImpact] = useState<string>('');

    const [selectedCriteria, setSelectedCriteria] = useState<MultiValue<MultiCriteriaOption>>();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const handleDescriptionChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
    ) => setDescription(e.target.value);
    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const onSelectCriteria = useCallback(
        (newValue: MultiValue<MultiCriteriaOption>) => {
            setSelectedCriteria(newValue);
        }, [],
    );

    useEffect(
        () => {
            if (!editableIssue) {
                return;
            }
            setName(editableIssue.name);
            setDescription(editableIssue.occurences[0].description);
            setNote(editableIssue.note);
            const formMappedSelectedCriteria = editableIssue.criteria.map(
                (criteria) => ({
                    ...criteria,
                    label: criteria.name,
                    value: criteria.criteriaId,
                }),
            );
            setSelectedCriteria(formMappedSelectedCriteria);
            setSelectedImpact(editableIssue.impact);
        },
        [editableIssue],
    );

    const onCancelSave = useCallback(
        () => {
            setName('');
            setDescription('');
            setNote('');
            onResetEditableIssue();
            if (onCloseAction) {
                onCloseAction();
            }
        },
        [onCloseAction, onResetEditableIssue],
    );

    const onSelectImpact = useCallback(
        (value: string) => setSelectedImpact(value),
        [],
    );

    const criteriaOptions: MultiCriteriaOption[] = useMemo(
        () => {
            if (!criteriaListForForm || criteriaListForForm.length <= 0) {
                return [];
            }
            return criteriaListForForm.map((criteria) => ({
                value: criteria.criteriaId,
                label: criteria.name,
                note: criteria.note,
                criteriaId: criteria.criteriaId,
                name: criteria.name,
            }));
        },
        [criteriaListForForm],
    );

    const formattedSelectedCriteria = useMemo(
        () => {
            if (!selectedCriteria || selectedCriteria.length <= 0) {
                return [];
            }
            return selectedCriteria.map((sc) => ({
                criteriaId: sc.criteriaId,
                note: sc.note,
                name: sc.name,
            }));
        },
        [selectedCriteria],
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            onSaveAction({
                name,
                impact: selectedImpact as Impact,
                note,
                found: editableIssue ? editableIssue.found as FoundType : 'manual',
                occurences: [
                    {
                        description,
                    },
                ],
                criteria: formattedSelectedCriteria,
            });
        },
        [
            name,
            note,
            onSaveAction,
            selectedImpact,
            formattedSelectedCriteria,
            description,
            editableIssue,
        ],
    );

    const submitButtonDisabled = useMemo(
        () => {
            if (!editableIssue) {
                return !name || !selectedCriteria || selectedCriteria.length <= 0 || !description;
            }
            const descriptionUnchanged = description === editableIssue.occurences[0].description;
            const impactUnchanged = selectedImpact === editableIssue.impact;
            const noteUnchanged = note === editableIssue.note;

            const nothingChanged = descriptionUnchanged && impactUnchanged && noteUnchanged;
            return nothingChanged;
        },
        [description, editableIssue, name, note, selectedCriteria, selectedImpact],
    );

    const submitButtonLabel = editableIssue ? 'Update' : 'Add';

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
                        // isRequired
                        height={12}
                        isDisabled={!!editableIssue}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Criteria / Tags
                    </FormLabel>
                    <Select
                        isMulti
                        name="criteria"
                        options={criteriaOptions}
                        placeholder="Select Criteria"
                        closeMenuOnSelect={false}
                        onChange={onSelectCriteria}
                        value={selectedCriteria}
                        isDisabled={!!editableIssue}
                    />
                </FormControl>
                <SelectField
                    options={impactOptions}
                    placeholder="Select option"
                    label="Impact"
                    onSelectOption={onSelectImpact}
                    value={selectedImpact}
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
                        // isRequired
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
                        disabled={submitButtonDisabled}
                        letterSpacing={1}
                        colorScheme="brand"
                        tabIndex={-1}
                        py={4}
                    >
                        {submitButtonLabel}
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
