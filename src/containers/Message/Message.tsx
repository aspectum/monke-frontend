import { faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { closeMessage } from '../../actions/messageActions';
import { MessageTypes } from '../../actions/messageActionTypes';
import { hashCode } from '../../helpers/keyGenerator';
import { RootState } from '../../store';
import {
    messageBackgroundColor,
    messageErrorColor,
    messageSuccessColor,
} from '../../styles/colors';

interface MessageBoxProps {
    visible: boolean;
}

const MessageBox = styled.div<MessageBoxProps>`
    display: flex;
    flex-direction: column;
    z-index: 99; // on top of everything
    transform: translateX(-50%); // centered
    position: fixed;
    top: 10%;
    left: ${({ visible }) => (visible ? '50%' : '-50%')}; // starts outside of view
    width: 300px;
    padding: 10px;
    background-color: ${messageBackgroundColor};
    border: 2px solid ${(props) => props.theme.accentColor};

    transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const MessageHeader = styled.div`
    display: flex;
    align-items: center;
`;

const MessageTitle = styled.span`
    transform: translateX(-50%); // centered
    position: absolute;
    left: 50%;
    margin: 20px auto;
    font-weight: 1000;
    color: ${(props) => props.theme.accentColor};
`;

const MessageClose = styled.span`
    margin-left: auto;
    color: ${(props) => props.theme.accentColor};

    &:hover {
        cursor: pointer;
    }
`;

const MessageBullet = styled.span`
    margin-right: 5px;
    color: ${(props) => props.theme.accentColor};
`;

const Message = styled.div`
    display: flex;
    margin: 10px 0;
`;

export default (): ReactElement => {
    const msgState = useSelector((state: RootState) => state.messageReducer);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(closeMessage());
    };

    const theme: { accentColor: string } = { accentColor: messageSuccessColor };
    if (msgState.messageType === MessageTypes.Error) {
        theme.accentColor = messageErrorColor;
    } else {
        theme.accentColor = messageSuccessColor;
    }

    return (
        <ThemeProvider theme={theme}>
            <MessageBox visible={msgState.showMessage}>
                <MessageHeader>
                    <MessageTitle>
                        {msgState.messageType === MessageTypes.Error ? 'ERROR' : 'SUCCESS'}
                    </MessageTitle>
                    <MessageClose>
                        <FontAwesomeIcon icon={faTimesCircle} onClick={onClick} />
                    </MessageClose>
                </MessageHeader>
                <div>
                    {msgState.messages.map((msg) => (
                        <Message key={hashCode(msg)}>
                            <MessageBullet>
                                <FontAwesomeIcon icon={faCaretRight} />
                            </MessageBullet>
                            <div>{msg}</div>
                        </Message>
                    ))}
                </div>
            </MessageBox>
        </ThemeProvider>
    );
};
