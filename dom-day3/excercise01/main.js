const $list = document.getElementById('list');
const $log  = document.getElementById('log');

const log = (msg) => $log.textContent += msg + '\n';
const clearList = () => { $list.textContent = ''; };

// 1) Ingenuo: 100 createElement + append uno por uno
document.getElementById('render-naive').addEventListener('click', () => {
  clearList();
  const t0 = performance.now();

  for (let i = 1; i <= 100; i++) {
    const li = document.createElement('li');
    li.className = 'item';
    li.textContent = `Item ${i}`;
    $list.append(li); // <-- escribe al DOM 100 veces
  }

  const t1 = performance.now();
  log(`Naive: ${(t1 - t0).toFixed(2)} ms`);
});

// 2) Optimizado con DocumentFragment (1 sola escritura)
document.getElementById('render-fragment').addEventListener('click', () => {
  clearList();
  const t0 = performance.now();

  const frag = document.createDocumentFragment(); // fuera del DOM
  for (let i = 1; i <= 100; i++) {
    const li = document.createElement('li');
    li.className = 'item';
    li.textContent = `Item ${i}`;
    frag.append(li); // aún no hay reflow/pintado
  }
  $list.append(frag); // <-- 1 escritura al DOM

  const t1 = performance.now();
  log(`Fragment: ${(t1 - t0).toFixed(2)} ms`);
});

// 3) Optimizado con innerHTML (válido si el markup es tuyo y controlado)
document.getElementById('render-innerhtml').addEventListener('click', () => {
  clearList();
  const t0 = performance.now();

  // Generamos el HTML en memoria y lo insertamos 1 vez
  let html = '';
  for (let i = 1; i <= 100; i++) {
    html += `<li class="item">Item ${i}</li>`;
  }
  $list.innerHTML = html; // <-- 1 escritura

  const t1 = performance.now();
  log(`innerHTML: ${(t1 - t0).toFixed(2)} ms`);
});

// 4) Batching de clases (evitar layout thrashing)
//   - Lee primero (NodeList) -> Escribe después (toggle clase)
document.getElementById('toggle-highlight').addEventListener('click', () => {
  const t0 = performance.now();

  // Lectura (no modifica layout)
  const items = $list.querySelectorAll('.item');

  // Escritura (todas juntas)
  items.forEach(li => li.classList.toggle('highlight'));

  const t1 = performance.now();
  log(`Toggle highlight (batch): ${(t1 - t0).toFixed(2)} ms`);
});
