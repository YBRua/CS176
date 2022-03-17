const ID_STORAGE_KEY = 'todo-list-ids';

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
