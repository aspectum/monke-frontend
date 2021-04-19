import React, { ReactElement } from 'react';
import styled from 'styled-components';
import NewAlertForm from '../../components/NewAlertForm/NewAlertForm';
import AlertDetais from '../../containers/AlertDetais/AlertDetais';
import AlertList from '../../containers/AlertList/AlertList';
import Modal from '../../containers/Modal/Modal';
import Navbar from '../../containers/Navbar/Navbar';
import NewAlertButton from '../../containers/NewAlertButton/NewAlertButton';
import { dashboardBackgroundColor, dashboardContainerColor } from '../../styles/colors';

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    background-color: ${dashboardBackgroundColor};
    margin: 0;
`;

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 80%;
    margin: auto;
    background-color: ${dashboardContainerColor};
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
`;

const Sidebar = styled.div`
    width: 250px;
    position: relative;
    flex-shrink: 0;
`;

const BorderUnderlay = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    box-sizing: border-box;
    border-right: 1px solid #fff;

    z-index: 1;
`;

function Dashboard(): ReactElement {
    return (
        <>
            <Modal component={<NewAlertForm />}>
                <>
                    <Navbar />
                    <Content>
                        <Container>
                            <Sidebar>
                                <NewAlertButton />
                                <BorderUnderlay />
                                <AlertList />
                            </Sidebar>
                            <AlertDetais />
                        </Container>
                    </Content>
                </>
            </Modal>
        </>
    );
}

export default Dashboard;
