import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/authActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
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
import './Register.scss';

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
                            <TextInput
                                type="text"
                                id="register-username"
                                name="username"
                                label="Username: "
                                formStateSetter={formStateSetter}
                            />
                            <Tooltip
                                visible={!valid.username}
                                text={`Username must not contain any special characters and have at least ${minUsernameLength} characters`}
                                id="register-username-tooltip"
                            />
                            <TextInput
                                type="email"
                                id="register-email"
                                name="email"
                                label="E-mail: "
                                formStateSetter={formStateSetter}
                            />
                            <Tooltip
                                visible={!valid.email}
                                text="Insert a valid e-mail"
                                id="register-email-tooltip"
                            />
                            <TextInput
                                type="password"
                                id="register-pw"
                                name="password"
                                label="Password: "
                                formStateSetter={formStateSetter}
                            />
                            <Tooltip
                                visible={!valid.pw}
                                text={`Your password must have at least ${minPasswordLength} characters`}
                                id="register-pw-tooltip"
                            />
                            <TextInput
                                type="password"
                                id="register-pw-confirm"
                                name="password-confirm"
                                label="Password confirmation: "
                                formStateSetter={formStateSetter}
                            />
                            <Tooltip
                                visible={!valid.pwConfirm}
                                text="Confirmation must be equal to password"
                                id="register-pw-confirm-tooltip"
                            />
                            <ButtonSubmit className="btn-register" text="Register" />
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
