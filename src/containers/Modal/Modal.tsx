import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { hideNewAlertModal } from '../../actions/modalActions';
import { RootState } from '../../store';
import { modalWindowBackgroundColor } from '../../styles/colors';

const ModalBackground = styled.div<{ visible: boolean }>`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 2;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    transition: opacity linear 1s;
`;

const ModalWindow = styled.div<{ visible: boolean }>`
    transition: top 0.5s;
    min-width: 400px;
    background-color: ${modalWindowBackgroundColor};
    padding: 50px;
    border-radius: 30px;
    box-shadow: 0 0 100px 10px black;
    position: fixed;
    top: ${({ visible }) => (visible ? '30%' : '-100%')};
    left: 50%;
    transform: translate(-50%, -50%);
`;

// preventing overflow from scale effect
const ModalOverflowWrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const ModalContentWrapper = styled.div<{ visible: boolean }>`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
    transition: all ease-in-out 0.2s;

    ${({ visible }) => {
        if (visible) {
            return `
                    filter: grayscale(80%) blur(7px);
                    transform: scale(1.03);
                `;
        }
        return '';
    }}
`;

interface Props {
    children: ReactElement;
    component: ReactElement;
}

function Modal({ children, component }: Props): ReactElement {
    const isShowing = useSelector((state: RootState) => state.modalReducer).showNewAlertModal;
    const dispatch = useDispatch();

    // Closes modal if clicking outside window
    const onClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).id === 'modal-bg') {
            dispatch(hideNewAlertModal());
        }
    };

    return (
        <>
            <ModalBackground id="modal-bg" visible={isShowing} onClick={onClick}>
                <ModalWindow visible={isShowing}>{component}</ModalWindow>
            </ModalBackground>
            <ModalOverflowWrapper>
                <ModalContentWrapper visible={isShowing}>{children}</ModalContentWrapper>
            </ModalOverflowWrapper>
        </>
    );
}

export default Modal;
