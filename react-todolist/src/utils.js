const ID_STORAGE_KEY = 'todo-list-ids';
const TODO_STORAGE_KEY = 'todo-list';

export function getId() {
  let id = localStorage.getItem(ID_STORAGE_KEY);
  if (!id) {
    localStorage.setItem(ID_STORAGE_KEY, 0);
    id = 0;
  } else {
    id = parseInt(id);
  }
  localStorage.setItem(ID_STORAGE_KEY, id + 1);

  return id;
}

export function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  // console.log('saved');
}

export function loadTodos() {
  let todos = localStorage.getItem(TODO_STORAGE_KEY);
  // console.log(todos);
  if (!todos) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }
  return todos;
}
