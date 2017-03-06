const React = require('react');
const Todo = require('Todo');

class TodoList extends React.Component{

    render() {
        const {todos} = this.props;

        const renderTodos = () => {
            if(todos.length){
                return todos.map((todo) => {
                    return (
                        <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
                    );
                });
            } else {
                return <p className="container__message">Nothing To Do</p>
            }
        };
        return (
            <div>
                {renderTodos()}
            </div>
        )
    }
}

module.exports = TodoList;