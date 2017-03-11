import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import {createStore} from 'redux'
import rootReducer from './reducers/index'
// import store from './stores/store'
// Render the main component into the dom
const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));