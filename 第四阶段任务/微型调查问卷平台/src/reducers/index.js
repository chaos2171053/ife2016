import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import status from './status';
import questionnaires from './questionnaires';
const rootReducer = combineReducers({
    questionnaires:questionnaires,
    status:status,
    router: routerReducer,
});

export default rootReducer;