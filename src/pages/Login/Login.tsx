/* eslint-disable react/jsx-curly-brace-presence */ // don't want to escape that apostrophe
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../actions/authActions';
import { showErrorMessage } from '../../actions/messageActions';
import { ButtonSubmit, CustomForm } from '../../components/CustomForm';
import { TextInput } from '../../components/CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../../components/Grid';
import Tooltip from '../../components/Tooltip/Tooltip';
import AccessControl from '../../containers/AccessControl/AccessControl';

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

const CenterBtn = styled.div`
    margin: 0 auto;
    position: relative;
`;

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

    const tru = true;
    return (
        <AccessControl
            title="Login"
            form={
                <CustomForm className="form-login" onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <GridForm
                                TemplateRows="repeat(2, 1fr 1fr 0.5fr) 1fr"
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
                                    <Tooltip visible={tru} text="Please fill this field" />
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
                                    <Tooltip visible={tru} text="Please fill this field" />
                                </GridItem>
                                <GridItem GridRow="7 / span 1">
                                    <CenterBtn>
                                        <ButtonSubmit className="btn-login" text="Login" />
                                        <Tooltip
                                            visible={tru}
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
