import React, { Component } from 'react';

// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children/32371612#32371612
// https://stackoverflow.com/questions/27864951/how-to-access-childs-state-in-react/27875018#27875018
// https://stackoverflow.com/questions/53688899/typescript-and-react-children-type/57253387#57253387
// RENDER PROPS

interface Props {
    children: (arg: Function) => React.ReactElement;
    onSubmit: (fields: Object) => void;
    className?: string;
}

type State = {
    fields: Object;
};

export class CustomForm extends Component<Props, State> {
    state: State = {
        fields: {},
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.fields);
    };

    // This is called by the children (TextInput) onChange
    handleFieldChange = (id: string, value: string) => {
        // Calling setState this way prevents using outdated state when 2 calls are made in quick succession
        this.setState((prevState) => {
            return { fields: { ...prevState.fields, [id]: value } };
        });
    };

    render() {
        return (
            <form className={this.props.className || ''} onSubmit={this.handleSubmit}>
                {this.props.children(this.handleFieldChange)}
            </form>
        );
    }
}
