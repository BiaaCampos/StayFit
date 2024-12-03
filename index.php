<?php

require 'config.php';

spl_autoload_register('myAutoloader');

function myAutoloader($class) {
    if (strpos($class, 'Fpdi') === false) {
        require_once LIBS . $class .".php";
    }
}

$bootstrap = new Bootstrap();

$bootstrap->init();
