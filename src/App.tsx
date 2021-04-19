import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { verifyUser } from './actions/authActions';
import Message from './containers/Message/Message';
import PrivateRoute from './containers/PrivateRoute';
import dispatchFromStore from './helpers/dispatchFromStore';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import store from './store';
import { FontStyle } from './styles/FontStyle';
import { GlobalStyle } from './styles/GlobalStyle';

class App extends Component {
    componentDidMount() {
        dispatchFromStore(verifyUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Normalize />
                <GlobalStyle />
                <FontStyle />
                <Router>
                    <Message />
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
