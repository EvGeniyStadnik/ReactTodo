const React = require('react');
const moment = require('moment');

class Todo extends React.Component{
    toggleCheckbox = () => {
        this.props.onToggle(this.props.id)
    };
    render(){
        const {text, id, completed, createdAt, completedAt} = this.props;
        let todoClassName = completed ? 'todo todo-completed' : 'todo';
        let renderDate = () => {
            let message = completed == false ? 'Created at: ' : 'Completed at: ';
            let timestamp = completed == false ? createdAt : completedAt;

            return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a');
        };
        return (
            <div className={todoClassName} onClick={this.toggleCheckbox}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        )
    }
}

module.exports = Todo;