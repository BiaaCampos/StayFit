<?php

class Perfil_usuario extends Controller
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
        $this->view->title = "Perfil";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "public/components/perfil/alimento_tab.js");
        /*
            1 - Nutricionista
            2 - Paciente
        */
        Auth::verificaNivel(2);
        array_push($this->view->js, "views/telaperfil/perfil_usuario/app.vue.js");
        array_push($this->view->css, "views/telaperfil/perfil_usuario/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }
    
    function getInfos()
    {
        $this->model->getInfos();
    }

    function getRefeicoes()
    {
        $this->model->getRefeicoes();
    }
    
    function getInfoAlimentos()
    {
        $this->model->getInfoAlimentos();
    }
    
    function getAgua()
    {
        $this->model->getAgua();
    }

    function addAgua()
    {
        $this->model->addAgua();
    }
}