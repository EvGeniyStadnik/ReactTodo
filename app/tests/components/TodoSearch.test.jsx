let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let TestUtils = require('react-addons-test-utils');

let TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with entered input text', () => {
        let spy = expect.createSpy();

        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

        todoSearch.refs.searchText.value = 'asdf';

        TestUtils.Simulate.change(todoSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(false, 'asdf');
    });

    it('should call onSearch with proper checked value', () => {
        let spy = expect.createSpy();

        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

        todoSearch.refs.showCompleted.checked = true;

        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });

    it('should call handleSearch and call onSearch with proper checked value', () => {
        let spy = expect.createSpy();

        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        todoSearch.refs.showCompleted.checked = true;

        todoSearch.handleSearch();

        expect(spy).toHaveBeenCalledWith(true, '');
    });

});
































