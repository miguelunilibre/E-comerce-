//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Esperamos que todos los elementos de la pagina carguen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al botón sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al botón Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', mostrarFormularioPago)

    // Agregar evento al botón del carrito
    document.getElementById('carrito-btn').addEventListener('click', function(e) {
        e.preventDefault();
        hacerVisibleCarrito();
    });

    // Agregar funcionalidad al botón cerrar carrito
    document.querySelector('.btn-cerrar-carrito').addEventListener('click', function() {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.classList.remove('visible');
        carritoVisible = false;
    });
}

function mostrarFormularioPago(){
    var formularioPago = document.createElement('div');
    formularioPago.innerHTML = `
        <div class="formulario-pago">
            <h2>Pasarela de Pago</h2>
            <form id="payment-form">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
                <label for="address">Dirección:</label>
                <input type="text" id="address" name="address" required>
                <label for="payment-method">Método de Pago:</label>
                <select id="payment-method" name="payment-method" required>
                    <option value="credit-card">Tarjeta de Crédito</option>
                    <option value="debit-card">Tarjeta de Débito</option>
                    <option value="paypal">PayPal</option>
                    <option value="pse">PSE</option>
                    <option value="cash-on-delivery">Pagar en Efectivo al Recibir</option>
                </select>
                <div id="card-details" style="display: none;">
                    <label for="card-number">Número de Tarjeta:</label>
                    <input type="text" id="card-number" name="card-number">
                    <label for="expiry-date">Fecha de Expiración:</label>
                    <input type="text" id="expiry-date" name="expiry-date">
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv">
                </div>
                <div id="paypal-details" style="display: none;">
                    <label for="paypal-email">Correo Electrónico de PayPal:</label>
                    <input type="email" id="paypal-email" name="paypal-email">
                </div>
                <div id="pse-details" style="display: none;">
                    <label for="pse-bank">Banco o Billetera Digital:</label>
                    <select id="pse-bank" name="pse-bank">
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="bbva">BBVA</option>
                        <option value="nequi">Nequi</option>
                        <option value="daviplata">Daviplata</option>
                        <!-- Add more banks or digital wallets as needed -->
                    </select>
                </div>
                <button type="submit">Pagar</button>
            </form>
        </div>
    `;
    document.body.appendChild(formularioPago);

    document.getElementById('payment-method').addEventListener('change', function(event) {
        var cardDetails = document.getElementById('card-details');
        var paypalDetails = document.getElementById('paypal-details');
        var pseDetails = document.getElementById('pse-details');
        
        cardDetails.style.display = 'none';
        paypalDetails.style.display = 'none';
        pseDetails.style.display = 'none';

        if (event.target.value === 'credit-card' || event.target.value === 'debit-card') {
            cardDetails.style.display = 'block';
        } else if (event.target.value === 'paypal') {
            paypalDetails.style.display = 'block';
        } else if (event.target.value === 'pse') {
            pseDetails.style.display = 'block';
        }
    });

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        pagarClicked();
    });
}

function pagarClicked(){
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var paymentMethod = document.getElementById('payment-method').value;
    var paymentDetails = '';

    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        paymentDetails = `Tarjeta: ${document.getElementById('card-number').value}`;
    } else if (paymentMethod === 'paypal') {
        paymentDetails = `PayPal: ${document.getElementById('paypal-email').value}`;
    } else if (paymentMethod === 'pse') {
        paymentDetails = `Banco: ${document.getElementById('pse-bank').value}`;
    } else {
        paymentDetails = 'Pagar en Efectivo al Recibir';
    }

    var orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);

    var confirmationPage = `
        <div class="confirmation-page">
            <div class="confirmation-header">
                <h2>Compra Realizada con Éxito</h2>
                <p>Gracias por tu compra, ${name}.</p>
            </div>
            <div class="confirmation-details">
                <p><strong>Dirección de Envío:</strong> ${address}</p>
                <p><strong>Método de Pago:</strong> ${paymentMethod}</p>
                <p><strong>Detalles de Pago:</strong> ${paymentDetails}</p>
                <p><strong>Número de Orden:</strong> ${orderNumber}</p>
            </div>
            <button onclick="window.location.href='index.html'">Volver a Inicio</button>
        </div>
    `;

    document.body.innerHTML = confirmationPage;
}

//Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Función que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = !carritoVisible;
    var carrito = document.getElementsByClassName('carrito')[0];
    
    if(carritoVisible) {
        carrito.classList.add('visible');
    } else {
        carrito.classList.remove('visible');
    }
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregamos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente función controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.classList.remove('visible');
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%'; // Reset width when cart is hidden
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el símbolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}