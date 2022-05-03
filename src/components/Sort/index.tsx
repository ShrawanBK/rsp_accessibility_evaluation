import React from 'react';
import SelectField from '../SelectField';

const options = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Date',
        value: 'date',
    },
    {
        label: 'Type',
        value: 'type',
    },
];

function Sort() {
    return (
        <SelectField
            options={options}
            placeholder="Select option"
            label="Sort By"
            onSelectOption={() => console.warn('selected id')}
        />
    );
}

export default Sort;
