import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import status from './status'
const rootReducer = combineReducers({
    status:status,
    router: routerReducer
});

export default rootReducer;