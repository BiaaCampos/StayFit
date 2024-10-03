<?php

class Teste extends Controller
{

    function __construct()
    {
        parent::__construct();
        // Auth::autentica();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Teste";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "public/components/cad_nutricional/teste.js");

        array_push($this->view->js, "views/nutricionista/teste/app.vue.js");
        array_push($this->view->css, "views/nutricionista/teste/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}