/* eslint-disable react/jsx-curly-brace-presence */ // don't want to escape that apostrophe
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { showErrorMessage } from '../../actions/messageActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import AccessControl from '../../containers/AccessControl/AccessControl';
import './Login.scss';

function Login(): ReactElement {
    const dispatch = useDispatch();

    // Handles form submission
    const onSubmit = (fields: any) => {
        if (fields['login-email'].length > 0 && fields['login-pw'].length > 0) {
            dispatch(login(fields['login-email'], fields['login-pw']));
        } else {
            dispatch(showErrorMessage(['Please fill all the fields']));
        }
    };

    return (
        <AccessControl
            title="Login"
            form={
                <CustomForm className="form-login" onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <TextInput
                                type="email"
                                id="login-email"
                                name="email"
                                label="E-mail: "
                                formStateSetter={formStateSetter}
                            />
                            <TextInput
                                type="password"
                                id="login-pw"
                                name="password"
                                label="Password: "
                                formStateSetter={formStateSetter}
                            />
                            <ButtonSubmit className="btn-login" text="Login" />
                        </>
                    )}
                </CustomForm>
            }
            redirectText={
                <span>
                    {`Don't have an account?`} <Link to="/register">Register</Link>
                </span>
            }
        />
    );
}

export default Login;
