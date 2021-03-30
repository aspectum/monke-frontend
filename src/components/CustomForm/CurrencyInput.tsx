import React, { useEffect, useState } from 'react';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';

export interface CurrencyProps {
    id: string;
    name?: string;
    value?: string;
    label: string;
    currency: string;
    formStateSetter: (id: string, value: string) => void;
}

export function CurrencyInput({
    id,
    label,
    value = '',
    formStateSetter,
    name,
    currency,
}: CurrencyProps) {
    useEffect(() => {
        const { text } = normalizeCurrency(value, currency); // Parsing the currency symbol out of there
        formStateSetter(id, text); // Initializing form state
    }, [id, value, currency, formStateSetter]);

    const [state, setState] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formStateSetter) {
            throw new TypeError('Expected parent component <CustomForm>');
        }
        const { formatted, text } = normalizeCurrency(e.target.value, currency);
        setState(formatted);
        formStateSetter(id, text);
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
