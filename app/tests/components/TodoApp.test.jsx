let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let configureStore = require('configureStore');
let TodoApp = require('TodoApp');
import TodoList from 'TodoList';

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render TodoList', () => {
        let store = configureStore.configure();
        let provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp/>
            </Provider>
        );

        let todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        let todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

        expect(todoList.length).toEqual(1);
    });
});
