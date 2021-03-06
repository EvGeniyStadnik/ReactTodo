const React = require('react');
const moment = require('moment');
const {connect} = require('react-redux');

let actions = require('actions');

//this export used only for test file: let {Todo} = require('Todo');
export class Todo extends React.Component{
    onRemoveTodo = (e) => {
        e.stopPropagation();
        const {id, dispatch} = this.props;

        dispatch(actions.startRemoveTodo(id));
    };
    render(){
        const {text, id, completed, createdAt, completedAt, dispatch} = this.props;

        let todoClassName = completed ? 'todo todo-completed' : 'todo';
        let renderDate = () => {
            let message = completed == false ? 'Created at: ' : 'Completed at: ';
            let timestamp = completed == false ? createdAt : completedAt;

            return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a');
        };
        return (
            <div className={todoClassName} onClick={() => {
                dispatch(actions.startToggleTodo(id, !completed));
            }}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div className="todo_text">
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
                <button onClick={this.onRemoveTodo} className="button todo_button__close">X</button>
            </div>
        )
    }
}
// this export is default: let Todo = require('Todo');
export default connect()(Todo);