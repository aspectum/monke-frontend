import React, { useEffect, useState } from 'react';

type AcceptedTypes = 'text' | 'password' | 'email' | 'number' | 'tel';

export interface TextInputProps {
    id: string;
    type: AcceptedTypes;
    name?: string;
    value?: string;
    label: string;
    formStateSetter: (id: string, value: string) => void;
}

export const TextInput = ({
    id,
    type,
    label,
    value = '',
    formStateSetter,
    name,
}: TextInputProps) => {
    useEffect(() => {
        formStateSetter(id, value); // Initializing form state
    }, [id, value, formStateSetter]);

    const [state, setState] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formStateSetter) {
            throw new TypeError('Expected parent component <CustomForm>');
        }
        setState(e.target.value);
        formStateSetter(id, e.target.value);
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
