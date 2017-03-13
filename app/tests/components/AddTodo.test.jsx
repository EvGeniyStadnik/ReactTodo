let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let {AddTodo} = require('AddTodo');
import * as actions from 'actions';

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should dispatch ADD_TODO when valid todo text', () => {
        let spy = expect.createSpy();

        let todoText = 'Evgeniy';
        let action = actions.startAddTodo(todoText);

        let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        let el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit(el.querySelector('form'));

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should not dispatch ADD_TODO when invalid todo text', () => {
        let spy = expect.createSpy();

        let todoText = '';

        let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        let el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit(el.querySelector('form'));

        expect(spy).toNotHaveBeenCalled();
    });
});





