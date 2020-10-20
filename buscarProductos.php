<?php

// Archivo que busca productos por parte de su nombre

include('claseDB.php');

$busqueda = $_POST['busqueda'] . '%';


// Si recibe datos de busqueda, hace la busqueda en la base de datos y las devuelve
if (!empty($busqueda)) {
    try {
        $con = claseDB::conexionBD();
        $query = "SELECT * from producto WHERE nombre LIKE ?";
        $result = $con->prepare($query);
        $result->bindParam(1, $busqueda);
        $result->execute();

        if (!$result) {
            die('Error en la busqueda');
        }

        $array = array();
        while ($row = $result->fetch()) {
            $array[] = array(
                'nombre' => $row['nombre']
            );
        }

        // Codifica el array para mandarlo
        $arrayString = json_encode($array);
        echo $arrayString;
    } catch (Exception $e) { // Se controla las excepciones
        die('Erro de conexión');
    }
}