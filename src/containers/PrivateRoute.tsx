/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { RootState } from '../store';

interface Props extends Omit<RouteProps, 'component'> {
    component: React.ElementType;
}

const PrivateRoute = ({ component: Component, ...rest }: Props): ReactElement => {
    const auth = useSelector((state: RootState) => state.authReducer);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isLoading) {
                    return (
                        <div style={{ margin: 'auto' }}>
                            <Spinner width={200} height={200} />
                        </div>
                    );
                }
                if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
