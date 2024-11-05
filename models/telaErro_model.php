
<?php

require_once("util/param.php");

class TelaErro_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ReturnType(){
        @session_start();
        
        if(isset($_SESSION) && !empty($_SESSION)){
            $user = session::get("TIPO_USUARIO");
            $msg = json_encode(array("code" => "1", "msg" => "Sessão encontrada", 'data' => $user));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "sem sessão", 'data' => 0));
        }

        echo($msg);
    }

}