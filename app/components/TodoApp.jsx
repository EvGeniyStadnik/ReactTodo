const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

import AddTodo from 'AddTodo';
import TodoList from 'TodoList'
import TodoSearch from 'TodoSearch';
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

        return(
            <div>

                <h1 className="page-title">Todo App</h1>

                <div className="row">
                    <div className="column small-centered medium-6 large-5">
                        <div className="container">
                            <TodoSearch/>
                            <TodoList/>
                            <AddTodo onAddTodo={this.handleAddTodo}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports = TodoApp;
