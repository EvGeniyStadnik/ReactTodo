let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should add todo to the todos state on handleAddTodo', () => {
        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        todoApp.handleAddTodo('asdf');

        let todoText = todoApp.state.todos[todoApp.state.todos.length - 1].text;

        expect(todoText).toBe('asdf');
    });
    it('should toggle completed value when handleToggle called', () => {
        let todoData = {
            text: 'test features',
            id: 11,
            completed: false
        };
        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(false);

        todoApp.handleToggle(11);

        expect(todoApp.state.todos[0].completed).toBe(true);
    });
});
