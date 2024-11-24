<?php

require_once("util/param.php");

class Atendimento_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getObjetivosNutricionais() {
        $sql="SELECT id,descricao FROM stayfit.objetivos_nutricionais";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

    public function getGeneros() {
        $sql="SELECT id,descricao FROM stayfit.generos";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

    public function buscarPacientePorCPF($cpf) {
        $dados = array(':PAR_CPF' => $cpf);
        
        $result = $this->db->select("
            SELECT 
                ID,
                NOME,
                DATA_NASCIMENTO,
                TELEFONE,
                ATIVO,
                PESO_ATUAL AS peso,
                ALTURA AS altura,
                ID_GENERO AS sexo,
                CPF
            FROM 
                STAYFIT.USUARIOS 
            WHERE 
                CPF = :PAR_CPF;", $dados);
    
        return $result;
    }    

    public function getPacientePorCPF() {
        $post = json_decode(file_get_contents('php://input'));
        if (!isset($post->cpf)) {
            echo json_encode(["code" => "0", "msg" => "CPF não fornecido."]);
            return;
        }
    
        $paciente = $this->buscarPacientePorCPF($post->cpf);
        if (count($paciente) > 0) {
            echo json_encode(["code" => "1", "data" => $paciente]);
        } else {
            echo json_encode(["code" => "0", "msg" => "Paciente não encontrado."]);
        }
    }

    public function salvarAtendimento() 
    {
        $post = json_decode(file_get_contents('php://input'));

        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
        $id_nutricionista = $_SESSION['ID'];
        if (!isset($post->id_paciente)) {
            echo json_encode(["code" => "0", "msg" => "ID do paciente não fornecido."]);
            return;
        }
    
        $dados = [
            'id_paciente' => $post->id_paciente,
            'id_nutricionista' => $id_nutricionista,
            'data_atendimento' => date('Y-m-d H:i:s'),
            'cpf' => $post->cpf ?? null,
            'nome_completo' => $post->nome_completo ?? null,
            'peso' => $post->peso ?? null,
            'altura' => $post->altura ?? null,
            'sexo' => $post->sexo ?? null,
            'endereco' => $post->endereco ?? null,
            'telefone' => $post->telefone ?? null,
            'ocupacao' => $post->ocupacao ?? null,
            'objetivo' => $post->objetivo ?? null,
            'habitos_alimentares' => $post->habitos_alimentares ?? null,
            'ingestao_hidrica' => $post->ingestao_hidrica ?? null,
            'ingestao_cafe' => $post->ingestao_cafe ?? null,
            'qualidade_sono' => $post->qualidade_sono ?? null,
            'horas_sono' => $post->horas_sono ?? null,
            'habito_intestinal' => $post->habito_intestinal ?? null,
            'habito_urinario' => $post->habito_urinario ?? null,
            'situacao_estresse' => $post->situacao_estresse ?? null,
            'comentarios_adicionais' => $post->comentarios_adicionais ?? null,
            'diagnostico_clinico' => $post->diagnostico_clinico ?? null,
            'medicamentos' => $post->medicamentos ?? null,
            'historico_familiar' => $post->historico_familiar ?? null,
        ];
    
        $result = $this->db->insert('atendimento', $dados);
    
        if ($result) {
            echo json_encode(["code" => "1", "msg" => "Atendimento salvo com sucesso."]);
        } else {
            echo json_encode(["code" => "0", "msg" => "Erro ao salvar atendimento."]);
        }
    }
    
    public function loadAlimentos(){
        $sql="SELECT id, nome FROM stayfit.alimentos";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }
    
    public function loadRefeicoes(){
        $sql="SELECT id, nome FROM stayfit.refeicoes";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

    public function salvarRegimeUsuario($dados) {
        $sql = "INSERT INTO regime_usuario (id_usuario, id_alimento, quantidade) VALUES (:id_usuario, :id_alimento, :quantidade)";
        return $this->db->insert($sql, $dados);
    }
    
    public function editarRegimeUsuario($dados) {
        $sql = "UPDATE regime_usuario SET id_alimento = :id_alimento, quantidade = :quantidade WHERE id = :id";
        return $this->db->update($sql, $dados);
    }
    
    public function excluirRegimeUsuario($id) {
        $sql = "DELETE FROM regime_usuario WHERE id = :id";
        return $this->db->delete($sql, ['id' => $id]);
    }
    
}