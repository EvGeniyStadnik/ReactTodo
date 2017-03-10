let expect = require('expect');
let moment = require('moment');
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

    describe('addTodoReducer - ADD_TODO, ADD_TODOS', () => {
        it('should add new Todo item in array', () => {
            let action = {
                type: 'ADD_TODO',
                text: 'some text'
            };
            let res = reducers.addTodoReducer(df(''), df(action));

            expect(res.length).toBe(1);
            expect(res[0].text).toBe('some text');
        });
        it('should add existing todos array', () => {
            let todos = [{
                id: 111,
                text: 'anything',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            let action = {
                type: 'ADD_TODOS',
                todos
            };
            let res = reducers.addTodoReducer(df([]), df(action));

            expect(res.length).toBe(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });

    describe('addTodoReducer - TOGGLE_TODO', () => {
        it('should update array of Todos in completed(true/false) / completedAt(moment().unix()/undefined)', () => {
            let action = {
                type: 'TOGGLE_TODO',
                id: 345
            };
            let state = [
                {
                    id: 234,
                    text: 'someText1',
                    completed: false,
                    createdAt: 123,
                    completedAt: undefined
                },{
                    id: 345,
                    text: 'someText2',
                    completed: false,
                    createdAt: 456,
                    completedAt: undefined
                }
            ];
            let res = reducers.addTodoReducer(df(state), df(action));

            expect(res[1].completed).toBe(true);
            expect(res[1].completedAt).toBe(moment().unix());
        });
    });
});