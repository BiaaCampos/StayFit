<?php
/**
 * 
 */
class Auth
{
    
    public static function autentica()
    {
        @session_start();
        $logged = $_SESSION['logado'];
        if ($logged == false) {
            @session_destroy();
            header('Location: login/');
            exit;
        }
    }
    
    public static function verificaNivel($nivelNecessario){
        @session_start();
        $nivel = $_SESSION["TIPO_USUARIO"];

        if ($nivel != $nivelNecessario) {
            header('Location: telaErro/');
            die;
        } else {
            return true;
        }
    }

    public static function logout()
    {
        @session_start();
        $logged = $_SESSION['logado'];
        if ($logged == true) {
            session_destroy();
            header('Location: login/');
            exit;
        }
    }

    public static function login()
    {
        @session_start();
        @session_destroy();
    }
    
}