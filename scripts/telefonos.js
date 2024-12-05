document.addEventListener('DOMContentLoaded', function() {
    // Array de teléfonos
    const telefonos = [
        {
            id: 1,
            titulo: "Samsung S24 ULTRA",
            precio: 1000000,
            imagen: "../img/S24.png",
            marca: "samsung"
        },
        {
            id: 2,
            titulo: "Huawei Pura70",
            precio: 2000000,
            imagen: "../img/PURA70.png",
            marca: "huawei"
        },
        {
            id: 3,
            titulo: "Xiaomi MixFlip",
            precio: 3000000,
            imagen: "../img/MIXFLIP.png",
            marca: "xiaomi"
        },
        {
            id: 4,
            titulo: "Samsung A05s",
            precio: 180000,
            imagen: "../img/A05S.png",
            marca: "samsung"
        },
        {
            id: 5,
            titulo: "Xiaomi Note 12",
            precio: 320000,
            imagen: "../img/NOTE_12_AZUL.png",
            marca: "xiaomi"
        },
        {
            id: 6,
            titulo: "Motorola Edge 50 Fusion",
            precio: 800000,
            imagen: "../img/Edge_50_Pro_Negro-Eclipse_1000x1000px-01.png",
            marca: "motorola"
        },
        {
            id: 7,
            titulo: "OPPO A40",
            precio: 540000,
            imagen: "../img/OPPO.png",
            marca: "oppo"
        },
        {
            id: 8,
            titulo: "IPHONE 16",
            precio: 5020000,
            imagen: "../img/IP16.png",
            marca: "iphone"
        }
    ];

    const contenedorTelefonos = document.getElementById('contenedor-telefonos');
    const inputBuscar = document.getElementById('buscar');
    const selectMarca = document.getElementById('marca');
    const selectPrecio = document.getElementById('precio');

    // Función para mostrar los teléfonos
    function mostrarTelefonos(telefonosFiltrados) {
        contenedorTelefonos.innerHTML = '';
        telefonosFiltrados.forEach(telefono => {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <span class="titulo-item">${telefono.titulo}</span>
                <img src="${telefono.imagen}" alt="" class="img-item">
                <span class="precio-item">$${telefono.precio.toLocaleString()}</span>
                <button class="boton-item">Agregar al Carrito</button>
            `;
            contenedorTelefonos.appendChild(item);
        });
    }

    // Función para filtrar teléfonos
    function filtrarTelefonos() {
        const textoBusqueda = inputBuscar.value.toLowerCase();
        const marcaSeleccionada = selectMarca.value;
        const precioSeleccionado = selectPrecio.value;

        let telefonosFiltrados = telefonos.filter(telefono => {
            const coincideTexto = telefono.titulo.toLowerCase().includes(textoBusqueda);
            const coincideMarca = !marcaSeleccionada || telefono.marca === marcaSeleccionada;
            let coincidePrecio = true;

            if (precioSeleccionado) {
                const [min, max] = precioSeleccionado.split('-').map(Number);
                if (max) {
                    coincidePrecio = telefono.precio >= min && telefono.precio <= max;
                } else {
                    coincidePrecio = telefono.precio >= min;
                }
            }

            return coincideTexto && coincideMarca && coincidePrecio;
        });

        mostrarTelefonos(telefonosFiltrados);
    }

    // Event listeners para los filtros
    inputBuscar.addEventListener('input', filtrarTelefonos);
    selectMarca.addEventListener('change', filtrarTelefonos);
    selectPrecio.addEventListener('change', filtrarTelefonos);

    // Mostrar todos los teléfonos al cargar la página
    mostrarTelefonos(telefonos);
});