$(document).ready(function () {
    obtenerLista(); // Obtiene la lista de productos
    $('#panel-oculto').hide(); // Oculta el panel 'secreto'

    // Función que obtiene la lista de productos pintandolas en una tabla
    function obtenerLista() {
        $.ajax({
            url: 'obtenerTabla.php',
            type: 'GET',
            success: function (response) {
                const productos = JSON.parse(response);
                let template = '';
                productos.forEach(producto => {
                    template += `
                <tr codPro="${producto.cod}">
                    <td>${producto.cod}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.pvp}</td>
                    <td>${producto.familia}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button class='botonActualizar'>
                            <img src='img/edit.svg' alt='Actualizar stock' height='30' width='30'>
                        </button>
                    </td>
                    <td>
                        <button class='botonEliminar'>
                            <img src='img/delete.png' alt='Eliminar' height='30' width='30'>
                        </button>
                    </td>
                </tr>
                `;
                });
                $('#productos').html(template);
            }
        });
    }

    // Cada vez que se teclea en la barra de buscar, hace una consulta en la base de datos 
    // y lo muestra en el panel 'secreto'
    $('#buscar').keyup(function () {
        if ($('#buscar').val()) {
            let busqueda = $('#buscar').val();
            $.ajax({
                url: 'buscarProductos.php',
                data: {busqueda},
                type: 'POST',
                success: function (response) {
                    if (!response.error) {
                        let productos = JSON.parse(response);
                        let template = '';
                        productos.forEach(producto => {
                            template += `
                        <li>${producto.nombre}</li>
                        `;
                        });
                        $('#panel-oculto').show();
                        $('#container').html(template);
                    }
                }
            });
        }
    });

    // Si se pulsa el boton de confirmar eliminación, se llama al archivo eliminarProducto para que lo elimine
    $(document).on('click', '#confirmarEliminacion', (e) => {
        if (confirm('¿Estas seguro de eliminar el producto?')) {
            const elemento = $(this)[0].activeElement;
            const cod = $(elemento).attr('codPro');
            e.preventDefault();
            $.ajax({
                url: 'eliminarProducto.php',
                data: {cod},
                type: 'POST',
                success: function (response) {
                    obtenerLista();
                    $('#panel-oculto').hide();
                }
            });
        }
    });

    // Ya no tiene excusa, Hoy salió con su amiga, Disque pa’ matar la tusa (8)
    $(document).on('click', '.botonActualizar', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const cod = $(elemento).attr('codPro');
        $.ajax({
            url: 'obtenerProductoCod.php',
            data: {cod},
            type: 'POST',
            success: function (response) {
                if (!response.error) {
                    let producto = JSON.parse(response);
                    let template = `
                    <form id='formularioEliminar'>
                        <label for='stockActual'>Stock actual</label>
                        <input id='stockActual' type='text' value='${producto[0].stock}' readonly>
                        <label for='nuevoStock'>Nuevo stock</label>
                        <input id='nuevoStock' type='number' value='' step='1' required>
                        <button type='submit' codPro="${producto[0].cod}" id='actualizarStock' class='ml-2 btn btn-primary'>
                            Actualizar stock
                        </button>
                    </form>
                    `;

                    $('#panel-oculto').show();
                    $('#container').html(template);
                }
            }
        });
    });

    // Si se pulsa el boton de actualizar stock, se llama a actualizarStock.php para actualizarlo
    $(document).on('click', '#actualizarStock', (e) => {
        e.preventDefault();
        const elemento = $(this)[0].activeElement;
        const cod = $(elemento).attr('codPro');
        const nuevoStock = $('#nuevoStock').val();
        const datos = {
            'cod': cod,
            'nuevoStock': nuevoStock
        };

        $.ajax({
            url: 'actualizarStock.php',
            data: {datos},
            type: 'POST',
            success: function (response) {
                if (response !== '') {
                    obtenerLista();
                    $('#panel-oculto').hide();
                } else {
                    alert('Debes introducir un número entero.');
                }
            }
        });
    });

    // Que porque un hombre le pagó mal, está dura y abusa, se cansó de ser buena
    $(document).on('click', '.botonEliminar', () => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const cod = $(elemento).attr('codPro');
        $.ajax({
            url: 'obtenerProductoCod.php',
            data: {cod},
            type: 'POST',
            success: function (response) {
                if (!response.error) {
                    let producto = JSON.parse(response);
                    let template = `
                    <form id='formularioEliminar'>
                        <label for='cod'>Código</label>
                        <input id='cod' type='text' value='${producto[0].cod}' readonly>
                        <label for='nombre'>Nombre</label>
                        <input id='nombre' type='text' value='${producto[0].nombre}' readonly>
                        <label for='descripcion'>Descripción</label>
                        <input id='descripcion' type='text' value='${producto[0].descripcion}' readonly>
                        <label for='pvp'>PVP</label>
                        <input id='pvp' type='text' value='${producto[0].pvp}' readonly>
                        <label for='familia'>Familia</label>
                        <input id='familia' type='text' value='${producto[0].familia}' readonly>
                        <label for='stock'>Stock</label>
                        <input id='stock' type='text' value='${producto[0].stock}' readonly>
                        <button codPro="${producto[0].cod}" id='confirmarEliminacion' class='ml-2 btn btn-danger'>
                            Eliminar
                        </button>
                    </form>
                    `;

                    $('#panel-oculto').show();
                    $('#container').html(template);
                }
            }
        });
    });

    // Si se pulsa el botón de insertar, se muestra un formilario para introducir los datos
    $(document).on('click', '#insertarProducto', () => {
        let template = `
        <form id='formularioEliminar'>
            <label for='cod'>Código</label>
            <input id='cod' type='text' value='' placeholder='Código'>
            <label for='nombre'>Nombre</label>
            <input id='nombre' type='text' value='' placeholder='Nombre'>
            <label for='descripcion'>Descripción</label>
            <input id='descripcion' type='text' value='' placeholder='Descripción'>
            <label for='pvp'>PVP</label>
            <input id='pvp' type='number' step='0.01' value='' placeholder='PVP'>
            <label for='familia'>Familia</label>
            <input id='familia' type='text' value='' placeholder='Familia'>
            <label for='stock'>Stock</label>
            <input id='stock' type='number' step='1' value='' placeholder='Stock'>
            <button id='confirmarInsercion' class='ml-2 btn btn-primary'>
                Insertar
            </button>
        </form>
        `;

        $('#panel-oculto').show();
        $('#container').html(template);
    });

    // Si se pulsa el botón de confirmar inserccion, se validan los datos y si está todo correcto, se insertan en la base de datos.
    $(document).on('click', '#confirmarInsercion', (e) => {
        e.preventDefault();
        const cod = $('#cod').val();
        const nombre = $('#nombre').val();
        const descripcion = $('#descripcion').val();
        const pvp = $('#pvp').val();
        const familia = $('#familia').val();
        const stock = $('#stock').val();
        let todoCorrecto = true;

        if (cod === '' || cod.length > 12) {
            todoCorrecto = false;
            alert('El código no puede estar vacío ni ser mayor de 12 carácteres.');
        }

        if (nombre === '' || nombre.length > 50) {
            todoCorrecto = false;
            alert('Nombre no puede estar vacío ni ser mayor de 50 carácteres.');
        }

        if (descripcion === '') {
            todoCorrecto = false;
            alert('Descripción no puede estar vacío.');
        }

        if (isNaN(pvp) || pvp === '') {
            todoCorrecto = false;
            alert('PVP debe ser un número real.');
        }

        if (familia === '' || familia.length > 6) {
            todoCorrecto = false;
            alert('Familia no puede estar vacío ni ser mayor de 6 carácteres.');
        }

        if (isNaN(stock) || stock === '') {
            todoCorrecto = false;
            alert('Stock debe ser un número entero.');
        }

        if (todoCorrecto) {

            const datos = {
                'cod': cod,
                'nombre': nombre,
                'descripcion': descripcion,
                'pvp': pvp,
                'familia': familia,
                'stock': stock
            };

            $.ajax({
                url: 'insertarProducto.php',
                data: {datos},
                type: 'POST',
                success: function (response) {
                    console.log(response);
                    obtenerLista();
                    $('#panel-oculto').hide();
                }
            });
        }

    });

});