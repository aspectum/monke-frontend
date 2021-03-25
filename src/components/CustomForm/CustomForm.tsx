/* eslint-disable react/no-access-state-in-setstate */
import React, { Component, ReactElement } from 'react';

// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children/32371612#32371612
// https://stackoverflow.com/questions/27864951/how-to-access-childs-state-in-react/27875018#27875018
// https://stackoverflow.com/questions/53688899/typescript-and-react-children-type/57253387#57253387

interface Props {
    children: React.ReactNode[];
    onSubmit: (fields: Object) => void;
}

type State = {
    renderedChildren: ReactElement[];
    fields: Object;
};

class CustomForm extends Component<Props, State> {
    state: any = {
        renderedChildren: [],
        fields: {},
    };

    componentDidMount() {
        const fields: any = {};

        // Rendering the children
        const renderedChildren = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                if ((child.type as React.FunctionComponent).name === 'TextInput') {
                    fields[child.props.id] = child.props.value || ''; // Saving to store in Form state
                }
                return React.cloneElement(child, {
                    ...child.props,
                    value: child.props.value || '', // empty string in case no value was given
                    onChange: this.handleFieldChange,
                });
            }
            return child;
        }) as ReactElement[];

        this.setState({ renderedChildren, fields });
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.fields);
    };

    // This is called by the children (TextInput) onChange
    handleFieldChange = (id: string, value: string) => {
        this.setState({ fields: { ...this.state.fields, [id]: value } });
    };

    render() {
        if (this.state.renderedChildren) {
            return <form onSubmit={this.handleSubmit}>{this.state.renderedChildren}</form>;
        }
        return <div>test</div>;
    }
}

export default CustomForm;
