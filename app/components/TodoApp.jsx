const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

import AddTodo from 'AddTodo';
import TodoList from 'TodoList'
import TodoSearch from 'TodoSearch';

class TodoApp extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>

                <h1 className="page-title">Todo App</h1>

                <div className="row">
                    <div className="column small-centered medium-6 large-5">
                        <div className="container">
                            <TodoSearch/>
                            <TodoList/>
                            <AddTodo/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports = TodoApp;
