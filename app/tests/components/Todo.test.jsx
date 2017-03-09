let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

// let {Todo} = require('Todo');
import {Todo} from 'Todo';

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch TOGGLE_TODO action on click', () => {

        let spy = expect.createSpy();

        let todoData = {
            id: 111,
            text: 'Leave mail on porch',
            completed: true
        };
        let todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);

        let el = ReactDOM.findDOMNode(todo);
        TestUtils.Simulate.click(el);
        //todo.toggleCheckbox();

        expect(spy).toHaveBeenCalledWith({
            type: 'TOGGLE_TODO',
            id: 111
        });
    });
});