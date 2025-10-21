//[1] Tomás referencia al <ul id="list"> donde viven los <li>. Mejor usar una sola referencia que andar consultando el DOM mil veces.
const list = document.querySelector("#list");
//[2] Referencia al botón “Agregar” (#add).
const add = document.querySelector("#add");
//[3] A los <li> que ya existen en el HTML les asignás un identificador lógico data-pid (1-based).
//Por qué data-* y no id? Porque id debe ser único y no queremos reindexarlo al borrar; data-pid es metadato semántico y estable.
Array.from(list.children).forEach((li, idx) => {
  li.dataset.pid = String(idx + 1);
});
//[4] counter arranca en el total actual de <li>. Así, el próximo elemento será Elemento counter+1.
let counter = list.children.length;

//[5] Listener del botón “Agregar”. Un solo lugar para crear ítems.

add.addEventListener("click", () => {
  //[6] Incrementás el contador para el nuevo ítem.
  counter += 1;
  //[7] Creás el <li> nuevo. No uses innerHTML si no hace falta; evitás sobrescribir/inyectar accidentalmente.
  const li = document.createElement("li");

  //[8] Texto del <li> como TextNode (más seguro/perf). Elemento ${counter} mantiene un rótulo estable.
  const text = document.createTextNode(`Elemento ${counter}`);
  //[9] Creás el <button> de remover.
  const btn = document.createElement("button");

  //[10] type='button' para que en un futuro dentro de un formulario no envíe el form por defecto.
  btn.type = "button";
  //[11] Clase para poder detectarlo por delegación (.remove).
  btn.className = "remove";
  //[12] El texto visible del botón.
  btn.textContent = "x";
  //[13] Asignás el data-pid nuevo (estable y legible).
  li.dataset.pid = String(counter);
  //[14] Metés texto y botón dentro del <li> en el orden correcto.
  li.append(text, btn);
  //[15] Agregás el <li> al <ul>. Un único append = un solo reflow.
  list.append(li);
});
//[16] Listener único en el <ul> (delegación): maneja clicks de todos los botones .remove, incluidos los que se creen después.

list.addEventListener("click", (e) => {
  //[17] Filtro rápido: si el click no viene de un .remove, cortás (early return). Ahorras CPU y evitas if anidados.
  if (!e.target.matches(".remove")) {
    return;
  }

  //[18] closest('li') sube al ancestro <li> más cercano desde el botón clickeado. O(1) y semántico.
  const li = e.target.closest("li");
  //[19] Paranoia sana: si no hay <li>, salí. Te blinda si el DOM cambió de forma inesperada.
  if (!li) {
    return;
  }
  //[20] Capturás la etiqueta del <li> antes de borrarlo. firstChild.nodeValue te da el texto puro del inicio del <li>. Con ?.trim() lo dejás prolijo.
  const label = li.firstChild?.nodeValue?.trim() || "(Sin etiqueta)";

  //[21] Eliminás el <li> del DOM. Sin loops ni buscar por índice; directo y eficiente.
  li.remove();

  //[22] Log útil: “Eliminado: Elemento X”. Esto en paneles de operador ayuda a auditar acciones.
  console.log(`Eliminado: ${label}`);

  //[23] Si la lista quedó vacía, lo decís. Útil para feedback de UX o para activar estados “vacíos”.
  if (list.children.length === 0) {
    console.log("lista vacia");
  }
});
