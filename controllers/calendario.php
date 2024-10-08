<?php

class Calendario extends Controller
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
        array_push($this->view->js, "views/agendamento/calendario/app.vue.js");
        array_push($this->view->css, "views/agendamento/calendario/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}