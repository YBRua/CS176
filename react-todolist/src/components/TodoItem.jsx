import React, { useEffect, useState, useCallback } from 'react';

export function TodoItem(props) {
  const [completed, setCompleted] = useState(props.todo.completed);
  const [editing, setEditing] = useState(props.editing);
  const [editorText, setEditorText] = useState(props.todo.content);

  useEffect(() => {
    // update states
    setCompleted(props.todo.completed);
    setEditing(props.editing);

    // dumb solution to auto-focusing after double-click
    console.log(props.editing);
    if (props.editing) {
      console.log('Yo');
      let liElement = document.getElementById(`li-${props.todo.id}`);
      let inputElement = document.getElementById(`edit-${props.todo.id}`);
      liElement.classList.add('editing');
      inputElement.focus();
      inputElement.setSelectionRange(
        inputElement.value.length,
        inputElement.value.length,
      );
    }
  }, [props.todo.completed, props.editing]);

  function onUserInputChange(event) {
    setEditorText(event.target.value);
  }

  function todoSaveHandler() {
    // console.log('Blurred');
    let content = editorText.trim();
    if (content) {
      props.onSave(content);
      setEditorText(content);
    } else {
      props.onDelete();
    }
  }

  function keyDownHandler(event) {
    switch (event.code) {
      case 'Enter':
        todoSaveHandler();
        break;
      case 'Escape':
        setEditorText(props.todo.content);
        props.onDisableEdit();
        break;
    }
  }

  return (
    <li
      id={`li-${props.todo.id}`}
      className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={props.onToggle}
          checked={completed}
        />
        <label onDoubleClick={props.onEnableEdit}>{props.todo.content}</label>
        <button className="destroy" onClick={props.onDelete}></button>
      </div>
      <input
        type="text"
        id={`edit-${props.todo.id}`}
        className="edit"
        value={editorText}
        onChange={onUserInputChange}
        onBlur={todoSaveHandler}
        onKeyDown={keyDownHandler}
      />
    </li>
  );
}
