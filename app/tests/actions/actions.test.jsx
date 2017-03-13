import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
let expect = require('expect');

let actions = require('actions');

let createMockStore = configureMockStore([thunk]);

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
            todo: {
                id: 1234,
                text: 'text',
                completed: false,
                completedAt: null,
                createdAt: 1234213
            }
        };
        let res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({});
        const todoText = 'My todo item';
//we returned promise chain from func() that startAddTodo() returned
        store.dispatch(actions.startAddTodo(todoText)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            expect(actions[0].todo).toInclude({
                text: todoText
            });
            done();
        }).catch(done);
    });

    it('should generate ADD_TODOS action object with todos array', () => {
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
        let res = actions.addTodos(todos);
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