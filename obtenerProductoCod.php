<?php

// Archivo para obtener un producto mediante su codigo

include('claseDB.php');

$cod = $_POST['cod'];

// hace la busuqeda a la base de datos y la devuleve
try {
    $con = claseDB::conexionBD();
    $query = 'SELECT * from producto WHERE cod = ?';
    $result = $con->prepare($query);
    $result->bindParam(1, $cod);
    $result->execute();
    $array = array();
    while ($row = $result->fetch()) {
        $array[] = array(
            'cod' => $row['cod'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'pvp' => $row['PVP'],
            'familia' => $row['familia'],
            'stock' => $row['stock']
        );
    }

    $arrayString = json_encode($array);
    echo $arrayString;
} catch (Exception $e) { // Se controla las excepciones
    die('Error al obtener el producto.');
}