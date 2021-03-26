import React, { ReactElement } from 'react';

interface Props {
    text: string;
    // eslint-disable-next-line react/require-default-props
    className?: string;
}

export function ButtonSubmit({ text, className = '' }: Props): ReactElement {
    return (
        <button className={className} type="submit">
            {text}
        </button>
    );
}
