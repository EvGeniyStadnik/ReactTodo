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
                todo: {
                    id: 1234,
                    text: 'text',
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: null
                }
            };
            let res = reducers.addTodoReducer(df([]), df(action));

            expect(res.length).toBe(1);
            expect(res[0].text).toBe('text');
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

    describe('addTodoReducer - UPDATE_TODO', () => {
        it('should update array of Todos in completed(true/false) / completedAt(moment().unix()/undefined)', () => {
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
            let updates = {
                completed: true,
                completedAt: 1234
            };
            let action = {
                type: 'UPDATE_TODO',
                id: state[1].id, //345
                updates
            };
            let res = reducers.addTodoReducer(df(state), df(action));

            expect(res[1].completed).toBe(updates.completed); //true
            expect(res[1].completedAt).toBe(action.updates.completedAt); //1234
            expect(res[1].text).toEqual(state[1].text);
        });
    });

    describe('addTodoReducer - LOGOUT - remove all todos array from memory', () => {
        it('should remove all Todos and return empty array when logout', () => {
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
            let action = {
                type: 'LOGOUT'
            };
            let res = reducers.addTodoReducer(df(state), df(action));

            expect(res.length).toBe(0);
        });
    });

    describe('addTodoReducer - REMOVE_TODO - remove todo from db', () => {
        it('should remove one item todo (founded by id) and return array without that todo', () => {
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
            let action = {
                type: 'REMOVE_TODO',
                id: state[0].id //234
            };

            let res = reducers.addTodoReducer(df(state), df(action));
            expect(res.length).toBe(1);
            expect(res[0].id).toBe(345);
        });
    });

    describe('authReducer', () => {
        it('should add to state auth object.uid: firebase.auth().user.uid when user login', () => {
            let action = {
                type: 'LOGIN',
                uid: '12345'
            };
            let state = {
                uid: action.uid
            };
            let res = reducers.authReducer(undefined, df(action));

            expect(res).toEqual(state);
        });
        it('should add to state auth empty Object: firebase.auth().user = null when user logout', () => {
            let action = {
                type: 'LOGOUT'
            };
            let state = {
                uid: '12345'
            };
            let res = reducers.authReducer(df(state), df(action));

            expect(res).toEqual({});
        });
    });
});