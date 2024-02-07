import React from "react";
import { TodoItem } from "./TodoItem";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

type TodoListProps = {
  taskList: Todo[];
  toggleCompleted: (task: Todo) => void;
  deleteTask: (id: number) => void;
  handleEdit: (task: Todo) => void;
};

export const TodoList = (props: TodoListProps) => {
  return (
    <div>
      <ul id="todo__list">
        {props.taskList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleCompleted={props.toggleCompleted}
            deleteTask={props.deleteTask}
            handleEdit={props.handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};
