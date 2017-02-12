let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo if todo item entered', () => {
        let spy = expect.createSpy();

        let todoText = 'Evgeniy';

        let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        let el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit(el.querySelector('form'));

        expect(spy).toHaveBeenCalledWith(todoText);
    });

    it('should not call onAddTodo if todo item not entered', () => {
        let spy = expect.createSpy();

        let todoText = '';

        let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        let el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit(el.querySelector('form'));

        expect(spy).toNotHaveBeenCalled();
    });
});





