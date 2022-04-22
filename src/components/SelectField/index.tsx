import React from 'react';

import {
    FormControl,
    FormLabel,
    Select,
} from '@chakra-ui/react';

type OptionValue = number | string;

type Option<Type extends OptionValue> = {
    value: Type;
    label: string;
};

type variant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface SelectFieldProps<Type extends OptionValue> {
    options: Option<Type>[];
    valueSelector: string;
    optionLabelSelector?: string;
    label?: string;
    placeholder?: string;
    variant?: variant;
    onSelectOption?: () => void;
}

function SelectField<Type extends OptionValue>(props: SelectFieldProps<Type>) {
    const {
        options = [],
        valueSelector,
        optionLabelSelector = 'optionLabel',
        label = 'label',
        placeholder,
        variant = 'outline',
        onSelectOption,
    } = props;

    return (
        <FormControl
            isInvalid={false}
            p={2}
        >
            <FormLabel htmlFor={label}>
                {label}
            </FormLabel>
            <Select
                isReadOnly
                size="lg"
                isFullWidth
                placeholder={placeholder}
                variant={variant}
                title={label}
                id={label}
                onChange={onSelectOption}
            >
                {options.map((option) => {
                    const value = option[valueSelector as keyof typeof option];
                    const optLabel = option[optionLabelSelector as keyof typeof option];
                    return (
                        <option
                            key={optLabel}
                            value={value}
                        >
                            {optLabel}
                        </option>
                    );
                })}
            </Select>
        </FormControl>
    );
}

export default SelectField;
