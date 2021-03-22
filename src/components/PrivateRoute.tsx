/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RootState } from '../store';

interface Props extends Omit<RouteProps, 'component'> {
    component: React.ElementType;
}

function PrivateRoute({ component: Component, ...rest }: Props): ReactElement {
    const auth = useSelector((state: RootState) => state.authReducer);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isLoading) {
                    return <h2>Loading</h2>; // TODO: MAKE THIS BETTER
                }
                if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />;
                }
                return <Component {...props} />;
            }}
        />
    );
}

export default PrivateRoute;
