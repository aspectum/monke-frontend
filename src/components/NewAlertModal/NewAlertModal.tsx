import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { hideNewAlertModal } from '../../actions/modalActions';
import { RootState } from '../../store';
import './NewAlertModal.scss';

interface Props {
    isShowing: boolean;
    children: ReactElement;
    hideNewAlertModal: () => void;
}
interface State {}

class NewAlertModal extends Component<Props, State> {
    state = {};

    onClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).classList[0] === 'modal-bg') {
            this.props.hideNewAlertModal();
        }
    };

    render() {
        const { isShowing } = this.props;
        return (
            <>
                <div
                    className={`modal-bg test ${isShowing ? 'visible' : ''}`}
                    onClick={this.onClick}
                >
                    <div className="modal-window">
                        <form>
                            <div className="form-new-alert">
                                <label htmlFor="na-url" id="na-url-label">
                                    Amazon URL:
                                </label>
                                <input type="text" name="na-url" id="na-url" />
                                <label htmlFor="na-price" id="na-price-label">
                                    Target Price:
                                </label>
                                <input type="text" name="na-price" id="na-price" />
                                <button className="btn-add-alert" type="button">
                                    Add Alert
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-overflow-wrapper">
                    <div className={`modal-content-wrapper ${isShowing ? 'visible' : ''}`}>
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isShowing: state.modalReducer.showNewAlertModal,
});

const mapDispatchToProps = {
    hideNewAlertModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlertModal);
