const $form = document.querySelector("#form");
const $input = document.querySelector("#text");
const $list = document.querySelector("#list");

const state = {
  todos: [],
  todoId: 1,
};

const toggleCheck = (target) => {
  const id = target.querySelector("input").dataset.tid;
  const numId = Number(id);
  const p = target.querySelector("p");
  const todoFind = state.todos.find((t) => t.id === numId);
  if (!todoFind) return;
  todoFind.check = !todoFind.check;

  todoFind.check ? (p.className = "textchecked") : (p.className = "");
};

const remove = (target) => {
  const id = target.querySelector("input").dataset.tid;
  const numId = Number(id);
  const todoFind = state.todos.findIndex((t) => t.id === numId);
  if (todoFind !== -1) {
    state.todos.splice(todoFind, 1);
    const listTodo = $list.querySelectorAll("div");

    listTodo.forEach((todo) => {
      const identify = todo.querySelector("input").dataset.tid;
      if (Number(identify) === numId) {
        todo.remove();
        return;
      }
    });
  }
};

const creteCard = (textTodo) => {
  const numId = Number(state.todoId++);
  const div = document.createElement("div");
  div.className = "contentTodo";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.dataset.tid = String(numId);
  check.checked = false;

  const p = document.createElement("p");
  p.textContent = textTodo;

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.className = "remove";
  btnDelete.textContent = "X";

  state.todos.push({ title: textTodo, id: numId, check: false });

  div.append(check, p, btnDelete);

  return div;
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.focus();

  const textTodo = $input.value.trim();
  if (!textTodo) return;
  const fragment = document.createDocumentFragment();
  fragment.append(creteCard(textTodo));
  $list.append(fragment);

  $input.value = "";
});

$list.addEventListener("click", (e) => {
  const targetCheck = e.target.closest("input[data-tid]");
  const targetBtnDelete = e.target.closest("button.remove");
  const targetdiv = e.target.closest("div");

  if (targetCheck) {
    toggleCheck(targetdiv);
  }

  if (targetBtnDelete) {
    remove(targetdiv);
  }
});
