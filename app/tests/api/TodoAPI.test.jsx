let expect = require('expect');

let TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
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