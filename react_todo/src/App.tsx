import { useEffect, useState } from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

function App() {
  const [taskList, setTaskList] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("tasks");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim().length === 0) {
      alert("Please enter a value!");
      return;
    }
    const task: Todo = {
      id: Date.now(),
      task: newTask,
      isCompleted: false,
    };
    setTaskList([task, ...taskList]);
    setNewTask("");
  };

  const toggleCompleted = (task: Todo) => {
    const index = taskList.indexOf(task);
    task.isCompleted = !task.isCompleted;
    taskList.splice(index, 1, task);
    setTaskList([...taskList]);
  };

  const deleteTask = (id: number) => {
    const index = taskList.findIndex((task) => task.id === id);
    taskList.splice(index, 1);
    setTaskList([...taskList]);
  };

  const handleEdit = (task: Todo) => {
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
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Enter a new task"
          />
          <button className="button button--primary">Add</button>
        </form>
        <ul id="todo__list">
          {taskList.map((task) => (
            <li
              className={`${
                task.isCompleted
                  ? "todo_list__item flex task__completed"
                  : "todo_list__item flex"
              }`}
              key={task.id}
            >
              <div className="flex">
                <input
                  type="checkbox"
                  className="todo__checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleCompleted(task)}
                />
                <label
                  htmlFor="todoCheckBox"
                  className="todo__checkbox__label "
                >
                  {task.task}
                </label>
              </div>
              <div className="todo__cta flex">
                <button
                  className="button button--secondary"
                  data-action="edit"
                  onClick={() => handleEdit(task)}
                >
                  <BsPencil />
                </button>
                <button
                  className="button button--destructive"
                  onClick={() => deleteTask(task.id)}
                >
                  <BsTrash3Fill />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="footer">
        <p className="footer__p">To-Do app made with React JS!</p>
      </footer>
    </>
  );
}

export default App;
