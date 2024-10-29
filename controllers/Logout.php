<?php

class Logout extends Controller
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
        $this->view->title = "Logout";
    }

    function logout()
    {
        $this->model->logout();
    }
}