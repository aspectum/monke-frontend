import React, { ReactElement } from 'react';
import NewAlertButton from '../../components/NewAlertButton/NewAlertButton';
import NewAlertModal from '../../components/NewAlertModal/NewAlertModal';
import AlertDetais from '../../containers/AlertDetais/AlertDetais';
import AlertList from '../../containers/AlertList/AlertList';
import './Dasboard.scss';

function Dashboard(): ReactElement {
    return (
        <>
            <NewAlertModal>
                <nav className="navbar">
                    <div className="logo">Logo</div>
                    <div className="logged-user">Welcome, user</div>
                </nav>
                <div className="content">
                    <div className="container">
                        <div className="side-bar">
                            <NewAlertButton />
                            <AlertList />
                        </div>
                        <AlertDetais />
                    </div>
                </div>
            </NewAlertModal>
        </>
    );
}

export default Dashboard;
