function renderizarProductos(productos) {
  const contenedor = document.getElementById('product-container');
  if (!contenedor) return;
  contenedor.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = "bg-white p-4 rounded shadow text-center";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="mx-auto mb-2 w-40 h-28 object-cover">
      <h3 class="font-bold">${p.nombre}</h3>
      <p class="text-gray-600">$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const contador = document.getElementById('cart-count');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (contador) contador.textContent = carrito.length;
}

function mostrarUsuario() {
  const user = localStorage.getItem('user');
  const cont = document.getElementById('usuario-nombre');
  if (user && cont) {
    const nombre = localStorage.getItem("nombre");
    cont.textContent = "Hola, " + (nombre || (user === 'admin' ? "Admin" : "Cliente"));
  }
}

function init() {
  if (typeof productos !== 'undefined' && Array.isArray(productos)) {
    renderizarProductos(productos);
  }
  actualizarContador();
  mostrarUsuario();
  if (typeof cargarNombreMiniPerfil === 'function') {
    cargarNombreMiniPerfil();
  }
}

function filtrarPorCategoria(categoria) {
  if (categoria === "Todos") {
    renderizarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    renderizarProductos(filtrados);
  }
}