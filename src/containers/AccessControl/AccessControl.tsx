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
    font-size: 20px;
    font-weight: 800;
    margin: 20px;
`;

const AccessControlRedirectText = styled.div`
    margin: 10px auto 30px;

    // Using react-router-dom <Link>, that renders an anchor tag
    a {
        text-decoration: none;
    }
`;

const FormWrapper = styled.div`
    width: 100%;
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
