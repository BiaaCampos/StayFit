<?php

class Historico extends Controller
{

    function __construct()
    {
        parent::__construct();
        Auth::autentica();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Histórico";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/nutricionista/historico/app.vue.js");
        array_push($this->view->css, "views/nutricionista/historico/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function listaHistorico() 
    {  
        $this->model->listaHistorico();
    }

    
    function listaConsultasNutricionista() 
    {  
        $this->model->listaConsultasNutricionista();
    }
}