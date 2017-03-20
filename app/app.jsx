const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {hashHistory} = require('react-router');

import firebase from 'app/firebase/';
import router from 'app/router/';

//Redux
let actions = require('actions');
let store = require('configureStore').configure();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        hashHistory.push('/todos');
        console.log('firebase.auth().user.uid (state auth:)', store.getState().auth);
    } else {
        hashHistory.push('/');
        console.log('firebase.auth().user.uid (state auth:)', store.getState().auth);
    }
});

//get all todoItems from firebase and pass it to the store
store.dispatch(actions.startAddTodos());

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
