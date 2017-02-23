let expect = require('expect');

let TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    // afterEach(() => {
    //     localStorage.removeItem('todos');
    // });
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            let todos = [{
                id: 123,
                text: 'test',
                completed: false
            }];
            TodoAPI.setTodos(todos);

            let actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(todos).toEqual(actualTodos);
        });

        it('should not set invalid todos', () => {
            let wrongTodos = {a: 1};

            TodoAPI.setTodos(wrongTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        })
    });

    describe('getTodos', () => {
        it('should return empty array if localStorage empty', () => {

            let wrongTodos = TodoAPI.getTodos();

            expect(wrongTodos).toEqual([]);
        });

        it('should return todo if valid array in localStorage', () => {

            let validTodos = [{
                a: 1
            }];
            localStorage.setItem('todos', JSON.stringify(validTodos));

            let actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(validTodos);
        });
    });
});