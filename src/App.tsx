import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { verifyUser } from './actions/authActions';
import './App.scss';
import dispatchFromStore from './helpers/dispatchFromStore';
import store from './store';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Message from './components/Message/Message';

class App extends Component {
    componentDidMount() {
        dispatchFromStore(verifyUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Message />
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
