import moment from 'moment';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/'

export let setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    }
};

export let addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
};

export let startAddTodo = (text) => {
    return (dispatch, getState) => {
        let todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        let uid = getState().auth.uid;
        let todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
//return for debugger purpose
        return todoRef.then(() => {
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }))
        });
    };
};

export let toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED',
    }
};

export let addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    }
};

export let startAddTodos = () => {
    return (dispatch, getState) => {
        let uid = getState().auth.uid;
        let todosRef = firebaseRef.child(`users/${uid}/todos`).once('value');

        return todosRef.then((snapshot) => {
            console.log('snapshot.val() todos from firebase: ', snapshot.val());
            let todos = snapshot.val() || {};
            let arrTddos = [];
            for(let keyTodo in todos){
                todos[keyTodo].id = keyTodo;
                arrTddos.push(todos[keyTodo]);
            }
            console.log('parsed todos from firebase: ', arrTddos);
            dispatch(addTodos(arrTddos));
        }, (e) => {
            console.log(e.message);
        })
    }
};

export let updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    }
};

export let startToggleTodo = (id, completed) => {
    return (dispatch, getState) => {
        let uid = getState().auth.uid;
        let todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
        let updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };
        return todoRef.update(updates).then(() => {
            dispatch(updateTodo(id, updates));
        }).catch((e) => {
            console.log(e.message);
        });
    };
};

export let removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        id
    }
};
//Todo.jsx
export let startRemoveTodo = (id) => {
    return (dispatch, getState) => {
        let uid = getState().auth.uid;
        let todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);

        return todoRef.remove().then(() => {
            dispatch(removeTodo(id))
        }).catch((e) => {
            console.log(e.message);
        });
    }
};

export let login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    }
};

export let startLogin = () => {
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(githubProvider).then((result) => {
            console.log('Auth worked!', result);
        }, (error) => {
            console.log('Unable to auth', error);
        });
    };
};

export let logout = () => {
    return {
        type: 'LOGOUT'
    }
};

export let startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            dispatch(logout());
            console.log('Logged out!');
        });
    };
};

