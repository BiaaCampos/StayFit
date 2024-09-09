<?php

require_once("util/param.php");

class CadastroNutricional_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaPerguntasHistorico()
    {
        $post = json_decode(file_get_contents('php://input'));
        $tipo_id = $post->tipo_id;

        $sql = "SELECT p.id, p.texto_pergunta 
                FROM perguntas p
                WHERE p.id_tipo_pergunta = :tipo_id";

        $params = array(":tipo_id" => $tipo_id);
        $result = $this->db->select($sql, $params);
        echo(json_encode($result));
    }    

    public function salvarRespostas()
    {
        $post = json_decode(file_get_contents('php://input'));
        if (!$post || !isset($post->id_paciente) || !isset($post->id_usuario_modificacao) || !isset($post->respostas)) {
            echo json_encode(["code" => 0, "msg" => "Dados inválidos."]);
            return;
        }
    
        $id_paciente = $post->id_paciente;
        $id_usuario_modificacao = $post->id_usuario_modificacao;
        $respostas = $post->respostas;
    
        foreach ($respostas as $resposta) {
            $sql = "INSERT INTO cadastro_nutricional (id_paciente, id_pergunta, resposta, id_usuario_modificacao)
                    VALUES (:id_paciente, :id_pergunta, :resposta, :id_usuario_modificacao)
                    ON DUPLICATE KEY UPDATE resposta = VALUES(resposta), id_usuario_modificacao = VALUES(id_usuario_modificacao)";
            
            $params = array(
                ":id_paciente" => $id_paciente,
                ":id_pergunta" => $resposta->id_pergunta,
                ":resposta" => $resposta->resposta,
                ":id_usuario_modificacao" => $id_usuario_modificacao
            );
    
            $stmt = $this->db->prepare($sql);
    
            if (!$stmt->execute($params)) {
                echo json_encode(["code" => 0, "msg" => "Erro ao salvar resposta."]);
                return;
            }
        }
    
        echo json_encode(["code" => 1, "msg" => "Respostas salvas com sucesso!"]);
    }    

}
