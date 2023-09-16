class Todo {
  constructor(id, task, completed = false) {
    this.id = id;
    this.task = task;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  editTask(newTask) {
    this.task = newTask;
  }
}

export default Todo;

