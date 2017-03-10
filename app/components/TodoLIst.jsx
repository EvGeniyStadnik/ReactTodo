const React = require('react');
const TodoAPI = require('TodoAPI');
const {connect} = require('react-redux');
import Todo from 'Todo';

export class TodoList extends React.Component{

    render() {
        const {todos, showCompleted, searchText} = this.props;

        const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        const renderTodos = () => {
            if(filteredTodos.length){
                return filteredTodos.map((todo) => {
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
        return state;
    }
)(TodoList);