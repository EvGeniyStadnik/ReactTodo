let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let TodoList = require('TodoList');
let Todo = require('Todo');

describe('TodList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each toto item', () => {
        let todos = [{
            id: 1,
            text: 'Do something'
        }, {
            id: 2,
            text: 'Check mail'
        }];
        let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        let todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

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
