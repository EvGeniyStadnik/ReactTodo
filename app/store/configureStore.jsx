// let redux = require('redux');
import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, addTodoReducer} from 'reducers';

export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: addTodoReducer
    });

    let store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtention ? window.devToolsExtention() : f => f
    ));

    return store;
};










