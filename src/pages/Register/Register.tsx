import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../actions/authActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import { RootState } from '../../store';
import './Register.scss';

function Register(): ReactElement {
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const justRegistered = useSelector((state: RootState) => state.authReducer.justRegistered);
    const dispatch = useDispatch();

    // Handles form submission
    const onSubmit = (fields: any) => {
        dispatch(
            register(fields['register-username'], fields['register-email'], fields['register-pw'])
        );
    };

    // RENDERING
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    if (justRegistered) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="register">
            <div className="register-text">Register</div>
            <CustomForm className="form-register" onSubmit={onSubmit}>
                <TextInput type="text" id="register-username" name="username" label="Username: " />
                <TextInput type="email" id="register-email" name="email" label="E-mail: " />
                <TextInput type="password" id="register-pw" name="password" label="Password: " />
                <ButtonSubmit className="btn-register" text="Register" />
            </CustomForm>
            <div className="to-login">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    );
}

export default Register;
