<?php

class Relatorio extends Controller
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
        Auth::verificaNivel(1);
        $this->view->title = "Relatório";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/relatorio/app.vue.js");
        array_push($this->view->css, "views/relatorio/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function getmensais()
    {
        $this->model->getmensais();
    }
    function getstatus()
    {
        $this->model->getstatus();
    }
    function getgeneros()
    {
        $this->model->getgeneros();
    }

}