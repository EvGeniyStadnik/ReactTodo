let expect = require('expect');
let df = require('deep-freeze-strict');

let reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            let action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'some text'
            };
            let state = '';

            let res = reducers.searchTextReducer(df(state), df(action));
            expect(res).toBe('some text');
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted true/false', () => {
            let action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            let res = reducers.showCompletedReducer(df(false), df(action));
            expect(res).toBe(true);
        });
    });
});