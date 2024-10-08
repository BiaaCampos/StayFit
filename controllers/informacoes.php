<?php

class Informacoes extends Controller
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
        $this->view->title = "Agendar Consulta";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/agendamento/informacoes/app.vue.js");
        array_push($this->view->css, "views/agendamento/informacoes/app.vue.css");
        array_push($this->view->js, "public/components/agendarconsulta/modal_concluir.js");
        $this->view->render('header');
        $this->view->render('footer');
    }

}