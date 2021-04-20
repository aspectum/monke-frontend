import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../../actions/authActions';
import { RootState } from '../../store';
import { navbarBackgroundColor } from '../../styles/colors';

const NavContainer = styled.nav`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 60px;
    background-color: ${navbarBackgroundColor};
    font-size: 1.8rem;
`;

const Logo = styled.span`
    position: absolute;
    margin: 20px auto;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    font-weight: 700;
`;

const LoggedUser = styled.span`
    margin-left: auto;
`;

const IconSignOut = styled.span`
    margin: 0 20px;
    cursor: pointer;
`;

export default function Navbar(): ReactElement {
    const username = useSelector((state: RootState) => state.authReducer.user?.username);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(signOut());
    };

    return (
        <NavContainer>
            <Logo>monke</Logo>
            <LoggedUser>Welcome, {username}</LoggedUser>
            <IconSignOut>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={onClick} />
            </IconSignOut>
        </NavContainer>
    );
}
