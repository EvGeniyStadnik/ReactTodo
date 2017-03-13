const uuid = require('node-uuid');
const moment = require('moment');

export let searchTextReducer = (state = '', action) => {
    switch (action.type){
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};
export let showCompletedReducer  = (state = false, action) => {
    switch (action.type){
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};
export let addTodoReducer = (state = [], action) => {
    switch (action.type){
        case "ADD_TODO":
            return [
                ...state,
                action.todo
            ];
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if(todo.id === action.id){
                    let newCompleted = !todo.completed;
                    return { // we have to create new object ot return (pure function!)
                        ...todo,
                        completed: newCompleted,
                        completedAt: newCompleted ? moment().unix() : undefined
                    }
                } else {
                    return todo;
                }
            });
        default:
            return state;
    }
};

