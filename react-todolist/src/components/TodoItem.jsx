import React, { useState } from 'react';
import classNames from 'classnames';

export function TodoItem(props) {
  const [completed, setCompleted] = useState(props.todo.completed);

  // I feel sad. useState is not returning true;
  if (completed !== props.todo.completed) {
    setCompleted(props.todo.completed);
  }

  const [editing, setEditing] = useState(props.editing);

  let todoClassNames = classNames({
    completed: completed,
    editing: editing,
  });

  return (
    <li className={todoClassNames}>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>{props.todo.content}</label>
        <button className="destroy"></button>
      </div>
      <input type="text" className="edit" />
    </li>
  );
}
