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
}

function SelectField<Type extends OptionValue>(props: SelectFieldProps<Type>) {
    const {
        options = [],
        valueSelector,
        optionLabelSelector = 'option-label',
        label,
        placeholder,
        variant = 'outline',
    } = props;

    return (
        <FormControl
            isInvalid={false}
            p={2}
            maxWidth="400px"
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
