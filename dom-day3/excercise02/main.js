const catalog = document.querySelector("#catalog");
const body = document.querySelector("body");

const dataRamdom = [
  { name: "Laptop Gamer ASUS ROG", price: 4200 },
  { name: 'Monitor Curvo Samsung 27"', price: 1200 },
  { name: "Teclado Mecánico Logitech G Pro", price: 650 },
  { name: "Mouse Inalámbrico Razer Basilisk X", price: 380 },
  { name: "SSD NVMe 1TB Kingston Fury", price: 720 },
  { name: "Auriculares HyperX Cloud II", price: 520 },
  { name: "Smartphone Samsung Galaxy S24", price: 4100 },
  { name: "Tablet iPad Air 5ta Gen", price: 3500 },
  { name: "Smartwatch Huawei GT 4", price: 1100 },
  { name: "Tarjeta Gráfica NVIDIA RTX 4070", price: 5200 },
];

const products = [
  { name: "Monitor 27''", price: 1200 },
  { name: "Teclado Mecánico", price: 350 },
  { name: "Mouse RGB", price: 150 },
  { name: "Laptop Gamer", price: 4200 },
];

let loadData = false;

const loadCatalog = () => {
  const fragment = document.createDocumentFragment();
  loadData = true;

  products.forEach((prod, idx) => {
    const divContainer = document.createElement("div");
    divContainer.className = "card";
    divContainer.dataset.pid = idx + 1;
    const spanName = document.createElement("span");
    spanName.textContent = prod.name;
    const spanPrice = document.createElement("span");
    spanPrice.classList = "price";
    spanPrice.textContent = `$ ${prod.price}`;
    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "remove";
    btnDelete.textContent = "X";

    divContainer.append(spanName, spanPrice, btnDelete);
    fragment.append(divContainer);
  });

  return fragment;
};

const createButton = () => {
  const btnAdd = document.createElement("button");
  btnAdd.type = "button";
  btnAdd.className = "add";
  btnAdd.textContent = "Agregar";
  body.prepend(btnAdd);
};

const deleteItem = (item, element) => {
  item.closest(String(element)).remove();
  console.log("Se elimina el item # ", item.closest(element).dataset.pid);
  if (catalog.querySelectorAll("div").length === 0) {
    console.log("Catalogo vacio");
  }
};

const addNewItem = () => {
  const newItemRandom =
    dataRamdom[Math.floor(Math.random() * dataRamdom.length)];
  products.push(newItemRandom);
  catalog.textContent = "";
  catalog.append(loadCatalog());
};

body.addEventListener("click", (ev) => {
  const target = ev.target;

  if (target.matches("#load")) {
    if (loadData) return;
    createButton();
    catalog.append(loadCatalog());
  }

  if (target.matches(".remove")) {
    deleteItem(target, "div");
  }

  if (target.matches(".add")) {
    addNewItem();
  }
});
