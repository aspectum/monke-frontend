import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import { RootState } from '../../store';
import './Login.scss';

function Login(): ReactElement {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const dispatch = useDispatch();

    // Handles form submission
    const onSubmit = (fields: any) => {
        dispatch(login(fields['login-email'], fields['login-pw']));
    };

    // RENDERING
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="login">
            <div className="login-text">Login</div>
            <CustomForm className="form-login" onSubmit={onSubmit}>
                <TextInput type="email" id="login-email" name="email" label="E-mail: " />
                <TextInput type="password" id="login-pw" name="password" label="Password: " />
                <ButtonSubmit className="btn-login" text="Login" />
            </CustomForm>
        </div>
    );
}

export default Login;
