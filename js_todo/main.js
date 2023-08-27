import Todo from './models/todo.js';
import TodoList from './models/todolist.js';

const myTodoList = new TodoList();

const todoListContainer = document.getElementById('todo__list');

const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];


function clearTodoList() {
    while (todoListContainer.firstChild) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }
}

savedTodos.forEach(todoData => {
    const todo = new Todo(todoData.id, todoData.task, todoData.completed);
    myTodoList.addTodo(todo);
    renderTodo(todo);
});

function renderTodo(todo) {

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__list__item');
    todoItem.classList.add('flex')
    if (todo.completed) {
        todoItem.classList.add('task__completed');
    }

    todoItem.innerHTML = `<div class="flex">
            <input type="checkbox" class="todo__checkbox" ${todo.completed ? 'checked' : ''}>
                <label for="todoCheckBox" class="todo__checkbox__label">${todo.task}</label>
        </div>
        <div class="todo__cta flex">
            <button class="button button--secondary" data-action="edit"><i class="bi bi-pencil"></i></button>
            <button class="button button--destructive" data-action="delete">
        <i class="bi bi-trash3-fill"></i></button>
        </div>`

    const todoCheckbox = todoItem.querySelector(".todo__checkbox")


    todoCheckbox.addEventListener("change", () => {
        todo.toggleCompleted()
        todoItem.classList.toggle("task__completed")
        myTodoList.save()
    })

    const deleteButton = todoItem.querySelector("[data-action='delete']");
    deleteButton.addEventListener('click', () => {
        myTodoList.deleteTodo(todo.id);
        todoListContainer.removeChild(todoItem);
    });

    const editButton = todoItem.querySelector("[data-action='edit']")
    editButton.addEventListener("click", () => {
        const updatedTodo = prompt("Edit todo", todo.task)
        todo.editTask(updatedTodo)
        myTodoList.save()
        clearTodoList()
        myTodoList.todos.forEach(renderTodo);

    })

    todoListContainer.appendChild(todoItem);

}

const addButton = document.querySelector("[data-action='add-todo']")
const taskInput = document.getElementById("taskInput")

addButton.addEventListener("click", () => {
    const todo = taskInput.value
    if (todo) {
        const newTodo = new Todo(myTodoList.todos.length + 1, todo)
        myTodoList.addTodo(newTodo)
        renderTodo(newTodo)
        taskInput.value = ""
    }
})

const clearCompletedButton = document.querySelector('[data-action="delete-completed"]');
clearCompletedButton.addEventListener('click', () => {
    myTodoList.clearCompletedTodos();
    clearTodoList()
    myTodoList.save()
    myTodoList.todos.forEach(renderTodo);
});
