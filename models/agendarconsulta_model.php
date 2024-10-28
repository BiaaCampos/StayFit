<?php

require_once("util/param.php");

class AgendarConsulta_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function listaNutricionista() 
    {  
        $sql="select id, nome, crn from stayfit.nutricionistas order by id";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

    public function horariosDisponiveis($idNutricionista, $data)
    {
        $sql = "SELECT horario FROM disponibilidade_nutricionistas 
                WHERE id_nutricionista = :idNutricionista 
                AND data = :data 
                AND id_status_disponibilidade = 1";
    
        $params = [
            ':idNutricionista' => $idNutricionista,
            ':data' => $data
        ];
    
        $result = $this->db->select($sql, $params);
        echo(json_encode($result));
    }

    public function agendarConsulta() 
    {
        $post = json_decode(file_get_contents('php://input'));
        
        $id_usuario = $post->id_usuario;
        $id_nutricionista = $post->id_nutricionista;
        $data_consulta = $post->data_consulta;
        $descricao = $post->descricao ?? null;
        $id_status = $post->id_status;
    
        if (empty($id_usuario) || empty($id_nutricionista) || empty($data_consulta) || empty($id_status)) {
            echo json_encode(["error" => "Todos os campos são obrigatórios."]);
            return;
        }
    
        $sql = "INSERT INTO consultas (id_usuario, id_nutricionista, data_consulta, descricao, id_status) VALUES (:id_usuario, :id_nutricionista, :data_consulta, :descricao, :id_status)";
        
        $params = [
            ':id_usuario' => $id_usuario,
            ':id_nutricionista' => $id_nutricionista,
            ':data_consulta' => $data_consulta,
            ':descricao' => $descricao,
            ':id_status' => $id_status
        ];
    
        $result = $this->db->insert($sql, $params);
        
        if ($result) {
            echo json_encode(["success" => "Consulta agendada com sucesso."]);
        } else {
            echo json_encode(["error" => "Erro ao agendar a consulta."]);
        }
    }
    

    
}