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
        // Obtendo o ID do usuário e o tipo de usuário da sessão
        $userId = session::get('ID');
        $userType = session::get('TIPO_USUARIO'); 
        
        // Verifica o nível de acesso para restringir os dados
        if ($userType == 1) {  // Nutricionista ou Admin
            $whereClause = 'WHERE c.id_nutricionista = :userId';
            $params[':userId'] = $userId;
        } elseif ($userType == 2) {  // Usuário comum
            $whereClause = 'WHERE c.id_usuario = :userId';
            $params[':userId'] = $userId;
        } elseif ($userType == 3) {  // Admin (pode ver todos)
            $whereClause = '';
            $params = []; // Nenhuma filtragem necessária para o Admin
        } else {
            // Caso o tipo de usuário seja inválido
            echo json_encode(["error" => "Tipo de usuário não reconhecido."]);
            exit;
        }

        $sql = "
            SELECT 
                c.id AS id_consulta,
                u.NOME AS nome_usuario,
                n.NOME AS nome_nutricionista,
                c.data_consulta,
                c.descricao,
                sa.descricao AS nome_status
            FROM 
                consultas c
            JOIN 
                usuarios u ON c.id_usuario = u.ID
            JOIN 
                nutricionistas n ON c.id_nutricionista = n.ID
            JOIN 
                status_anamnese sa ON c.id_status = sa.id
            $whereClause
            ORDER BY 
                c.data_consulta";
                
        // Executa a consulta com os parâmetros
        $result = $this->db->select($sql, $params);  
        
        // Retorna os resultados ou uma mensagem de erro caso não haja resultados
        if (count($result) > 0) {
            echo json_encode($result);
        } else {
            echo json_encode(["message" => "Nenhuma consulta encontrada."]);
        }
    }
    
    
}
