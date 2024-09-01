<?php

class Atendimento extends Controller
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
        $this->view->title = "Atendimento";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "public/components/cad_nutricional/modal_atendimento.js");

        array_push($this->view->js, "views/nutricionista/atendimento/app.vue.js");
        array_push($this->view->css, "views/nutricionista/atendimento/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}