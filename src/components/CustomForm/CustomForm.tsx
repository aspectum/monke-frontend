/* eslint-disable react/no-access-state-in-setstate */
import React, { Component, ReactElement } from 'react';

// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children/32371612#32371612
// https://stackoverflow.com/questions/27864951/how-to-access-childs-state-in-react/27875018#27875018
// https://stackoverflow.com/questions/53688899/typescript-and-react-children-type/57253387#57253387

interface Props {
    children: React.ReactNode[];
    onSubmit: (fields: Object) => void;
    className?: string;
}

interface AdditionalProps {
    value?: string;
    onChange?: (id: string, value: string) => void;
}

type State = {
    renderedChildren: ReactElement[];
    fields: Object;
};

export class CustomForm extends Component<Props, State> {
    state: any = {
        renderedChildren: [],
        fields: {},
    };

    componentDidMount() {
        const fields: any = {};

        // Rendering the children
        const renderedChildren = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                const additionalProps: AdditionalProps = {};
                const childName = (child.type as React.FunctionComponent).name;
                if (childName === 'TextInput' || childName === 'CurrencyInput') {
                    const childValue = child.props.value || ''; // empty string in case no value was given
                    fields[child.props.id] = childValue; // Saving to store in Form state
                    additionalProps.value = childValue;
                    additionalProps.onChange = this.handleFieldChange;
                }
                return React.cloneElement(child, {
                    ...child.props,
                    ...additionalProps,
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
            return (
                <form className={this.props.className || ''} onSubmit={this.handleSubmit}>
                    {this.state.renderedChildren}
                </form>
            );
        }
        return <div>test</div>;
    }
}
