<?php

class Perfil_nutricionista extends Controller
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
        $this->view->title = "Login";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/telaperfil/perfil_nutricionista/app.vue.js");
        array_push($this->view->css, "views/telaperfil/perfil_nutricionista/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}