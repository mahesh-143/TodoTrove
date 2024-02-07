import React from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

type TodoItemProps = {
  task: Todo;
  toggleCompleted: (task: Todo) => void;
  deleteTask: (id: number) => void;
  handleEdit: (task: Todo) => void;
};

export const TodoItem = (props: TodoItemProps) => {
  return (
    <li
      className={`${
        props.task.isCompleted
          ? "todo_list__item flex task__completed"
          : "todo_list__item flex"
      }`}
    >
      <div className="flex">
        <input
          type="checkbox"
          className="todo__checkbox"
          checked={props.task.isCompleted}
          onChange={() => props.toggleCompleted(props.task)}
        />
        <label htmlFor="todoCheckBox" className="todo__checkbox__label ">
          {props.task.task}
        </label>
      </div>
      <div className="todo__cta flex">
        <button
          className="button button--secondary"
          data-action="edit"
          onClick={() => props.handleEdit(props.task)}
        >
          <BsPencil />
        </button>
        <button
          className="button button--destructive"
          onClick={() => props.deleteTask(props.task.id)}
        >
          <BsTrash3Fill />
        </button>
      </div>
    </li>
  );
};
