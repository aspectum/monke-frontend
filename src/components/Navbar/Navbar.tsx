import React, { ReactElement } from 'react';
import './Navbar.scss';

export default function Navbar(): ReactElement {
    return (
        <nav className="navbar">
            <div className="logo">Logo</div>
            <div className="logged-user">Welcome, user</div>
        </nav>
    );
}
