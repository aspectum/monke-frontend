/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import { RootState } from '../store';

interface Props {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
}
interface State {
    email: string;
    password: string;
}

class Login extends Component<Props, State> {
    state = {
        email: 'string',
        password: 'string',
    };

    // Handles form submission
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    };

    // Updates the state with the inputs
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="login-field">E-mail</label>
                        <input type="text" name="email" id="login-field" onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="password-field">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password-field"
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
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
