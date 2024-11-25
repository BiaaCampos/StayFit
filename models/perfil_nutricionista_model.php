
<?php

require_once("util/param.php");

class Perfil_nutricionista_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDrops()
    {
        // $post = json_decode(file_get_contents('php://input'));
        // $dataFormatada = date('Y-m-d', strtotime($post->data));
        $id = session::get('ID');
        $usuarios = [];
        $status = [];


        $result = $this->db->select("
            SELECT
                U.ID,
                CONCAT(U.NOME, ' - ', U.ID) AS NOME 
            FROM
                STAYFIT.USUARIOS U
            WHERE 
                U.ATIVO = 'S';"
        );

        if(count($result) > 0) {
            $usuarios[] = $result;
            $res = $this->db->select("
                SELECT
                    SC.ID,
                    CONCAT(SC.NOME, ' - ', SC.ID) as NOME
                FROM
                    STAYFIT.STATUS_CONSULTA SC;"
            );

            if(count($res) > 0) {
                $status[] = $res;
                $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => ['users' => $usuarios,
                'status' => $status]));
            } else {
                $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
            }
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        

        echo($msg);
    }
    public function getDropHorario()
    {
        $post = json_decode(file_get_contents('php://input'));
        $dataFormatada = date('Y-m-d', strtotime($post->data));
        $id = session::get('ID');
        
        $dados = array(
            ':PAR_NUTRI' => $id,
            ':PAR_DATA' => $dataFormatada
        );

        $result = $this->db->select("
            SELECT
                DATE_FORMAT(DN.HORARIO, '%H:%i') AS HORARIO
            FROM
                STAYFIT.DISPONIBILIDADE_NUTRICIONISTAS DN
            WHERE 
                DN.id_nutricionista = :PAR_NUTRI
                AND DN.`data` = :PAR_DATA
                AND DN.id_status_disponibilidade = 1", 
            $dados
        );

        if(count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => $result));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }

        echo($msg);
    }
    public function recebeData()
    {
        // Obtém o JSON enviado para o endpoint
        $post = json_decode(file_get_contents('php://input'));
    
        // Valida se o JSON contém a propriedade 'data'
        $dataFormatada = null;
        if (!empty($post) && !empty($post->data)) {
            $data = DateTime::createFromFormat('d/m/Y', $post->data);
            if ($data) {
                $dataFormatada = $data->format('Y-m-d');
            }
        }
    
        // Obtém o ID do nutricionista da sessão
        $id = session::get('ID');
    
        // Cria array de parâmetros
        $dados = array();
        $queryWhere = "";
    
        // Condições opcionais para parâmetros
        if (!empty($id)) {
            $queryWhere .= " N.ID = :PAR_NUTRI ";
            $dados[':PAR_NUTRI'] = $id;
        }
        if (!empty($dataFormatada)) {
            if (!empty($queryWhere)) $queryWhere .= " AND "; // Adiciona AND se já houver condição
            $queryWhere .= " C.DATA_CONSULTA = :PAR_DATA ";
            $dados[':PAR_DATA'] = $dataFormatada;
        }
    
        // Caso não haja nenhuma condição, evita WHERE vazio
        if (!empty($queryWhere)) {
            $queryWhere = "WHERE " . $queryWhere;
        }
    
        // Consulta SQL
        $sql = "
            SELECT 
                CONCAT(U.NOME, ' - ', U.ID) AS NOME,
                DATE_FORMAT(C.DATA_CONSULTA, '%d/%m/%Y') AS DATA_CONSULTA,
                DATE_FORMAT(C.HORA_CONSULTA, '%H:%i') AS HORA_CONSULTA,
                C.DESCRICAO,
                CONCAT(SC.NOME, ' - ', SC.ID) AS 'SITUACAO'
            FROM
                STAYFIT.NUTRICIONISTAS N 
            JOIN
                CONSULTAS C 
                ON C.ID_NUTRICIONISTA = N.ID
            JOIN 
                STAYFIT.USUARIOS U 
                ON C.ID_USUARIO = U.ID 
            JOIN 
                STAYFIT.STATUS_CONSULTA SC 
                ON C.ID_STATUS = SC.ID
            $queryWhere
        ";
    
        // Executa a consulta
        try {
            $result = $this->db->select($sql, $dados);
            if (count($result) > 0) {
                $msg = json_encode(array("code" => "1", "msg" => "Seleção concluída", 'data' => $result));
            } else {
                $msg = json_encode(array("code" => "0", "msg" => "Nenhum dado encontrado"));
            }
        } catch (Exception $e) {
            $msg = json_encode(array("code" => "0", "msg" => "Erro na execução da consulta", "error" => $e->getMessage()));
        }
    
        echo($msg);
    }
    public function enviaFormDisp()
    {
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        $dataFormatada = $dataFormatada = date('Y-m-d', strtotime($post->DATA_CONSULTA));
        $dataHoraUtc = new DateTime($post->HORA_CONSULTA, new DateTimeZone('UTC')); 
        $dataHoraLocal = $dataHoraUtc->setTimezone(new DateTimeZone('America/Sao_Paulo'));
        $horaConsulta = $dataHoraLocal->format('H:i:00');
        
        $result = $this->db->insert(
            'stayfit.disponibilidade_nutricionistas', 
            array(
                'id_nutricionista' => $id,
                'data' => $dataFormatada, 
                'horario' => $horaConsulta,
            )
        );

        if($result > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "Horário adicionado com sucesso"));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel adicionar o horário"));
        }

        echo($msg);
    }
    public function enviaForm()
    {
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        $idUser = $post->NOME;
        $dataFormatada = $dataFormatada = date('Y-m-d', strtotime($post->DATA_CONSULTA));
        $descricao = $post->DESCRICAO;
        $idStatus = $post->SITUACAO;
        $horaConsulta = date('H:i:00', strtotime($post->HORA_CONSULTA));
        
        $result = $this->db->insert(
            'stayfit.consultas', 
            array(
                'id_usuario' => $idUser, 
                'id_nutricionista' => $id, 
                'data_consulta' => $dataFormatada, 
                'descricao' => $descricao, 
                'id_status' => $idStatus,
                'hora_consulta' => $horaConsulta,
            )
        );

        if($result > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "Consulta marcada com sucesso"));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel marcar a consulta"));
        }

        echo($msg);
    }

}