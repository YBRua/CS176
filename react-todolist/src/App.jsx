import React, { useState } from 'react';
import { Switch, Route } from '@modern-js/runtime/router';

import { TodoList } from './components/TodoList';

import './App.css';

export const SHOWMODE_ALL = 0;
export const SHOWMODE_ACTIVE = 1;
export const SHOWMODE_COMPLETED = 2;

export function App(props) {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/:filter?" component={TodoList}></Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by YBiuR</p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
