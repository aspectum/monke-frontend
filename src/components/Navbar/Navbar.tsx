import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { RootState } from '../../store';
import './Navbar.scss';

export default function Navbar(): ReactElement {
    const username = useSelector((state: RootState) => state.authReducer.user?.username);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(signOut());
    };

    return (
        <nav className="navbar">
            <span className="logo">Logo</span>
            <span className="logged-user">Welcome, {username}</span>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon-sign-out" onClick={onClick} />
        </nav>
    );
}
