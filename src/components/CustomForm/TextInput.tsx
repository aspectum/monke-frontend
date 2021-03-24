/* eslint-disable react/require-default-props */
import React, { ReactElement } from 'react';

export interface TextInputProps {
    id: string;
    name?: string;
    value?: string;
    label: string;
    onChange?: () => void;
}

function TextInput({ id, name, label, onChange, value }: TextInputProps): ReactElement {
    // parent component should always pass all parameters
    console.log(name);
    console.log(onChange);
    if (!name || !onChange) {
        throw new TypeError('Expected parent component <CustomForm>');
    }
    const labelId = `${id}-label`;
    return (
        <>
            <label htmlFor={id} id={labelId}>
                {label}
            </label>
            <input type="text" name={name} id={id} onChange={onChange} value={value} />
        </>
    );
}

export default TextInput;
