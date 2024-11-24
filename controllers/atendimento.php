<?php

class Atendimento extends Controller
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

        $this->view->title = "Atendimento";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "public/components/cad_nutricional/modal_atendimento.js");
        array_push($this->view->js, "views/nutricionista/atendimento/app.vue.js");
        array_push($this->view->css, "views/nutricionista/atendimento/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function salvarAtendimento() 
    {  
        $this->model->salvarAtendimento();
    }

    function buscarPacientePorCPF() 
    {  
        $this->model->buscarPacientePorCPF();
    }

    function getPacientePorCPF() 
    {  
        $this->model->getPacientePorCPF();
    }

    function getObjetivosNutricionais() 
    {  
        $this->model->getObjetivosNutricionais();
    }

    function getGeneros() 
    {  
        $this->model->getGeneros();
    }

    function loadRefeicoes() 
    {  
        $this->model->loadRefeicoes();
    }
    
    function loadAlimentos() 
    {  
        $this->model->loadAlimentos();
    }

    function salvarRegimeUsuario() 
    {
        $post = json_decode(file_get_contents('php://input'));
        if ($this->model->salvarRegimeUsuario($post)) {
            echo json_encode(["code" => "1", "msg" => "Registro salvo com sucesso."]);
        } else {
            echo json_encode(["code" => "0", "msg" => "Erro ao salvar registro."]);
        }
    }

    function editarRegimeUsuario() 
    {
        $post = json_decode(file_get_contents('php://input'));
        if ($this->model->editarRegimeUsuario($post)) {
            echo json_encode(["code" => "1", "msg" => "Registro editado com sucesso."]);
        } else {
            echo json_encode(["code" => "0", "msg" => "Erro ao editar registro."]);
        }
    }

    function excluirRegimeUsuario() 
    {
        $post = json_decode(file_get_contents('php://input'));
        if (isset($post->id) && $this->model->excluirRegimeUsuario($post->id)) {
            echo json_encode(["code" => "1", "msg" => "Registro excluído com sucesso."]);
        } else {
            echo json_encode(["code" => "0", "msg" => "Erro ao excluir registro."]);
        }
    }
}
