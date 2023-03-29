// Cargar productos en localstorage

let listaProductos = [
    {id:1, marca:"SCHNEIDER ELECTRIC", precio: 35246, descripcion: "GUARDAMOTOR MAGNETICO GV3 3P 40A 50KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29879/images/optimized/29879_1_small.webp", alt: "GUARDAMOTOR MAGNETICO GV3 3P 40A 50KA", inventario: 10},
    {id:2, marca:"SCHNEIDER ELECTRIC", precio: 40522, descripcion: "GUARDAMOTOR MAGNETICO GV3 3P 50A 50KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29879/images/optimized/29879_1_small.webp", alt: "GUARDAMOTOR MAGNETICO GV3 3P 50A 50KA", inventario: 10},
    {id:3, marca:"SCHNEIDER ELECTRIC", precio: 94456, descripcion: "GUARDAMOTOR MAGNETICO GV4 3P 80A 50KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29881/images/optimized/29881_1_small.webp", alt: "GUARDAMOTOR MAGNETICO GV4 3P 80A 50KA", inventario: 10},
    {id:4, marca:"SCHNEIDER ELECTRIC", precio: 12271, descripcion: "GUARDAMOTOR MAGNETICO GV2 3P 10A 100KA MANETA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29875/images/optimized/29875_1_small.webp", alt: "GUARDAMOTOR MAGNETICO GV2 3P 10A 100KA MANETA", inventario: 10},
    {id:5, marca:"SCHNEIDER ELECTRIC", precio: 15380, descripcion: "GUARDAMOTOR MAGNETICO GV2 3P 25A 15KA MANETA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29876/images/optimized/29876_1_small.webp", alt: "GUARDAMOTOR MAGNETICO GV2 3P 25A 15KA MANETA", inventario: 10},
    {id:6, marca:"SCHNEIDER ELECTRIC", precio: 29407, descripcion: "GUARDAMOTOR MAGTERM 3P 0.25/0.40A 100KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29799/images/optimized/29799_1_small.webp", alt: "GUARDAMOTOR MAGTERM 3P 0.25/0.40A 100KA", inventario: 10},
    {id:7, marca:"SCHNEIDER ELECTRIC", precio: 69615, descripcion: "GUARDAMOTOR MAGTERM 3P 62/73A 50KA EVLK", cantidad: 1, img: "https://archives.liesa.com.ar/media/29/29801/images/optimized/29801_1_small.webp", alt: "GUARDAMOTOR MAGTERM 3P 62/73A 50KA EVLK", inventario: 10},
    {id:8, marca:"SIEMENS", precio: 4087, descripcion: "BARRA COLECTORA 45mm 3 GUARDAMOTORES S00/0", cantidad: 1, img: "https://archives.liesa.com.ar/media/27/27883/images/optimized/27883_1_small.webp", alt: "BARRA COLECTORA 45mm 3 GUARDAMOTORES S00/0", inventario: 10},
    {id:9, marca:"SIEMENS", precio: 3356, descripcion: "BARRA COLECTORA 45mm 2 GUARDAMOTORES T00/0", cantidad: 1, img: "https://archives.liesa.com.ar/media/27/27605/images/optimized/27605_1_small.webp",alt: "BARRA COLECTORA 45mm 2 GUARDAMOTORES T00/0", inventario: 10},
    {id:10,marca: "SCHNEIDER ELECTRIC", precio: 29407, descripcion: "GUARDAMOTOR MAGTERM 3P 0.63/1A 100KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/27/27304/images/optimized/27304_1_small.webp",alt: "GUARDAMOTOR MAGTERM 3P 0.63/1A 100KA", inventario: 10},
    {id:11,marca: "SCHNEIDER ELECTRIC", precio: 45950, descripcion: "GUARDAMOTOR MAGNETICO 3P 65A", cantidad: 1, img: "https://archives.liesa.com.ar/media/27/27267/images/optimized/27267_1_small.webp",alt: "GUARDAMOTOR MAGNETICO 3P 65A", inventario: 10},
    {id:12,marca: "SCHNEIDER ELECTRIC", precio: 31423, descripcion: "GUARDAMOTOR MAGTERM 3P 13/18A 50KA", cantidad: 1, img: "https://archives.liesa.com.ar/media/27/27140/images/optimized/27140_1_small.webp",alt: "GUARDAMOTOR MAGTERM 3P 13/18A 50KA", inventario: 10}
]

const listaProductosJSON = JSON.stringify(listaProductos)

localStorage.setItem("listaProductos",listaProductosJSON)

// Clase para productos
class ControladorProducto {
  constructor() {
    this.listaProductos = [];
  }

  obtenerListaProducto() {
    let obtenerListaJSON = localStorage.getItem("listaProductos");

    if (obtenerListaJSON) {
      this.listaProductos = JSON.parse(obtenerListaJSON);
    }
  }

  mostrarEnDOM(contenedor_productos) {
    //limpio
    contenedor_productos.innerHTML = "";
    //muestro toda la lista
    this.listaProductos.forEach((producto) => {
      contenedor_productos.innerHTML += `
            <div class="card" style="width: 15rem">
            <img
              src="${producto.img}"
              class="card-img-top"
              alt="${producto.alt}"
            />
            <div class="card-body">
              <h5 class="card-title">${producto.marca}</h5>
              <p class="card-text">
                ${producto.descripcion}
              </p>
              <p class="card-text">
              $${producto.precio}
            </p>
            <span id= inventario>Inventario: ${producto.inventario}</span>
              <a href="#" class="btn btn-outline-info" id="equipo${producto.id}">Añadir al carrito</a>
            </div>
          </div>
            `;
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
manejarProductos.obtenerListaProducto();
manejarCarrito.obtenerListaCarrito();

//DOM
manejarProductos.mostrarEnDOM(document.getElementById("contenedor_productos"));
const contenedor_productos = document.getElementById("contenedor_productos");
const contenedor_carrito = document.getElementById("contenedor_carrito");

//APP JS
manejarProductos.mostrarEnDOM(contenedor_productos);
manejarCarrito.mostrarEnDOM(contenedor_carrito);
manejarCarrito.obtenerListaCarrito();

//Añadimos Eventos a los botones de cada CARD
manejarProductos.listaProductos.forEach((producto) => {
  const productoEnEsperaDeSerAnadido = document.getElementById(
    `equipo${producto.id}`
  );

  productoEnEsperaDeSerAnadido.addEventListener("click", () => {
    manejarCarrito.anadir(producto);
    manejarCarrito.obtenerListaCarrito();
    manejarCarrito.mostrarEnDOM(contenedor_carrito);
  });
});

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
});
