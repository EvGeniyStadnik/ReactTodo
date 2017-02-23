
module.exports = {
    setTodos(todos){
        if(Object.prototype.toString.call(todos) === '[object Array]'){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    },
    getTodos(){
        let stringTodos = localStorage.getItem('todos');
        let todos = [];

        try {
            todos = JSON.parse(stringTodos);
        } catch (e){

        }

        return {}.toString.call(todos) === '[object Array]' ? todos : [];
    }
};