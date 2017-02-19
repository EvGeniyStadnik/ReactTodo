let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let Todo = require('Todo');

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should call onToggle prop with id on click', () => {

        let spy = expect.createSpy();

        let todoData = {
            id: 111,
            text: 'Leave mail on porch',
            completed: true
        };
        let todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);

        let el = ReactDOM.findDOMNode(todo);
        TestUtils.Simulate.click(el);
        //todo.toggleCheckbox();

        expect(spy).toHaveBeenCalledWith(111);
    });
});