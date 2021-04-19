import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store';
import { accessCtrlBackgroundColor } from '../../styles/colors';

const AccessControlWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto; // centering
    width: 500px;
    background-color: ${accessCtrlBackgroundColor};
    border-radius: 40px;
`;

const AccessControlTitle = styled.div`
    font-size: 2rem;
    font-weight: 800;
    margin: 20px;
`;

const AccessControlRedirectText = styled.div`
    font-size: 1.3rem;
    margin: 10px auto 30px;
`;

const FormWrapper = styled.div`
    width: 100%;
    font-size: 1.5rem;
`;

interface Props {
    title: string;
    form: ReactElement;
    redirectText: ReactElement;
}

const AccessControl = ({ title, form, redirectText }: Props): ReactElement => {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    // RENDERING
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <AccessControlWrapper>
            <AccessControlTitle>{title}</AccessControlTitle>
            <FormWrapper>{form}</FormWrapper>
            <AccessControlRedirectText>{redirectText}</AccessControlRedirectText>
        </AccessControlWrapper>
    );
};

export default AccessControl;
