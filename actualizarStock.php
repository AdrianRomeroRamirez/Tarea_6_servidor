<?php

// Archivo para actualizar el stock

include('claseDB.php');

$cod = $_POST['datos']['cod'];
$nuevoStock = $_POST['datos']['nuevoStock'];

// Si recibe datos del nuevo stock, ejecuta la sentencia en la base de datos
if (!empty($nuevoStock)) {
    try {
        $con = claseDB::conexionBD();
        $query = "UPDATE `producto` SET `stock` = ? WHERE `producto`.`cod` = ?";
        $result = $con->prepare($query);
        $result->bindParam(1, $nuevoStock);
        $result->bindParam(2, $cod);
        $result->execute();
        
        echo 'Actualizado';

        if (!$result) {
            die('Error en la actualización de stock.');
        }
    } catch (Exception $e) { // Se controla las excepciones
        die('Erro de conexión');
    }
}