import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Switch } from 'react-router-dom'
import rootReducer from './reducers/index'
// import { App, Header, Home, Main, Edit, Login } from './containers/index';

import { App, Login, MainLayout, Home, New } from './containers/index';


const history = createHistory()
const middleware = routerMiddleware(history)

// const store = createStore(
//     combineReducers({
//         rootReducer,
//         router: routerReducer
//     }),
//     // applyMiddleware(middleware)
//     compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )
let store
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
    combineReducers({
        rootReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)
} else {
    store = createStore(
        combineReducers({
            rootReducer,
            router: routerReducer
        }),
        // applyMiddleware(middleware)
        compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
}
// <Switch>
//                     <Route exact path="/" component={Login} />
//                     <Main>
//                         <div>
//                             <Route exact path="/home" component={Home} />
//                         </div>
//                     </Main>
//                     {/*<App>
//                     <div>
//                         <Route exact path="/home" component={Home} />
//                         <Route path="/edit" component={Edit} />
//                         {/* <Route path="/fill" component={Fill} />
//                 <Route path="/check" component={Check} >
//                     </div>
//                 </App>*/}

//                 </Switch>
ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <MainLayout>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/new" component={New} />
                    </MainLayout>
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>, document.getElementById('app'));
