function Counter(initial = 0) {
  let count = initial;

  // Creamos el contenedor del componente
  const container = document.createElement('div');
  container.className = 'counter';

  // Creamos los elementos internos
  const value = document.createElement('h2');
  const btnAdd = document.createElement('button');
  const btnSub = document.createElement('button');

  btnAdd.textContent = '+';
  btnSub.textContent = '–';
  value.textContent = count;

  // Función interna para renderizar el valor actual
  const render = () => {
    value.textContent = count;
  };

  // Eventos internos del componente
  btnAdd.addEventListener('click', () => {
    count++;
    render();
  });

  btnSub.addEventListener('click', () => {
    count--;
    render();
  });

  

  // Componemos el nodo
  container.append(value, btnAdd, btnSub);

  // Retornamos el contenedor listo para insertar
  return container;
}

// Montamos el componente en el DOM principal
const app = document.querySelector('#app');
app.append(Counter(0));
app.append(Counter(10));
app.append(Counter(100));
