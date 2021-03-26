/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import { RootState } from '../../store';
import './Login.scss';

interface Props {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
}

class Login extends Component<Props, any> {
    // Handles form submission
    onSubmit = (fields: any) => {
        this.props.login(fields['login-email'], fields['login-pw']);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="login">
                <div className="login-text">Login</div>
                <CustomForm className="form-login" onSubmit={this.onSubmit}>
                    <TextInput type="email" id="login-email" name="email" label="E-mail: " />
                    <TextInput type="password" id="login-pw" name="password" label="Password: " />
                    <ButtonSubmit className="btn-login" text="Login" />
                </CustomForm>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
