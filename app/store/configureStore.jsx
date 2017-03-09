let redux = require('redux');
const {searchTextReducer, showCompletedReducer, addTodoReducer} = require('reducers');

export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: addTodoReducer
    });

    let store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtention ? window.devToolsExtention() : f => f
    ));

    return store;
};










