
<?php

require_once("util/param.php");

class Index_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function logout()
    {
        // logout
        @session_start();
        session_destroy();
        header('Location: login/');
        exit;
        echo("OK");
    }

    public function listaNutricionista() {
        $sql="select id, nome, crn from stayfit.nutricionistas order by id";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

}