import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
import './NewAlertForm.scss';

interface State {
    'na-url': string;
    'na-price': string;
}

const initialState: State = {
    'na-url': '',
    'na-price': '',
};

function NewAlertForm(): ReactElement {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    // Handles form submission
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createNewAlert(state['na-url'], +state['na-price']));
    };

    // Updates the state with the inputs
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ [e.target.name]: e.target.value } as any);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-new-alert">
                <label htmlFor="na-url" id="na-url-label">
                    Amazon URL:
                </label>
                <input type="text" name="na-url" id="na-url" onChange={onChange} />
                <label htmlFor="na-price" id="na-price-label">
                    Target Price:
                </label>
                <input type="text" name="na-price" id="na-price" onChange={onChange} />
                <button className="btn-add-alert" type="submit">
                    Add Alert
                </button>
            </div>
        </form>
    );
}

export default NewAlertForm;
