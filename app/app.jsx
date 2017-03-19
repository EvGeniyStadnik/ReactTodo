const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
const TodoAPI = require('TodoAPI');
import Login from 'Login';

// import './../examples/firebase/index';

//Redux
let actions = require('actions');
let store = require('configureStore').configure();

//get all todoItems from firebase and pass it to the store
store.dispatch(actions.startAddTodos());

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={Login}/>
                <Route path="todos" component={TodoApp}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
