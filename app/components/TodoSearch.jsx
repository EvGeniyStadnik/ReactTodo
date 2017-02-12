const React = require('react');

class AddTodo extends React.Component{
    constructor(props){
        super(props);
    }

    handleSearch = () => {
        let showCompleted = this.refs.showCompleted.checked;
        let searchText = this.refs.searchText.value;

        this.props.onSearch(showCompleted, searchText);
    };

    render(){
        return(
            <div>
                <div>
                    <input type="text" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
                </div>
                <div>
                    <lable>
                        <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>
                        Show Completed
                    </lable>
                </div>
            </div>
        )
    }
}

module.exports = AddTodo;









