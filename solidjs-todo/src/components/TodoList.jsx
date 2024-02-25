import { For } from "solid-js";
import { TodoItem } from "./TodoItem";

export const TodoList = (props) => {
  return (
    <div>
      <ul id="todo__list">
        <For each={props.taskList}>
          {(task) => (
            <TodoItem
              key={task.id}
              task={task}
              toggleCompleted={props.toggleCompleted}
              deleteTask={props.deleteTask}
              handleEdit={props.handleEdit}
            />
          )}
        </For>
      </ul>
    </div>
  );
};
