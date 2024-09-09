<?php

class Cadastronutricional extends Controller
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
        $this->view->title = "Cadastro Nutricional";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "public/components/cad_nutricional/historicomedico.js");
        array_push($this->view->js, "public/components/cad_nutricional/habitos_alimentares.js");

        array_push($this->view->js, "views/cadastronutricional/app.vue.js");
        array_push($this->view->css, "views/cadastronutricional/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function listaPerguntasHistorico()
    {
        $this->model->listaPerguntasHistorico();
    }

    function salvarRespostas()
    {
        $this->model->salvarRespostas();
    }
}