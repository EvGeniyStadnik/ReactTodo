import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
let expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
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

    it('should generate UPDATE_TODO action', () => {
        let updates = {
            completed: false,
            completedAt: null
        };
        let action = {
            type: 'UPDATE_TODO',
            id: 1,
            updates
        };
        let res = actions.updateTodo(action.id, updates);

        expect(res).toEqual(action);
    });

    describe('Tests with firebase todos', () => {
        let uid = '1san34o3f8434nlwvn';
        let todosRef;
        let todoRef;

        beforeEach((done) => {
            // var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);
            //
            // firebase.auth().signInWithCredential(credential).then((user) => {
            //     uid = user.uid;
            //     todosRef = firebaseRef.child(`users/${uid}/todos`);
            //
            //     return todosRef.remove();
            // }).then(() => {
            //     todoRef = todosRef.push();
            //
            //     return todoRef.set({
            //         text: 'Something to do',
            //         completed: false,
            //         createdAt: 23453453
            //     })
            // })
            // .then(() => done())
            // .catch(done);

            todosRef = firebaseRef.child(`users/${uid}/todos`);
            todoRef = todosRef.push({
                text: 'Something to do',
                completed: false,
                createdAt: 23453453
            }).then(() => done()).catch(done);
        });

        afterEach((done) => {
            todosRef.remove().then(() => done());
        });

        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startToggleTodo(todoRef.key, true); //completed - true/false; completedAt

            store.dispatch(action).then(() => {
                const mockActionsToggleTodo = store.getActions();

                expect(mockActionsToggleTodo[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: todoRef.key
                });
                expect(mockActionsToggleTodo[0].updates).toInclude({
                    completed: true
                });
                expect(mockActionsToggleTodo[0].updates.completedAt).toExist();

            }, done);
            done();
        });

        it('should fetch todos from firebase convert to array and dispatch ADD_TODOS action', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActionsAddTodos = store.getActions();

                expect(mockActionsAddTodos[0].type).toBe('ADD_TODOS');
                expect(mockActionsAddTodos[0].todos.length).toEqual(1);
                expect(mockActionsAddTodos[0].todos[0]).toInclude({
                    text: 'Something to do',
                    completed: true,
                    createdAt: 23453453
                });
                expect(mockActionsAddTodos[0].todos[0].completedAt).toExist();

            }, done);
            done();
        });

        it('should create todo and dispatch ADD_TODO through startAddTodo()-thunk', (done) => {
            const store = createMockStore({auth: {uid}});
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

        it('should remove todo item by startRemoveTodo()-thunk', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startRemoveTodo(todoRef.key);

            store.dispatch(action).then(() => {
                const mockActionsRemoveTodo = store.getActions();

                expect(mockActionsRemoveTodo[0].type).toBe('REMOVE_TODO');
                expect(mockActionsRemoveTodo[0].id).toBe(todoRef.key);
            }).catch(done);
            done();
        });
    });

    it('should generate login action object', () => {
        let action = {
            type: 'LOGIN',
            uid: '12345'
        };
        let res = actions.login(action.uid);

        expect(res).toEqual(action);
    });

    it('should generate logout action object', () => {
        let action = {
            type: 'LOGOUT'
        };
        let res = actions.logout();

        expect(res).toEqual(action);
    });
});