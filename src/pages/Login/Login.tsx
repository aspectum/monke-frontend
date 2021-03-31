/* eslint-disable react/jsx-curly-brace-presence */ // don't want to escape that apostrophe
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { showErrorMessage } from '../../actions/messageActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import { RootState } from '../../store';
import './Login.scss';

function Login(): ReactElement {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();

    // Handles form submission
    const onSubmit = (fields: any) => {
        if (fields['login-email'].length > 0 && fields['login-pw'].length > 0) {
            dispatch(login(fields['login-email'], fields['login-pw']));
        } else {
            dispatch(showErrorMessage(['Please fill all the fields']));
        }
    };

    // RENDERING
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="login">
            <div className="login-text">Login</div>
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
            <div className="to-register">
                {`Don't have an account?`} <a href="/register">Register</a>
            </div>
        </div>
    );
}

export default Login;
