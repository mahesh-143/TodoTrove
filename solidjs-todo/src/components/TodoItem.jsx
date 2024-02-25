export const TodoItem = (props) => {
  return (
    <li
      classList={`${
        props.task.isCompleted
          ? "todo_list__item flex task__completed"
          : "todo_list__item flex"
      }`}
    >
      <div classList="flex">
        <input
          type="checkbox"
          classList="todo__checkbox"
          checked={props.task.isCompleted}
          onChange={() => props.toggleCompleted(props.task)}
        />
        <label htmlFor="todoCheckBox" classList="todo__checkbox__label ">
          {props.task.task}
        </label>
      </div>
      <div classList="todo__cta flex">
        <button
          classList="button button--secondary"
          data-action="edit"
          onClick={() => props.handleEdit(props.task)}
        ></button>
        <button
          classList="button button--destructive"
          onClick={() => props.deleteTask(props.task.id)}
        ></button>
      </div>
    </li>
  );
};
