// ====== Referencias y estado ======
const catalog = document.querySelector('#catalogo');
const cart    = document.querySelector('#carrito');
const body    = document.body;

const state = { cart: [] }; // fuente de verdad


// ====== Vista (creación de nodos UI) ======
function createCartItemNode(title, id) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.itemId = String(id);

  const titleEl = document.createElement('h2');
  titleEl.textContent = String(title).trim();

  const btnDel = document.createElement('button');
  btnDel.type = 'button';
  btnDel.className = 'remove';
  btnDel.textContent = 'X';

  // Emite intención de eliminar (target + bubbles)
  btnDel.addEventListener('click', () => {
    btnDel.dispatchEvent(
      new CustomEvent('producto:eliminado', {
        detail: { id },
        bubbles: true
      })
    );
  });

  card.append(titleEl, btnDel);
  return card;
}


// ====== Catálogo: SOLO emite intención de agregar ======
catalog.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id][data-nombre]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const nombre = btn.dataset.nombre;

  // cancelable: true → el controlador global puede vetar con preventDefault()
  const ok = btn.dispatchEvent(
    new CustomEvent('producto:agregado', {
      detail: { id, nombre },
      bubbles: true,
      cancelable: true
    })
  );

  if (!ok) {
    // bloqueado por el controlador global (por ejemplo, límite alcanzado)
    console.warn('Agregado cancelado por el controlador global');
  }
});


// ====== Controlador global (body): muta estado y actualiza UI ======

// Agregar
body.addEventListener('producto:agregado', (e) => {
  const { id, nombre } = e.detail;

  // Regla: no duplicar por id
  if (state.cart.some(p => p.id === id)) return;

  // Regla de negocio: límite máximo (ej. 3)
  if (state.cart.length >= 3) {
    e.preventDefault();
    console.log('Límite alcanzado (máximo 3 ítems)');
    return;
  }

  // Muta estado
  state.cart.push({ id, nombre });

  // Render incremental (solo el ítem agregado)
  cart.append(createCartItemNode(nombre, id));

  // Notificar total actualizado
  body.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { count: state.cart.length },
    bubbles: true
  }));
});

// Eliminar
body.addEventListener('producto:eliminado', (e) => {
  const { id } = e.detail;

  // Muta estado
  const idx = state.cart.findIndex(p => p.id === id);
  if (idx === -1) return;
  state.cart.splice(idx, 1);

  // Quitar solo ese nodo del DOM
  cart.querySelector(`.card[data-item-id="${id}"]`)?.remove();

  // Notificar total actualizado
  body.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { count: state.cart.length },
    bubbles: true
  }));
});

// Listener del total actualizado (puedes conectar badges/headers, etc.)
body.addEventListener('cart:updated', (e) => {
  console.log('Carrito actualizado. Total:', e.detail.count);
});
