/* La clase Producto contiene las siguientes propiedades: codigo, nombre,
 precio e imagen (un string que guardará una url).  */

/* a dif de el ej de clase usuario 4 donde usabamos exportacion por defecto aqui 
 usamos exportación nominada - Ventaja: Te permite exportar múltiples clases, funciones o variables 
 desde un mismo archivo si en el futuro lo necesitás (solo tendrías que poner export class A, 
 export class B, etc.). -*/

export class Producto {
  // Almacenamiento global estático
  static items = [];

  constructor(codigo, nombre, precio, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }

  // Método para agregar la instancia actual a la lista y persistir
  agregar() {
    Producto.items.push(this);
    Producto.guardarEnStorage(); /* guarda los cambios en la memoria del navegador para no perderlos. */
  }

  // Método estático para eliminar un producto según su código
  static eliminar(codigo) {
    Producto.items = Producto.items.filter((prod) => prod.codigo !== codigo);
    Producto.guardarEnStorage();
  }

  // Métodos para el Desafío Extra (LocalStorage)
  static guardarEnStorage() {
    localStorage.setItem("productos_app", JSON.stringify(Producto.items));
  }

  static cargarDeStorage() {
    const datosGuardados = localStorage.getItem("productos_app");
    if (datosGuardados) {
      const productosPlano = JSON.parse(datosGuardados);
      // Reconstruimos las instancias para mantener la estructura de la clase
      Producto.items = productosPlano.map(
        (p) => new Producto(p.codigo, p.nombre, p.precio, p.imagen),
      );
    }
  }
}
