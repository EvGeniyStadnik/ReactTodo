let React = require('react');
let {connect} = require('react-redux');
let actions = require('actions');

export class AddTodo extends React.Component{
    constructor(props){
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let {dispatch} = this.props;
        let todoText = this.refs.todoText.value;

        if(todoText.length > 0 && todoText.trim()){
            this.refs.todoText.value = '';
            dispatch(actions.startAddTodo(todoText));
        } else {
            this.refs.todoText.value = '';
            this.refs.todoText.focus();
        }
    };
    render(){
        return (
            <div className="container__footer">
                <form onSubmit={this.handleSubmit}>
                    <input ref="todoText" type="text" placeholder="What do you need to do?"/>
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddTodo);