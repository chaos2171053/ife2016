import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import calendar from './calendar';
import status from './status'
const rootReducer = combineReducers({
    status:status,
    calendar:calendar,
    router: routerReducer
});

export default rootReducer;