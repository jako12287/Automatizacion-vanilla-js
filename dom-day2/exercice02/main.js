const list = document.querySelector("#list");
const btnAdd = document.querySelector("#add");

Array.from(list.children).forEach((li, idx) => {
  li.dataset.pid = String(idx + 1);
});

let count = list.children.length;

btnAdd.addEventListener("click", () => {
  count += 1;
  const li = document.createElement("li");
  li.dataset.pid = String(count);
  const btnEdit = document.createElement("button");
  btnEdit.className = "edit";
  btnEdit.type = "button";
  btnEdit.textContent = "✏️";
  const btnDelete = document.createElement("button");
  btnDelete.className = "remove";
  btnDelete.type = "button";
  btnDelete.textContent = "❌";

  li.textContent = `Elemento ${count}`;
  li.append(btnEdit);
  li.append(btnDelete);
  list.append(li);
});

list.addEventListener("click", (el) => {
  const target = el.target;

  if (target.matches(".remove")) {
    const label = target.closest("li")?.firstChild?.nodeValue?.trim();
    target.closest("li").remove();
    console.log(`Eliminado: ${label}`);
    return;
  }

  if (target.matches(".edit")) {
    let texValue = target.closest("li")?.firstChild?.nodeValue.trim();
    target.closest("li")?.firstChild?.remove();
    const inputEdit = document.createElement("input");
    inputEdit.classList.add("inputedit");
    inputEdit.value = texValue;
    target.closest("li").prepend(inputEdit);
    inputEdit.focus();
    inputEdit.addEventListener("keydown", (key) => {
      if (key.code !== "Enter") return;

      texValue = inputEdit.value;

      inputEdit.remove();
      target.closest("li").prepend(texValue);
    });
    return;
  }
  if (!target.matches(".edit") || !target.matches(".remove")) {
    return;
  }
});
