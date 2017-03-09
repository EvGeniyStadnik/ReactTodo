const React = require('react');
const {connect} = require('react-redux');
import Todo from 'Todo';

export class TodoList extends React.Component{

    render() {
        const {todos} = this.props;

        const renderTodos = () => {
            if(todos.length){
                return todos.map((todo) => {
                    return (
                        <Todo key={todo.id} {...todo} />
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

export default connect(
    (state) => {
        return {
            todos: state.todos
        }
    }
)(TodoList);