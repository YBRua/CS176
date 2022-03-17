import { SHOWMODE_ACTIVE, SHOWMODE_ALL, SHOWMODE_COMPLETED } from '../App';
import { NavLink } from '@modern-js/runtime/router';

export function Footer(props) {
  const { numTodos, numCompleted, showMode, clearCompleted } = props;

  let quantifier = numTodos === 1 ? 'item' : 'items';
  let clearCompletedBtn;

  if (numCompleted > 0) {
    clearCompletedBtn = (
      <button className="clear-completed" onClick={clearCompleted}>
        Clear Completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {numTodos} {quantifier} left
      </span>
      <ul className="filters">
        <li>
          <NavLink exact={true} to="/" activeClassName="selected">
            All
          </NavLink>
        </li>
        <li>
          <NavLink to="/active" activeClassName="selected">
            Active
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed" activeClassName="selected">
            Completed
          </NavLink>
        </li>
      </ul>
      {clearCompletedBtn}
    </footer>
  );
}
