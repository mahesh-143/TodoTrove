class TodoList {
    constructor() {
        this.todos = [];
    }

    save() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    clearTodos() {
        this.todos = []
        this.save()
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.save()
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.save()
    }

    clearCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completed);
    }
}

export default TodoList;

