import { combineReducers, createStore } from 'redux';
import userReducer from './userReducer';

export default () => {
    const store = createStore(
        combineReducers({
            userDetails: userReducer
        })
    )

    return store;
}