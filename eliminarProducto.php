<?php

// Archivo para eliminar un producto

include('claseDB.php');

$cod = $_POST['cod'];

// Si recibe datos del codigo, borra el producto
if (!empty($cod)) {
    try {
        $con = claseDB::conexionBD();
        $query = "DELETE FROM producto WHERE cod = ?";
        $result = $con->prepare($query);
        $result->bindParam(1, $cod);
        $result->execute();

        if (!$result) {
            die('Error al eliminar el producto.');
        }

        echo 'Producto eliminado correctamente';
    } catch (Exception $e) { // Se controla las excepciones
        die('Erro de conexión');
    }
}