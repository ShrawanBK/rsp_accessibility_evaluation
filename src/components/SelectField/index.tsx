import React, { useCallback } from 'react';

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
    label?: string;
    placeholder?: string;
    variant?: variant;
    onSelectOption: (value: string) => void;
}

function SelectField<Type extends OptionValue>(props: SelectFieldProps<Type>) {
    const {
        options = [],
        label = 'label',
        placeholder,
        variant = 'outline',
        onSelectOption,
    } = props;

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            event.preventDefault();
            onSelectOption(event.target.value);
        },
        [onSelectOption],
    );

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
                onChange={onChange}
                tabIndex={-1}
            >
                {options.map((option) => (
                    <option
                        key={option.label}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectField;
