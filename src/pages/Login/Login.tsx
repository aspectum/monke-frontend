/* eslint-disable react/jsx-curly-brace-presence */ // don't want to escape that apostrophe
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../actions/authActions';
import { CustomForm } from '../../components/CustomForm';
import { TextInput } from '../../components/CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../../components/Grid';
import SpinnerButton from '../../components/SpinnerButton/SpinnerButton';
import Tooltip from '../../components/Tooltip/Tooltip';
import AccessControl from '../../containers/AccessControl/AccessControl';
import { RootState } from '../../store';
import { color1 } from '../../styles/colors';

const GridForm = styled(GridWrapper)`
    margin: 20px auto;
`;

const CenterBtn = styled.div`
    margin: 0 auto;
    position: relative;
    display: contents;
`;

function Login(): ReactElement {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.authReducer.loginLoading);
    const [state, setState] = useState({ emailFilled: true, passFilled: true });

    // Handles form submission
    const onSubmit = (fields: any) => {
        let emailFilled = false;
        let passFilled = false;

        if (fields['login-email'].length > 0) {
            emailFilled = true;
        }
        if (fields['login-pw'].length > 0) {
            passFilled = true;
        }

        setState({ ...state, emailFilled, passFilled });

        if (emailFilled && passFilled) {
            dispatch(login(fields['login-email'], fields['login-pw']));
        }
    };

    const { emailFilled, passFilled } = state;

    return (
        <AccessControl
            title="Login"
            form={
                <CustomForm onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <GridForm
                                TemplateRows="40px 40px 15px 40px 40px 15px 40px"
                                TemplateCols="1fr 0"
                                width="80%"
                            >
                                <GridItem GridRow="1 / span 1">
                                    <label htmlFor="na-url">E-mail: </label>
                                </GridItem>
                                <GridItem GridRow="2 / span 1">
                                    <TextInput
                                        type="email"
                                        id="login-email"
                                        name="email"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="2 / span 1">
                                    <Tooltip visible={!emailFilled} text="Please fill this field" />
                                </GridItem>
                                <GridItem GridRow="4 / span 1">
                                    <label htmlFor="na-url">Password: </label>
                                </GridItem>
                                <GridItem GridRow="5 / span 1">
                                    <TextInput
                                        type="password"
                                        id="login-pw"
                                        name="password"
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="5 / span 1">
                                    <Tooltip visible={!passFilled} text="Please fill this field" />
                                </GridItem>
                                <GridItem GridRow="7 / span 1">
                                    <CenterBtn>
                                        <SpinnerButton
                                            bgColor={color1}
                                            style={{
                                                width: '30%',
                                            }}
                                            type="submit"
                                            loading={loading}
                                            text="Login"
                                        />
                                        <Tooltip
                                            visible={loading}
                                            text="Hang in there, first login might take a while"
                                            style={{ position: 'absolute', left: '100%' }}
                                        />
                                    </CenterBtn>
                                </GridItem>
                            </GridForm>
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
