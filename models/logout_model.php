
<?php

require_once("util/param.php");

class logout_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function logout(){
        @session_start();
        session_destroy();
        $msg = json_encode(array("code" => 1, "msg" => "success"));
        echo($msg);
    }

}