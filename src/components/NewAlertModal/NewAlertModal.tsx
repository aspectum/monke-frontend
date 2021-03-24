import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
import { hideNewAlertModal } from '../../actions/modalActions';
import { RootState } from '../../store';
import './NewAlertModal.scss';

interface Props {
    isShowing: boolean;
    children: ReactElement;
    hideNewAlertModal: () => void;
    createNewAlert: (url: string, targetPrice: number) => void;
}
interface State {
    'na-url': string;
    'na-price': string;
}

class NewAlertModal extends Component<Props, State> {
    state = {
        'na-url': '',
        'na-price': '',
    };

    onClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLDivElement).classList[0] === 'modal-bg') {
            this.props.hideNewAlertModal();
        }
    };

    // Handles form submission
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.createNewAlert(this.state['na-url'], +this.state['na-price']);
    };

    // Updates the state with the inputs
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any);
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
                        <form onSubmit={this.onSubmit}>
                            <div className="form-new-alert">
                                <label htmlFor="na-url" id="na-url-label">
                                    Amazon URL:
                                </label>
                                <input
                                    type="text"
                                    name="na-url"
                                    id="na-url"
                                    onChange={this.onChange}
                                />
                                <label htmlFor="na-price" id="na-price-label">
                                    Target Price:
                                </label>
                                <input
                                    type="text"
                                    name="na-price"
                                    id="na-price"
                                    onChange={this.onChange}
                                />
                                <button className="btn-add-alert" type="submit">
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
    createNewAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlertModal);
