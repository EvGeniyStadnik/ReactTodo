const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

const AddTodo = require('AddTodo');
const TodoList = require('TodoList');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');

class TodoApp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showCompleted: false,
            searchText: '',
            todos: TodoAPI.getTodos()
        }
    }

    componentDidUpdate() {
        TodoAPI.setTodos(this.state.todos);
    }

    handleAddTodo = (text) => {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ]
        });
    };

    handleToggle = (id) => {
        let updatedTodos = this.state.todos.map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined;
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
        console.log(showCompleted, searchText);
        const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        return(
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        )
    }
}

module.exports = TodoApp;
