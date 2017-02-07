const React = require('react');

class Todo extends React.Component{
    render(){
        const {text, id} = this.props;

        return (
            <div>
                {id}. {text}
            </div>
        )
    }
}

module.exports = Todo;