const React = require('react');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');

class TodoApp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            todos: [
                {
                    id: 1,
                    text: 'Walk the dog'
                }, {
                    id: 2,
                    text: 'Clean the yard'
                }, {
                    id: 3,
                    text: 'Leave mail on porch'
                }, {
                    id: 4,
                    text: 'Play video games'
                }
            ]
        }
    }

    handleAddTodo = (text) => {
        const arrTodos = this.state.todos;
        arrTodos.push({
            id: arrTodos.length + 1,
            text: text
        });
        this.setState({
            todos: arrTodos
        });
    };

    render(){
        const {todos} = this.state;

        return(
            <div>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        )
    }
}

module.exports = TodoApp;
