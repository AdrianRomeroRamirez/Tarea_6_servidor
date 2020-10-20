<?php

/**
 * Clase para crear productos
 */
class claseProducto {
    
    protected $cod; // Código del producto
    protected $nombre; // Nombre del producto
    protected $descripcion; // Descripción del producto
    protected $pvp; // pvp del producto
    protected $familia; // Familia a la que pertence el producto
    protected $stock; // stock del producto
    
    /**
     * Método que devuelve el código
     * @return código
     */
    function getCod() {
        return $this->cod;
    }

    /**
     * Método que devuelve el código
     * @return código
     */
    function getNombre() {
        return $this->nombre;
    }

    /**
     * Método que devuelve el nombre
     * @return nombre
     */
    function getDescripcion() {
        return $this->descripcion;
    }

    /**
     * Método que devuelve el pvp
     * @return pvp
     */
    function getPvp() {
        return $this->pvp;
    }

    /**
     * Método que devuelve la familia
     * @return familia
     */
    function getFamilia() {
        return $this->familia;
    }

    /**
     * Método que devuelve el stock
     * @return stock
     */
    function getStock() {
        return $this->stock;
    }

    /**
     * Método constructor con parámetros
     * @param array $row
     */
    function __construct($row) {
        $this->cod = $row['cod'];
        $this->nombre = $row['nombre'];
        $this->descripcion = $row['descripcion'];
        $this->pvp = $row['PVP'];
        $this->familia = $row['familia'];
        $this->stock = $row['stock'];
    }

            
}
