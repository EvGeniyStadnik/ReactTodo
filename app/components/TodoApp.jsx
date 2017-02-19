const React = require('react');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const uuid = require('node-uuid');

class TodoApp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showCompleted: false,
            searchText: '',
            todos: [
                {
                    id: uuid(),
                    text: 'Walk the dog',
                    completed: false
                }, {
                    id: uuid(),
                    text: 'Clean the yard',
                    completed: false
                }, {
                    id: uuid(),
                    text: 'Leave mail on porch',
                    completed: true
                }, {
                    id: uuid(),
                    text: 'Play video games',
                    completed: false
                }
            ]
        }
    }

    handleAddTodo = (text) => {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text,
                    completed: false
                }
            ]
        });
    };

    handleToggle = (id) => {
        let updatedTodos = this.state.todos.map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo
        });
        this.setState({todos: updatedTodos});
    };

    handleSearch = (showCompleted, searchText) => {
        console.log(showCompleted, searchText);
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    };

    render(){
        const {todos, showCompleted, searchText} = this.state;
        //console.log(showCompleted, searchText);
        return(
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos} onToggle={this.handleToggle}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        )
    }
}

module.exports = TodoApp;
