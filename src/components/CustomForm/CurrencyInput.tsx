import React, { ReactElement, useState } from 'react';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';

export interface CurrencyProps {
    id: string;
    name?: string;
    value?: string;
    label: string;
    currency: string;
    onChange?: (id: string, value: string) => void;
}

export function CurrencyInput({
    id,
    label,
    value = '',
    onChange,
    name,
    currency,
}: CurrencyProps): ReactElement {
    const [state, setState] = useState(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            throw new TypeError('Expected parent component <CustomForm>');
        }
        const { formatted, text } = normalizeCurrency(e.target.value, currency);
        setState(formatted);
        onChange(id, text);
    };

    const labelId = `${id}-label`;

    return (
        <>
            <label htmlFor={id} id={labelId}>
                {label}
            </label>
            <input type="tel" id={id} name={name} onChange={handleChange} value={state} />
        </>
    );
}
