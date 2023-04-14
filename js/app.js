// Clase para productos
class ControladorProducto {
  constructor() {
    this.listaProductos = [];
    this.contenedor_productos = document.getElementById("contenedor_productos");
  }

  async obtenerListaProductoJSON () {
    let res = await fetch("./js/API_local.json");
    this.listaProductos = await res.json();
    this.mostrarEnDOM();
  }

  mostrarEnDOM() {
    //limpio
    this.contenedor_productos.innerHTML = "";
    //muestro toda la lista
    this.listaProductos.forEach((producto) => {
      this.contenedor_productos.innerHTML += `
        <div class="card" style="width: 15rem">
          <img src="${producto.img}" class="card-img-top" alt="${producto.alt}" />
          <div class="card-body">
            <h5 class="card-title">${producto.marca}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <span id="inventario">Inventario: ${producto.inventario}</span>
            <a href="#" class="btn btn-outline-info" id="equipo${producto.id}">Añadir al carrito</a>
          </div>
        </div>
      `;
    });

    //Añadimos Eventos a los botones de cada CARD
    this.listaProductos.forEach((producto) => {
      const botonAnadirProducto = document.getElementById(`equipo${producto.id}`);
      botonAnadirProducto.addEventListener("click", () => {
        manejarCarrito.anadir(producto);
        manejarCarrito.obtenerListaCarrito();
        manejarCarrito.mostrarEnDOM(contenedor_carrito);

        Toastify({
          text: "Producto agragado al carrito",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      });
    });
  }
}





// Clase para carrito
class ControladorCarrito {
  constructor() {
    this.listaCarrito = [];
  }

  obtenerListaCarrito() {
    let obtenerListaJSON = localStorage.getItem("listaCarrito");

    if (obtenerListaJSON) {
      this.listaCarrito = JSON.parse(obtenerListaJSON);
    }
  }

  eliminar(producto) {
    let indice = this.listaCarrito.indexof(producto);
    this.listaCarrito.splice(indice, 1);
  }

  anadir(producto) {
    this.listaCarrito.push(producto);
    let arrFormatoJSON = JSON.stringify(this.listaCarrito);
    localStorage.setItem("listaCarrito", arrFormatoJSON);
    producto.inventario -= 1;
  }

  calcularPrecioTotal() {
    this.precioTotal = 0;
    for (const objero_dentro of this.listaCarrito) {
      this.precioTotal += objero_dentro.precio * objero_dentro.cantidad;
    }
    return this.precioTotal;
  }
  conIVA() {
    return this.precioTotal * 1.21;
  }

  soloIVA() {
    return this.precioTotal * 0.21;
  }

  limpiar() {
    this.listaCarrito = [];
    localStorage.removeItem("listaCarrito");
  }

  mostrarEnDOM(contenedor_carrito) {
    //limpio el contenedor
    contenedor_carrito.innerHTML = "";
    //muestro todo
    this.listaCarrito.forEach((producto) => {
      contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.marca}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><small class="text-muted">$${producto.precio}</small></p>
                    </div>
                </div>
            </div>
        </div>
            `;
    });
  }
}

//Objetos controladores
const manejarProductos = new ControladorProducto();
const manejarCarrito = new ControladorCarrito();

//Verificar STORAGE
manejarProductos.obtenerListaProductoJSON();
manejarCarrito.obtenerListaCarrito();

//DOM
manejarProductos.mostrarEnDOM(document.getElementById("contenedor_productos"));
const contenedor_productos = document.getElementById("contenedor_productos");
const contenedor_carrito = document.getElementById("contenedor_carrito");

//APP JS
manejarProductos.mostrarEnDOM(contenedor_productos);
manejarCarrito.mostrarEnDOM(contenedor_carrito);
manejarProductos.obtenerListaProductoJSON();
manejarCarrito.obtenerListaCarrito();


//Añadimos Eventos al boton de carrito
let botonPagar = document.getElementById("pagar");
let precioTotal = document.getElementById("total");
let precioIva = document.getElementById("iva");
let precioTotalIva = document.getElementById("totalConIva");
botonPagar.addEventListener("click", () => {
  let resultado = manejarCarrito.calcularPrecioTotal();
  let resultadoIva = manejarCarrito.soloIVA();
  let resultadoTotalIva = manejarCarrito.conIVA();
  precioTotal.innerHTML = "Total: $" + resultado.toFixed(2);
  precioIva.innerHTML = "Iva: $" + resultadoIva.toFixed(2);
  precioTotalIva.innerHTML = "Total a pagar: $" + resultadoTotalIva.toFixed(2);

});

// Vaciar carrito al finalizar la compra
const botonFinalizar = document.getElementById("finalizar");
botonFinalizar.addEventListener("click", () => {
  manejarCarrito.limpiar();
  manejarCarrito.mostrarEnDOM(contenedor_carrito);

  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Compra realizada con exito',
    showConfirmButton: false,
    timer: 1500
  })
});
