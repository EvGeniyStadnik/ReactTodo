const React = require('react');

class Todo extends React.Component{
    toggleCheckbox = () => {
        this.props.onToggle(this.props.id)
    };
    render(){
        const {text, id, completed} = this.props;

        return (
            <div onClick={this.toggleCheckbox}>
                <input type="checkbox" checked={completed}/>
                {text}
            </div>
        )
    }
}

module.exports = Todo;