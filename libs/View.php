<?php

class View {
    public $title = "Titulo";

    function __construct()
    {
        
    }
    public function render($name, $noInclude = false)
    {
        require 'views/' . $name . '.php';
    }

    public function vueRender($name)
    {
        return file_get_contents('views/' . $name . '.php');
    }
}
