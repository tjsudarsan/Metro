import { combineReducers, createStore } from 'redux';
import userReducer from './userReducer';
import tempReducer from './tempReducer';

export default () => {
    const store = createStore(
        combineReducers({
            userDetails: userReducer,
            tempDetails: tempReducer
        })
    )

    return store;
}