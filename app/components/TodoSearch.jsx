const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export class TodoSearch extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {dispatch, showCompleted, searchText} = this.props;
        return(
            <div className="container__header">
                <div>
                    <input type="text" ref="searchText" value={searchText} placeholder="Search todos" onChange={() => {
                        let searchText = this.refs.searchText.value;
                        dispatch(actions.setSearchText(searchText));
                    }}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                            dispatch(actions.toggleShowCompleted());
                        }}/>
                        Show Completed
                    </label>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            showCompleted: state.showCompleted,
            searchText: state.searchText
        }
    }
)(TodoSearch);









