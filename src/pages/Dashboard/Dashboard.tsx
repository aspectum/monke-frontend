import React, { ReactElement } from 'react';
import Modal from '../../components/Modal/Modal';
import NewAlertButton from '../../components/NewAlertButton/NewAlertButton';
import NewAlertForm from '../../components/NewAlertForm/NewAlertForm';
import AlertDetais from '../../containers/AlertDetais/AlertDetais';
import AlertList from '../../containers/AlertList/AlertList';
import './Dasboard.scss';

function Dashboard(): ReactElement {
    return (
        <>
            <Modal component={<NewAlertForm />}>
                <>
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
                </>
            </Modal>
        </>
    );
}

export default Dashboard;
