<?php

// Archivo que inserta un producto

include('claseDB.php');

// Gruarda todos los datos recividos y hace la inserccion
try {
    $cod = $_POST['datos']['cod'];
    $nombre = $_POST['datos']['nombre'];
    $descripcion = $_POST['datos']['descripcion'];
    $pvp = $_POST['datos']['pvp'];
    $familia = $_POST['datos']['familia'];
    $stock = $_POST['datos']['stock'];

    $con = claseDB::conexionBD();
    $query = "INSERT INTO `producto` (`cod`, `nombre`, `descripcion`, `PVP`, `familia`, `stock`) VALUES (?, ?, ?, ?, ?, ?)";
    $result = $con->prepare($query);
    $result->bindParam(1, $cod);
    $result->bindParam(2, $nombre);
    $result->bindParam(3, $descripcion);
    $result->bindParam(4, $pvp);
    $result->bindParam(5, $familia);
    $result->bindParam(6, $stock);
    $result->execute();

    if (!$result) {
        die('Error en la insercción del producto.');
    }
} catch (Exception $e) { // Se controla las excepciones
    die('Erro de conexión');
}