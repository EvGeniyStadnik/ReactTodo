const React = require('react');
const moment = require('moment');

class Todo extends React.Component{
    toggleCheckbox = () => {
        this.props.onToggle(this.props.id)
    };
    render(){
        const {text, id, completed, createdAt, completedAt} = this.props;
        let renderDate = () => {
            let message = completed == false ? 'Created at: ' : 'Completed at: ';
            let timestamp = completed == false ? createdAt : completedAt;

            return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a');
        };
        return (
            <div onClick={this.toggleCheckbox}>
                <input type="checkbox" checked={completed}/>
                <p>{text}</p>
                <p>{renderDate()}</p>
            </div>
        )
    }
}

module.exports = Todo;