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

    describe('filterTodos', () => {

        let todos = [{
            id: 123,
            text: 'asdf',
            completed: true
        },{
            id: 456,
            text: 'werwq',
            completed: false
        }],
        searchText = '',
        showCompleted = '';

        it('should show all todos if showCompleted == true', () => {
            showCompleted = true;

            let filteredTodosArray = TodoAPI.filterTodos(todos, showCompleted, searchText);
            expect(filteredTodosArray.length).toBe(2);
        });

        it('should NOT show all todos if showCompleted == false', () => {
            showCompleted = false;

            let filteredTodosArray = TodoAPI.filterTodos(todos, showCompleted, searchText);
            expect(filteredTodosArray.length).toBe(1);
        });

        it('should sort by completed status', () => {
            showCompleted = true;

            let filteredTodosArray = TodoAPI.filterTodos(todos, showCompleted, searchText);
            //not completed todo will be first
            expect(filteredTodosArray[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            showCompleted = true;
            searchText = 'Asdf';
            let searchedTodos = TodoAPI.filterTodos(todos, showCompleted, searchText.toLowerCase());

            expect(searchedTodos[0].text).toBe('asdf');
        });

        it('should return all todos if searchText is empty', () => {//---------
            showCompleted = true;
            searchText = '  ';
            let searchedTodos = TodoAPI.filterTodos(todos, showCompleted, searchText.toLowerCase());

            expect(searchedTodos.length).toBe(2);
        });//----------

        it('should filter todos by searchText - not found matches', () => {
            showCompleted = true;
            searchText = 'ffff';
            let searchedTodos = TodoAPI.filterTodos(todos, showCompleted, searchText.toLowerCase());

            expect(searchedTodos).toEqual([]);
        });
    });
});