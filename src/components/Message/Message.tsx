import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../actions/messageActions';
import { MessageTypes } from '../../actions/messageActionTypes';
import { hashCode } from '../../helpers/keyGenerator';
import { RootState } from '../../store';
import './Message.scss';

function Message(): ReactElement {
    const msgState = useSelector((state: RootState) => state.messageReducer);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(closeMessage());
    };

    return (
        <div
            className={`message-box ${msgState.showMessage ? 'showing' : ''} ${
                msgState.messageType === MessageTypes.Error ? 'error' : 'success'
            }`}
        >
            <div className="message-header">
                <span id="message-title">
                    {msgState.messageType === MessageTypes.Error ? 'ERROR' : 'SUCCESS'}
                </span>
                <FontAwesomeIcon icon={faTimesCircle} id="close-message" onClick={onClick} />
            </div>
            <div className="messages">
                {msgState.messages.map((msg) => (
                    <p key={hashCode(msg)}>
                        <span className="bullet">* </span>
                        {msg}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Message;
