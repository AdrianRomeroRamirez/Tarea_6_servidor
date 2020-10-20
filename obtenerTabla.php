<?php

// Archivo que devuelve la lista de productos

include('claseDB.php');
try {
    $con = claseDB::conexionBD();
    $query = 'SELECT * from producto';
    $result = $con->prepare($query);
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
    die('Error en la lista de productos.');
}