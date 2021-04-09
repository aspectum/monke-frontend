import React, { ReactElement } from 'react';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
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
                    <Navbar />
                    <div className="content">
                        <div className="container">
                            <div className="side-bar">
                                <NewAlertButton />
                                <div className="border-underlay" />
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
