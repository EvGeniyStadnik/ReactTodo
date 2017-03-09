const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

const TodoApp = require('TodoApp');

//Redux
let actions = require('actions');
let store = require('configureStore').configure();

store.subscribe(() => {
    let state = store.getState();
    console.log('currentState: ', state);
});
store.dispatch(actions.addTodo('New Todo item'));
store.dispatch(actions.setSearchText('text'));
store.dispatch(actions.toggleShowCompleted());

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('app')
);
