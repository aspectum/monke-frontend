/* eslint-disable react/no-access-state-in-setstate */
import React, { Component, ReactElement } from 'react';
import { TextInputProps } from './TextInput';

// https://stackoverflow.com/a/32371612

// MAYBE PUT STATE IN TEXTINPUT, AND CALL SETSTATE FROM HERE AND HAVE THIS BE STATELESS

interface Child extends Omit<ReactElement, 'props' | 'type'> {
    props: TextInputProps;
    type: {
        name: string;
    };
}

interface Props {
    children: Child[];
}
type State = any;

class CustomForm extends Component<Props, State> {
    state: State = {};

    componentDidMount() {
        const renderedChildren = this.props.children.map((child) => {
            console.log(child);
            const additionalProps: any = {};

            if (child.type.name === 'TextInput') {
                if (child.props.value) {
                    this.setState({ [child.props.id]: child.props.value } as any);
                } else {
                    this.setState({ [child.props.id]: '' } as any);
                }
                // additionalProps.value = (this.state as any)[child.props.id];
                additionalProps.name = child.props.id;
                additionalProps.onChange = this.onChange;
            }
            return (child.type as any)({ ...child.props, ...additionalProps });
        });
        this.setState({ renderedChildren });
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let index: any = null;
        let child: any = null;
        this.props.children.forEach((c, i) => {
            if (c.props.id === e.target.id) {
                index = i;
                child = c;
            }
        });
        if (child) {
            const additionalProps = {
                name: child.props.id,
                onChange: this.onChange,
                value: e.target.value,
            };
            const updatedChildren = this.state.renderedChildren;
            updatedChildren[index] = (child.type as any)({ ...child.props, ...additionalProps });
            this.setState({ ...this.state, renderedChildren: updatedChildren });
            this.setState({ [e.target.name]: e.target.value } as any);
        }
        console.log(e.target.value);
        console.log(this.state[e.target.name]);
    };

    render() {
        if (this.state.renderedChildren) {
            return this.state.renderedChildren;
        }
        return <div>test</div>;
    }
}

export default CustomForm;
