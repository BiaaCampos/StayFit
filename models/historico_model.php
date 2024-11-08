<?php

require_once("util/param.php");

class Historico_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaHistorico() 
    {
        $userId = session::get('ID');
        $userType = session::get('TIPO_USUARIO'); 
        
        if ($userType == 1) {
            $whereClause = 'WHERE c.id_nutricionista = :userId';
            $params[':userId'] = $userId;
        } elseif ($userType == 2) {
            $whereClause = 'WHERE c.id_usuario = :userId';
            $params[':userId'] = $userId;
        } elseif ($userType == 3) {
            $whereClause = '';
            $params = []; 
        } else {
            echo json_encode(["error" => "Tipo de usuário não reconhecido."]);
            exit;
        }
        
        $sql = "SELECT 
                    c.id AS id_consulta,
                    u.NOME AS nome_usuario,
                    n.NOME AS nome_nutricionista,
                    c.data_consulta,
                    c.descricao,
                    s.id AS id_status,
                    s.nome AS nome_status
                FROM 
                    consultas c
                JOIN 
                    usuarios u ON c.id_usuario = u.ID
                JOIN 
                    nutricionistas n ON c.id_nutricionista = n.ID
                JOIN 
                    status_consulta s ON c.id_status = s.id
                $whereClause";

        $result = $this->db->select($sql, $params);  
        
        if (count($result) > 0) {
            echo json_encode($result);
        } else {
            echo json_encode(["message" => "Nenhuma consulta encontrada."]);
        }
    }
}
