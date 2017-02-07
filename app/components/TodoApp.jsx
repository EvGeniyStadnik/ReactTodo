const React = require('react');
const TodoList = require('TodoList');

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

    render(){
        const {todos} = this.state;

        return(
            <div>
                <TodoList todos={todos}/>
            </div>
        )
    }
}

module.exports = TodoApp;
