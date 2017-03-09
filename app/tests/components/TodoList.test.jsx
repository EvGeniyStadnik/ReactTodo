let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each toto item', () => {
        let todos = [{
            id: 1,
            text: 'Do something',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }, {
            id: 2,
            text: 'Check mail',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }];
        //return store with initialState = todos;
        let store = configure({
            todos  //pass initialState to the createStore
        });
        let provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList/>
            </Provider>
        );
        let todoList = TestUtils.findRenderedComponentWithType(provider, ConnectedTodoList);
        let todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todoComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        let todos = [];
        let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

        let el = ReactDOM.findDOMNode(todoList);

        let emptyMessage = el.querySelectorAll('.container__message').length;

        expect(emptyMessage).toBe(1);
    });
});
