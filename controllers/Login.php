<?php

class Login extends Controller
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
        array_push($this->view->js, "views/Login/app.vue.js");
        array_push($this->view->css, "views/Login/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

}