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

        let todoLastItem = todoApp.state.todos[todoApp.state.todos.length - 1];

        expect(todoLastItem.text).toBe('asdf');
        //Expect createdAt to be a number - date timestamp
        expect(todoLastItem.createdAt).toBeA('number');
    });
    it('should toggle completed value when handleToggle called', () => {
        let todoData = {
            text: 'test features',
            id: 11,
            completed: false,
            createdAt: undefined,
            completedAt: undefined
        };
        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(false);

        //checkbox checked - it mean that _todo (id=11) item completed == true
        todoApp.handleToggle(11);

        expect(todoApp.state.todos[0].completed).toBe(true);
        //if _todo completed == true - Expect -completedAt- to be a number(timestamp)
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    //Test that when toggle from true to false, completedAt get removed
    it('should removed -completedAt- when todo item completed - false: UNchecked', () => {
        let todoData = {
            text: 'test features',
            id: 12,
            completed: true, // !
            createdAt: undefined,
            completedAt: 21341234 // !
        };
        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(true);

        //checkbox UNchecked - it mean that _todo (id=12) item completed == false
        todoApp.handleToggle(12);

        expect(todoApp.state.todos[0].completed).toBe(false);
        //if _todo completed == false then -completedAt- number(timestamp) removed
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    });
});
