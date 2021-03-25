import React, { ReactElement, useState } from 'react';

export interface TextInputProps {
    id: string;
    value?: string;
    label: string;
    onChange?: (id: string, value: string) => void;
}

function TextInput({ id, label, value = '', onChange }: TextInputProps): ReactElement {
    const [state, setState] = useState(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            throw new TypeError('Expected parent component <CustomForm>');
        }
        onChange(id, e.target.value);
        setState(e.target.value);
    };

    const labelId = `${id}-label`;

    return (
        <>
            <label htmlFor={id} id={labelId}>
                {label}
            </label>
            <input type="text" id={id} onChange={handleChange} value={state} />
        </>
    );
}

export default TextInput;
