const btn = document.getElementById("btn-cambiar");
const btnAdd = document.getElementById("btn-agregar");
const btnReset = document.getElementById("btn-reset");
const btnFocus = document.getElementById("btn-focus");
const inputPid = document.getElementById("pid");
const container = document.getElementById("contenedor");

const initialHTML = container.innerHTML;

const containerNodeList = container.querySelectorAll("p");

let count = container.querySelectorAll("p").length;
let activeChange = false;

for (let i = 0; i < containerNodeList.length; i++) {
  containerNodeList[i].dataset.pid = i;
}

inputPid.setAttribute("max", containerNodeList.length);

btn.addEventListener("click", () => {
  const parrafos = container.querySelectorAll("p");
  activeChange = true;
  if (parrafos.length < 3) {
    console.warn("Faltan parrafos");
    return;
  }

  parrafos[1].textContent = "Se cambio el texto del segundo parrafo bro";
  parrafos[parrafos.length - 1].classList.add("resaltado");
  console.log("Total: parrafos", parrafos.length);
});

btnAdd.addEventListener("click", () => {
  const parrafos = container.querySelectorAll("p");

  parrafos[parrafos.length - 1].classList.remove("resaltado");
  count += 1;

  const el = document.createElement("p");
  el.dataset.pid = count - 1;
  el.textContent = `Párrafo nuevo ${count}`;
  activeChange ? el.classList.add("resaltado") : null;
  container.append(el);
  inputPid.max = container.querySelectorAll("p").length;
});

btnReset.addEventListener("click", () => {
  container.innerHTML = initialHTML;
  activeChange = false;
  count = container.querySelectorAll("p").length;
  inputPid.max = container.querySelectorAll("p").length;
  inputPid.value = "";
});

btnFocus.addEventListener("click", () => {
  for (let i = 0; i < container.querySelectorAll("p").length; i++) {
    const list = container.querySelectorAll("p");
    const tempValue = inputPid.value - 1;
    list[i].classList.remove("resaltado");

    if (tempValue === i) {
      list[i].classList.add("resaltado");
    }
  }
});