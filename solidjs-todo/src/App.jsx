import { batch, createEffect, createSignal } from "solid-js";
import { createLocalStore, removeIndex } from "./utils";
import { TodoList } from "./components/TodoList";

function App() {
  const [taskList, setTaskList] = createLocalStore("taskList", []);

  const [newTask, setNewTask] = createSignal("");

  createEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate
    batch(() => {
      setTaskList(taskList.length, {
        id: Date.now(),
        task: newTask(),
        isCompleted: false,
      });
      setNewTask("");
    });
  };

  const toggleCompleted = (e, task) => {
    setTaskList(task.id, task.isCompleted, e.currentTarget.value);
  };

  const deleteTask = (id) => {
    const index = taskList.findIndex((task) => task.id === id);
    taskList.splice(index, 1);
    setTaskList([...taskList]);
  };

  const handleEdit = (task) => {
    const editedTaskText = prompt("Edit task:", task.task);

    if (editedTaskText !== null) {
      const updatedTaskList = taskList.map((t) =>
        t.id === task.id ? { ...t, task: editedTaskText } : t,
      );
      setTaskList(updatedTaskList);
    }
  };

  return (
    <>
      <main>
        <h1 className="title">My Todo App</h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            id="taskInput"
            className="todo__input"
            type="text"
            placeholder="Enter a new task"
            value={newTask()}
            onInput={(e) => setNewTask(e.currentTarget.value)}
          />
          <button className="button button--primary">Add</button>
        </form>
        <TodoList
          taskList={taskList}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          handleEdit={handleEdit}
        />
      </main>
      <footer className="footer">
        <p className="footer__p">To-Do app made with React JS!</p>
      </footer>
    </>
  );
}

export default App;
