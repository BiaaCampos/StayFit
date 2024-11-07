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
    public function getInfos(){
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        
        $dados = array(
            ':PAR_ID' => $id
        );

        $result = $this->db->select('
            SELECT
                U.ID,
                U.NOME
            FROM
                STAYFIT.USUARIOS U
            WHERE
                U.ID = :PAR_ID;', $dados);
        if (count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "seleção concluida", 'data' => $result));
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        echo($msg);
    }
    public function horariosDisponiveis($idNutricionista, $data)
    {
        $sql = "SELECT horario FROM stayfit.disponibilidade_nutricionistas 
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
        
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
    
        $id_usuario = $_SESSION['ID'];
        $id_nutricionista = $post->id_nutricionista ?? null;
        $data_consulta = $post->data_consulta ?? null;
        $horario = $post->horario ?? null;
        $descricao = $post->descricao ?? null;
        $id_status = $post->id_status ?? null;
        
        if (!DateTime::createFromFormat('Y-m-d', $data_consulta)) {
            exit(json_encode(["code" => "0", "msg" => "Data da consulta inválida."]));
        }
    
        $dadosConsulta = [
            'id_usuario' => $id_usuario,
            'id_nutricionista' => $id_nutricionista,
            'data_consulta' => $data_consulta,
            'descricao' => $descricao,
            'id_status' => $id_status
        ];
    
        $result = $this->db->insert('stayfit.consultas', $dadosConsulta);
    
        if ($result) {
            $updateData = [
                'id_status_disponibilidade' => 2
            ];
        
            $conditions = "id_nutricionista = $id_nutricionista AND data = '$data_consulta' AND horario = '$horario'";
        
            $updateResult = $this->db->update('stayfit.disponibilidade_nutricionistas', $updateData, $conditions);
        
            if ($updateResult) {
                exit(json_encode(["code" => "1", "msg" => "Consulta agendada com sucesso! Aguarde, estamos te redirecionando..."]));
            } else {
                exit(json_encode(["code" => "0", "msg" => "Não foi possível agendar a consulta, tente novamente em outro horário"]));
            }
        } else {
            exit(json_encode(["code" => "0", "msg" => "Erro ao agendar a consulta."]));
        }
        
        
    }
    
    
}