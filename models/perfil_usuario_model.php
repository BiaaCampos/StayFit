
<?php

require_once("util/param.php");

class Perfil_usuario_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getInfos(){
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        
        $dados = array(
            ':PAR_ID' => $id
        );
        $result = $this->db->select("
            SELECT
                U.ID,
                U.NOME,
                CASE 
                    WHEN U.ALTURA IS NULL THEN 'NÃO INFORMADO'
                    ELSE U.ALTURA
                END AS ALTURA,
                CASE 
                    WHEN U.PESO_ATUAL IS NULL THEN 'NÃO INFORMADO'
                    ELSE U.PESO_ATUAL
                END AS PESO_ATUAL,
                CASE 
                    WHEN U.PESO_IDEAL IS NULL THEN 'NÃO INFORMADO'
                    ELSE U.PESO_IDEAL
                END AS PESO_IDEAL,
                CASE 
                    WHEN uo.ID_OBJETIVO IS NULL THEN 'NÃO INFORMADO'
                    ELSE O.DESCRICAO 
                END AS OBJETIVO,
                CASE 
                    WHEN U.EMAIL IS NULL THEN 'NÃO INFORMADO'
                    ELSE U.EMAIL
                END AS EMAIL,
                G.DESCRICAO AS GENERO,
                CASE 
                    WHEN U.TELEFONE IS NULL THEN 'NÃO INFORMADO'
                    ELSE U.TELEFONE
                END AS TELEFONE
            FROM
                STAYFIT.USUARIOS U
            JOIN 
                STAYFIT.GENEROS G 
                ON U.ID_GENERO = G.ID
            LEFT JOIN
                STAYFIT.usuario_objetivos uo
                ON U.id = uo.ID_USUARIO
            LEFT JOIN 
                stayfit.objetivos_nutricionais o
                ON uo.ID_OBJETIVO = o.id
            WHERE 
                U.ID = :PAR_ID;", $dados);
        if (count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "seleção concluida", 'data' => $result));
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        echo($msg);
    }
}