import React, { useState } from 'react';

type AcceptedTypes = 'text' | 'password' | 'email' | 'number' | 'tel';

export interface TextInputProps {
    id: string;
    type: AcceptedTypes;
    name?: string;
    value?: string;
    label: string;
    onChange?: (id: string, value: string) => void;
}

export const TextInput = ({ id, type, label, value = '', onChange, name }: TextInputProps) => {
    const [state, setState] = useState(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            throw new TypeError('Expected parent component <CustomForm>');
        }
        setState(e.target.value);
        onChange(id, e.target.value);
    };

    const labelId = `${id}-label`;

    return (
        <>
            <label htmlFor={id} id={labelId}>
                {label}
            </label>
            <input type={type} id={id} name={name} onChange={handleChange} value={state} />
        </>
    );
};
