import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {
	Provider
} from 'react-redux';
import configureStore from './stores/configureStore';

const store = configureStore();
let elem = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>,
	elem
)