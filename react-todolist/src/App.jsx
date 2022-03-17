import React, { useState } from 'react';
import { Switch, Route } from '@modern-js/runtime/router';

import { TodoItem } from './components/TodoItem';
import { Main } from './components/Main';
import { TodoManager } from './todoManager';
import { Todo } from './todo';
import { getId } from './utils';

import './App.css';

const SHOWMODE_ALL = 0;
const SHOWMODE_ACTIVE = 1;
const SHOWMODE_COMPLETED = 2;

export function App(props) {
  const [showMode, setShowMode] = useState(SHOWMODE_ALL);
  const [editorText, setEditorText] = useState('');
  const [currentEditing, setCurrentEditing] = useState(null);
  const [todos, setTodos] = useState([]);

  function onUserKeyDown(event) {
    if (event.code != 'Enter') {
      return;
    }

    if (editorText) {
      let todosCopy = Array.from(todos);
      todosCopy.push(new Todo(getId(), editorText));
      setTodos(todosCopy);
      setEditorText('');
    }
  }

  function onUserInputChange(event) {
    setEditorText(event.target.value);
  }

  function toggleAll(event) {
    let mode = event.target.checked;
    let todosCopy = [];
    for (const todo of todos) {
      todosCopy.push(new Todo(todo.id, todo.content, mode));
    }
    setTodos(todosCopy);
  }

  function toggleCompleted(todo) {
    setTodos(
      todos.map(td => {
        return todo === td ? new Todo(td.id, td.content, !td.completed) : td;
      }),
    );
  }

  function deleteTodo(todo) {
    setTodos(
      todos.filter(td => {
        return td.id !== todo.id;
      }),
    );
  }

  function updateTodo(todo, content) {
    let newtodos = todos.map(td =>
      td.id === todo.id ? new Todo(td.id, content, td.completed) : td,
    );
    setTodos(newtodos);
    setCurrentEditing(null);
  }

  function enableEdit(todo) {
    setCurrentEditing(todo.id);
  }

  function disableEdit(todo) {
    setCurrentEditing(null);
  }

  let todosToRender = todos.filter(function (todo) {
    switch (showMode) {
      case SHOWMODE_ALL:
        return true;
      case SHOWMODE_ACTIVE:
        return !todo.completed;
      case SHOWMODE_COMPLETED:
        return todo.completed;
    }
  });

  let todoItems = todosToRender.map(todo => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        editing={todo.id === currentEditing}
        onToggle={toggleCompleted.bind(this, todo)}
        onDelete={deleteTodo.bind(this, todo)}
        onEnableEdit={enableEdit.bind(this, todo)}
        onSave={updateTodo.bind(this, todo)}
        onDisableEdit={disableEdit.bind(this)}
      />
    );
  });

  let main;
  if (todos.length) {
    main = (
      <section className="main">
        <input
          onChange={toggleAll}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">{todoItems}</ul>
      </section>
    );
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <div>
          <div className="todoapp">
            <header className="header">
              <h1>todos</h1>
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={editorText}
                onChange={onUserInputChange}
                onKeyDown={onUserKeyDown}
                autoFocus={true}
              />
            </header>
            {main}
          </div>
          <footer className="info">
            <p>Double-click to edit a todo</p>
            <p>Created by YBiuR</p>
            <p>
              Part of <a href="http://todomvc.com">TodoMVC</a>
            </p>
          </footer>
        </div>
      </Route>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  );
}

export default App;
