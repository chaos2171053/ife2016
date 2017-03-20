import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import rootReducer from './reducers/index'
import { App, Header, Home, Main, Edit, Login } from './containers/index';

import { Switch } from 'react-router-dom'



const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({
        rootReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)
ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>

            <Switch>
                <Route exact path="/" component={Login} />
                <App>
                    <div>
                        <Route exact path="/home" component={Home} />
                        <Route path="/edit" component={Edit} />
                        {/* <Route path="/fill" component={Fill} />
                <Route path="/check" component={Check} >*/}
                    </div>
                </App>
            </Switch>

        </ConnectedRouter>
    </Provider>, document.getElementById('app'));
