import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../store';
import './AccessControl.scss';

interface Props {
    title: string;
    form: ReactElement;
    redirectText: ReactElement;
}

function AccessControl({ title, form, redirectText }: Props): ReactElement {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    // RENDERING
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="access-control">
            <div className="access-control-title">{title}</div>
            {form}
            <div className="access-control-redirect-text">{redirectText}</div>
        </div>
    );
}

export default AccessControl;
