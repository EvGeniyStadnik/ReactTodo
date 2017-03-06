let expect = require('expect');
let actions = require('actions');

describe('Actions', () => {
    it('should generate search text action', () => {
        let action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some text'
        };
        let res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate add todo action', () => {
        let action = {
            type: 'ADD_TODO',
            text: 'added text'
        };
        let res = actions.addTodo(action.text);

        expect(res).toEqual(action);
    });

    it('should generate Toggle Show Completed action', () => {
        let action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };
        let res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('should generate Toggle Todo action', () => {
        let action = {
            type: 'TOGGLE_TODO',
            id: 1
        };
        let res = actions.toggleTodo(1);

        expect(res).toEqual(action);
    });
});