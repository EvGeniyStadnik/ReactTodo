let React = require('react');

class AddTodo extends React.Component{
    constructor(props){
        super(props);
    }
    onClick = () => {
        if(this.refs.todoItem.value.trim()){
            this.props.onAddTodo(this.refs.todoItem.value);
            this.refs.todoItem.value = '';
        }
    };
    render(){
        return (
            <div>
                <input ref="todoItem" type="text"/>
                <button onClick={this.onClick}>Add Todo</button>
            </div>
        )
    }
}

module.exports = AddTodo;