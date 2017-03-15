
module.exports = {
    filterTodos(todos, showCompleted, searchText){
        let filteredTodos = todos;

        //Filter by showCompleted
        filteredTodos = filteredTodos.filter((item) => {
            return !item.completed || showCompleted;
        });

        //Filter by searchText
        filteredTodos = filteredTodos.filter((todo) => {
            return todo.text.toLowerCase().indexOf(searchText) !== -1 || searchText.trim() === '';
        });

        //Sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if(!a.completed && b.completed){
                return -1;
            } else if (a.completed && !b.completed){
                return 1;
            } else {
                return 0;
            }
        });
        return filteredTodos;
    }
};