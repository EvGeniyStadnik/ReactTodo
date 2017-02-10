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

        let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        let el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoItem.value = 'Evgeniy';
        TestUtils.Simulate.click(el.querySelector('button'));

        expect(spy).toHaveBeenCalledWith('Evgeniy');
    });
});





