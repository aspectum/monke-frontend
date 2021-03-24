import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNewAlertModal } from '../../actions/modalActions';
import { RootState } from '../../store';
import './Modal.scss';

interface Props {
    children: ReactElement;
    component: ReactElement;
}

function Modal({ children, component }: Props): ReactElement {
    const isShowing = useSelector((state: RootState) => state.modalReducer).showNewAlertModal;
    const dispatch = useDispatch();

    // Closes modal if clicking outside window
    const onClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).classList[0] === 'modal-bg') {
            dispatch(hideNewAlertModal());
        }
    };

    return (
        <>
            <div className={`modal-bg ${isShowing ? 'visible' : ''}`} onClick={onClick}>
                <div className="modal-window">{component}</div>
            </div>
            <div className="modal-overflow-wrapper">
                <div className={`modal-content-wrapper ${isShowing ? 'visible' : ''}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Modal;
