import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
require('./styles/style.scss');

// Render the main component into the dom
ReactDOM.render(<Calendar />, document.getElementById('calendar-containner'));
