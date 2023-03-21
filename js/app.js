
// Clase para productos
class ControladorProducto{
    constructor(){
        this.listaProductos = []
    }

    obtenerListaProducto(){
        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if(obtenerListaJSON){
            this.listaProductos = JSON.parse(obtenerListaJSON)
        }
    }
    
    mostrarEnDOM(contenedor_productos){
        //limpio
        contenedor_productos.innerHTML = ""
        //muestro toda la lista
        this.listaProductos.forEach( producto => {
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
            `
        })
    }
}

// Clase para carrito
class ControladorCarrito{
    constructor(){
        this.listaCarrito = []
     }

    obtenerListaCarrito(){
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if(obtenerListaJSON){
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }

    anadir(producto){
        this.listaCarrito.push(producto)
        let arrFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito",arrFormatoJSON)
    }

    calcularPrecioTotal(){
        this.precioTotal = 0
        for (const objero_dentro of this.listaCarrito) {
            this.precioTotal += objero_dentro.precio * objero_dentro.cantidad
        }
        return this.precioTotal
    }
    conIVA() {
        return this.precioTotal * 1.21;
    }
    
    soloIVA() {
        return this.precioTotal * 0.21;
    }

    mostrarEnDOM(contenedor_carrito){
        //limpio el contenedor
        contenedor_carrito.innerHTML = ""
        //muestro todo
        this.listaCarrito.forEach( producto => {
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
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
            `
        })
    }
}


//Objetos controladores
const manejarProductos = new ControladorProducto()
const manejarCarrito = new ControladorCarrito()

//Verificar STORAGE
manejarProductos.obtenerListaProducto()
manejarCarrito.obtenerListaCarrito()

//DOM
manejarProductos.mostrarEnDOM(document.getElementById("contenedor_productos"));
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")

//APP JS
manejarProductos.mostrarEnDOM(contenedor_productos)
manejarCarrito.mostrarEnDOM(contenedor_carrito)
manejarCarrito.obtenerListaCarrito();

//Añadimos Eventos a los botones de cada CARD
manejarProductos.listaProductos.forEach( producto => {
    const productoEnEsperaDeSerAnadido = document.getElementById(`equipo${producto.id}`)

    productoEnEsperaDeSerAnadido.addEventListener("click",()=>{
        
        manejarCarrito.anadir(producto)
        manejarCarrito.obtenerListaCarrito()
        manejarCarrito.mostrarEnDOM(contenedor_carrito)
    })
})

//Añadimos Eventos al boton de carrito
let botonPagar = document.getElementById("pagar");
let precioTotal = document.getElementById("total");
let precioIva = document.getElementById("iva")
let precioTotalIva = document.getElementById("totalConIva")
botonPagar.addEventListener("click", () => {
    let resultado = manejarCarrito.calcularPrecioTotal();
    let resultadoIva = manejarCarrito.soloIVA()
    let resultadoTotalIva = manejarCarrito.conIVA()
    precioTotal.innerHTML = "Total: $" + resultado.toFixed(2);
    precioIva.innerHTML = "Iva: $" + resultadoIva.toFixed(2);
    precioTotalIva.innerHTML = "Total a pagar: $" + resultadoTotalIva.toFixed(2)
});

// Vaciar carrito al finalizar la compra
const botonFinalizar = document.getElementById("finalizar")
botonFinalizar.addEventListener("click", () => {
    localStorage.removeItem("listaCarrito");
    contenedor_carrito.innerHTML = ""
});