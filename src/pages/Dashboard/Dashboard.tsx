import React, { ReactElement } from 'react';
import AlertDetais from '../../containers/AlertDetais/AlertDetais';
import AlertList from '../../containers/AlertList/AlertList';
import './Dasboard.scss';

function Dashboard(): ReactElement {
    return (
        <>
            <nav className="navbar">
                <div className="logo">Logo</div>
                <div className="logged-user">Welcome, user</div>
            </nav>
            <div className="content">
                <div className="container">
                    <AlertList />
                    <AlertDetais />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
