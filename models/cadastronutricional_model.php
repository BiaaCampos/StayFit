<?php

require_once("util/param.php");

class CadastroNutricional_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaMultiselectObjetivos()
    {
        $post = json_decode(file_get_contents('php://input'));

        $sql = "SELECT 
                    id,
                    descricao
                FROM 
                    stayfit.objetivos_nutricionais";

        $result = $this->db->select($sql);
        echo(json_encode($result));
    }    

    public function listaMultiselectFrequencia()
    {
        $post = json_decode(file_get_contents('php://input'));

        $sql = "SELECT 
                    a.id, 
                    a.descricao
                FROM questao q
                JOIN 
                    alternativa a ON q.id = a.id_questao
                WHERE q.id = 3";

        $result = $this->db->select($sql);
        echo(json_encode($result));
    } 
    
    public function listaMultiselectRefeicao()
    {
        $post = json_decode(file_get_contents('php://input'));

        $sql = "SELECT 
                    a.id, 
                    a.descricao
                FROM questao q
                JOIN alternativa a ON q.id = a.id_questao
                WHERE q.id = 10";

        $result = $this->db->select($sql);
        echo(json_encode($result));
    } 

    public function cadastrarPreAnamnese() {
        $post = json_decode(file_get_contents('php://input'));
    
        $id_paciente = $post->id_paciente;
        $id_usuario_modificacao = $post->id_usuario_modificacao;
        $respostas = $post->respostas;
    
        // Validação básica
        if (!$id_paciente || !$id_usuario_modificacao || empty($respostas)) {
            echo json_encode(['code' => 0, 'msg' => 'Campos obrigatórios estão faltando!']);
            return;
        }

        foreach ($respostas as $resposta) {
            $id_pergunta = $resposta->id_pergunta;
            $resposta_texto = $resposta->resposta;

            if (is_array($resposta_texto)) {
                $resposta_texto = implode(', ', $resposta_texto);
            }
    
            // Verifica se a resposta é válida
            if (strlen(trim($resposta_texto)) == 0) {
                echo json_encode(['code' => 0, 'msg' => 'Preencha todas as respostas corretamente!']);
                return;
            }

            $insert = $this->db->insert('stayfit.resposta', array(
                'id_anamnese' => 1,
                'id_questao' => $id_pergunta,
                'texto_resposta' => $resposta_texto,
                'id_usuario' => $id_paciente,
                'id_nutricionista' => $id_usuario_modificacao
            ));
    
            if (!$insert) {
                echo json_encode(['code' => 0, 'msg' => 'Erro ao salvar as respostas no banco de dados!']);
                return;
            }
        }
    
        // Resposta de sucesso
        echo json_encode(['code' => 1, 'msg' => 'Respostas salvas com sucesso!']);
    }
    
    
}
