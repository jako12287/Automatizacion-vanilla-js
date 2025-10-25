const catalog = document.querySelector("#catalogo");
const cart = document.querySelector("#carrito");
const body = document.body;

const state = { cart: [] };

const createCart = (title = "", id) => {
  const card = document.createElement("div");
  card.dataset.itemId = id;
  const titleCard = document.createElement("h2");
  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.textContent = "X";
  titleCard.textContent = title.trim();
  card.className = "card";

  card.append(titleCard, btnDelete);
  return card;
};

catalog.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id][data-nombre]");
  if (!btn) return;

  const { id, nombre } = btn.dataset;
  const idNum = Number(id);

  const ev = new CustomEvent("producto:agregado", {
    detail: { id: idNum, nombre },
    bubbles: true,
  });

  const isExist = state.cart.some((i) => i.id === idNum);

  if (isExist) return;

  state.cart.push({ id: idNum, nombre });

  btn.dispatchEvent(ev);
});

body.addEventListener("producto:agregado", (e) => {
  console.log("Producto agregado:", e.detail.nombre);
  cart.textContent = "";
  const fragment = document.createDocumentFragment();
  state.cart.forEach((item) => {
    const newItem = createCart(item.nombre, item.id);
    fragment.append(newItem);
  });

  cart.append(fragment);
});
