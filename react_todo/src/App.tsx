import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";

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
