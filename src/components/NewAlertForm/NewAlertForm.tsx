import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
// import ButtonSubmit from '../CustomForm/ButtonSubmit';
// import CustomForm from '../CustomForm/CustomForm';
// import TextInput from '../CustomForm/TextInput';
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
    // const onSubmit = (fields: any) => {
    //     dispatch(createNewAlert(fields['na-url'], +fields['na-price']));
    // };

    // Updates the state with the inputs
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ [e.target.name]: e.target.value } as any);
    };

    console.log('rendering');

    return (
        // <CustomForm className="form-new-alert" onSubmit={onSubmit}>
        //     <TextInput id="na-url" label="Amazon URL:" />
        //     <TextInput id="na-price" label="Target Price:" />
        //     <ButtonSubmit className="btn-add-alert" text="Add Alert" />
        // </CustomForm>
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
