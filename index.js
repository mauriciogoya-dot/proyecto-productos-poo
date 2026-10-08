import { Producto } from "./classes/Producto.js";

const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");

// Función encargada de pintar los elementos en la tabla
function renderizarTabla() {
  tableBody.innerHTML = "";

  Producto.items.forEach((producto) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="h-12 w-12 object-cover rounded border" onerror="this.src='https://via.placeholder.com/150'">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${producto.codigo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${producto.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${Number(producto.precio).toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button data-codigo="${producto.codigo}" class="btn-eliminar bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                    Eliminar
                </button>
            </td>
        `;

    tableBody.appendChild(tr);
  });

  // Asignar eventos de escucha a cada botón de eliminar recién renderizado
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const codigo = e.target.getAttribute("data-codigo");
      Producto.eliminar(codigo);
      renderizarTabla();
    });
  });
}

// Inicialización al cargar la página (Carga datos previos del localStorage)
document.addEventListener("DOMContentLoaded", () => {
  Producto.cargarDeStorage();
  renderizarTabla();
});

// Listener para el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value;
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  // Crear la nueva instancia de Producto
  const nuevoProducto = new Producto(codigo, nombre, precio, imagen);

  // Agregar al array global y guardar en localStorage
  nuevoProducto.agregar();

  // Actualizar la vista de la tabla y resetear formulario
  renderizarTabla();
  form.reset();
});
