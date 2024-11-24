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
    
        $result = $this->db->insert('stayfit.atendimento', $dados);
        
        if ($result) {
            $stmt = $this->db->prepare("
                SELECT id 
                FROM stayfit.consultas 
                WHERE id_usuario = ? 
                AND id_nutricionista = ? 
                AND id_status != 2
                ORDER BY data_consulta DESC 
                LIMIT 1
            ");
            $stmt->execute([$post->id_paciente, $id_nutricionista]);
            
            $ultima_consulta = $stmt->fetch();

            if ($ultima_consulta) {
                $stmt = $this->db->prepare("
                    UPDATE stayfit.consultas 
                    SET id_status = 2 
                    WHERE id = ?
                ");
                $stmt->execute([$ultima_consulta['id']]);

                echo json_encode(["code" => "1", "msg" => "Atendimento salvo com sucesso."]);
            }

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

    public function salvarRecomendacao()
    {
        $post = json_decode(file_get_contents('php://input'));

        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
    
        $id_usuario = $post->id_paciente;
        $id_alimento = $post->alimento ?? null;
        $id_refeicao = $post->refeicao ?? null;
        $quantidade = $post->quantidade ?? null;


        if (!$id_usuario || !$id_alimento || !$id_refeicao || !$quantidade) {
            exit(json_encode(["code" => "0", "msg" => "Todos os campos são obrigatórios."]));
        }
    
        $dados = [
            'id_usuario' => $id_usuario,
            'id_alimento' => $id_alimento,
            'id_refeicao' => $id_refeicao,
            'quantidade' => $quantidade
        ];
    
        $result = $this->db->insert('stayfit.regime_usuario', $dados);
    
        if ($result) {
            exit(json_encode(["code" => "1", "msg" => "Recomendação salva com sucesso!"]));
        } else {
            exit(json_encode(["code" => "0", "msg" => "Erro ao salvar a recomendação."]));
        }
    }
    public function editarRegimeUsuario()
    {
        $post = json_decode(file_get_contents('php://input'));
        
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
    
        $id = $post->id ?? null;
        $id_usuario = $post->id_paciente;  
        $id_alimento = $post->alimento ?? null; 
        $id_refeicao = $post->refeicao ?? null; 
        $quantidade = $post->quantidade ?? null;
    
        if (!$id || !$id_usuario || !$id_alimento || !$id_refeicao || !$quantidade) {
            exit(json_encode(["code" => "0", "msg" => "Todos os campos são obrigatórios."]));
        }
        $dadosAtualizacao = [
            'id_usuario' => $id_usuario,
            'id_alimento' => $id_alimento,
            'quantidade' => $quantidade,
            'id_refeicao' => $id_refeicao
        ];
    
        $conditions = "id = $id";
    
        $updateResult = $this->db->update('stayfit.regime_usuario', $dadosAtualizacao, $conditions);
    
        if ($updateResult) {
            exit(json_encode(["code" => "1", "msg" => "Recomendação atualizada com sucesso!"]));
        } else {
            exit(json_encode(["code" => "0", "msg" => "Erro ao atualizar a recomendação."]));
        }
    }
    
    public function excluirRegimeUsuario()
    {
        $post = json_decode(file_get_contents('php://input'));
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
    
        $id = $post->id ?? null;
        $id_usuario = $post->id_paciente;
    
        if (!$id) {
            exit(json_encode(["code" => "0", "msg" => "ID do registro é obrigatório."]));
        }
    
        $dados = [
            ':id' => $id,
            ':id_usuario' => $id_usuario
        ];
    
        $sql = "DELETE FROM stayfit.regime_usuario 
                WHERE id = :id AND id_usuario = :id_usuario";
    
        try {
            $stmt = $this->db->prepare($sql);
            if ($stmt->execute($dados)) {
                exit(json_encode(["code" => "1", "msg" => "Registro excluído com sucesso!"]));
            } else {
                exit(json_encode(["code" => "0", "msg" => "Erro ao excluir o registro."]));
            }
        } catch (PDOException $e) {
            exit(json_encode(["code" => "0", "msg" => "Erro: " . $e->getMessage()]));
        }
    }

    public function listaRecomendacao() {
        $post = json_decode(file_get_contents('php://input'));
    
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }
    
        $id_paciente = $post->id_paciente ?? null;
    
        if (!$id_paciente) {
            exit(json_encode(["code" => "0", "msg" => "ID do paciente não fornecido."]));
        }
    
        $sql = "SELECT 
                    ru.id AS regime_id, 
                    a.nome AS alimento_nome, 
                    r.nome AS refeicao_nome, 
                    ru.quantidade 
                FROM 
                    stayfit.regime_usuario ru 
                JOIN 
                    stayfit.alimentos a ON ru.id_alimento = a.id 
                JOIN 
                    stayfit.refeicoes r ON ru.id_refeicao = r.id 
                WHERE 
                    ru.id_usuario = :id_paciente";
    
        $result = $this->db->select($sql, ['id_paciente' => $id_paciente]);
        
        if ($result) {
            echo(json_encode(["code" => "1", "data" => $result])); 
        } else {
            echo(json_encode(["code" => "0", "msg" => "Nenhum dado encontrado."]));
        }
    }
}