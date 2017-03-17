import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import calendar from "./calendar";
const rootReducer = combineReducers({
    calendar:calendar,
    router: routerReducer
});

export default rootReducer;