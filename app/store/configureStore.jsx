let redux = require('redux');
const {searchTextReducer, showCompletedReducer, addTodoReducer} = require('reducers');

export let configure = () => {
    let reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        addTodo: addTodoReducer
    });

    let store = redux.createStore(reducer, redux.compose(
        window.devToolsExtention ? window.devToolsExtention() : f => f
    ));

    return store;
};










