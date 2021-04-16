import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../../actions/authActions';
import { ButtonSubmit, CustomForm } from '../../components/CustomForm';
import { TextInput } from '../../components/CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../../components/Grid';
import Tooltip from '../../components/Tooltip/Tooltip';
import AccessControl from '../../containers/AccessControl/AccessControl';
import { RootState } from '../../store';
import {
    minPasswordLength,
    minUsernameLength,
    validateEmail,
    validatePassword,
    validateUsername,
} from '../../validators/registrationValidator';

const GridForm = styled(GridWrapper)`
    margin: 20px auto;
    font-size: 1rem;

    label {
        align-self: center;
    }

    input {
        width: 100%;
        border: 0;
        padding: 5px;
        box-sizing: border-box;
    }
`;

const Center = styled.div`
    margin: 0 auto;
`;

function Register(): ReactElement {
    const justRegistered = useSelector((state: RootState) => state.authReducer.justRegistered);
    const dispatch = useDispatch();
    const [valid, setValid] = useState({ username: true, email: true, pw: true, pwConfirm: true });

    // Handles form submission
    const onSubmit = (fields: any) => {
        const usernameValid = validateUsername(fields['register-username']);
        const emailValid = validateEmail(fields['register-email']);
        const pwValid = validatePassword(fields['register-pw']);
        const pwConfirmValid = fields['register-pw'] === fields['register-pw-confirm'];
        setValid({
            username: usernameValid,
            email: emailValid,
            pw: pwValid,
            pwConfirm: pwConfirmValid,
        });
        if (usernameValid && emailValid && pwValid && pwConfirmValid) {
            dispatch(
                register(
                    fields['register-username'],
                    fields['register-email'],
                    fields['register-pw']
                )
            );
        }
    };

    // RENDERING
    if (justRegistered) {
        return <Redirect to="/login" />;
    }
    return (
        <AccessControl
            title="Register"
            form={
                <CustomForm className="form-register" onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <GridForm
                                TemplateRows="repeat(4, minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.5fr)) minmax(0, 1fr)"
                                TemplateCols="1fr 0"
                                width="80%"
                                height="374px" // TODO remove
                            >
                                <GridItem GridRow="1 / span 1">
                                    <label htmlFor="na-url">Username: </label>
                                </GridItem>
                                <GridItem GridRow="2 / span 1">
                                    <TextInput
                                        type="text"
                                        id="register-username"
                                        name="username"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="2 / span 1">
                                    <Tooltip
                                        visible={!valid.username}
                                        text={`Username must not contain any special characters and have at least ${minUsernameLength} characters`}
                                    />
                                </GridItem>
                                <GridItem GridRow="4 / span 1">
                                    <label htmlFor="na-url">E-mail: </label>
                                </GridItem>
                                <GridItem GridRow="5 / span 1">
                                    <TextInput
                                        type="email"
                                        id="register-email"
                                        name="email"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="5 / span 1">
                                    <Tooltip visible={!valid.email} text="Insert a valid e-mail" />
                                </GridItem>
                                <GridItem GridRow="7 / span 1">
                                    <label htmlFor="na-url">Password: </label>
                                </GridItem>
                                <GridItem GridRow="8 / span 1">
                                    <TextInput
                                        type="password"
                                        id="register-pw"
                                        name="password"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="8 / span 1">
                                    <Tooltip
                                        visible={!valid.pw}
                                        text={`Your password must have at least ${minPasswordLength} characters`}
                                    />
                                </GridItem>
                                <GridItem GridRow="10 / span 1">
                                    <label htmlFor="na-url">Password confirmation: </label>
                                </GridItem>
                                <GridItem GridRow="11 / span 1">
                                    <TextInput
                                        type="password"
                                        id="register-pw-confirm"
                                        name="password-confirm"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="11 / span 1">
                                    <Tooltip
                                        visible={!valid.pwConfirm}
                                        text="Confirmation must be equal to password"
                                    />
                                </GridItem>
                                <GridItem GridRow="13 / span 1">
                                    <Center>
                                        <ButtonSubmit className="btn-register" text="Register" />
                                    </Center>
                                </GridItem>
                            </GridForm>
                        </>
                    )}
                </CustomForm>
            }
            redirectText={
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            }
        />
    );
}

export default Register;
