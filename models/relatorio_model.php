<?php

require_once("util/param.php");

class Relatorio_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    // Função para obter consultas mensais
    public function getmensais() {
        // Verifica se o usuário está autenticado
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }

        $id_usuario = $_SESSION['ID'];

        // Verifica se o usuário é um nutricionista
        $sql_verifica_nutricionista = "SELECT id FROM stayfit.nutricionistas WHERE id = :id_usuario";
        $params = [':id_usuario' => $id_usuario];
        $result_nutricionista = $this->db->select($sql_verifica_nutricionista, $params);

        if (count($result_nutricionista) === 0) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não é um nutricionista."]));
        }

        // Consulta mensal
        $sql = "SELECT MONTHNAME(c.data_consulta) AS Mes, COUNT(c.id) AS Total_Consultas 
                FROM consultas c 
                WHERE c.id_nutricionista = :id_nutricionista
                GROUP BY MONTH(c.data_consulta) 
                ORDER BY MONTH(c.data_consulta);";
        
        $params = [':id_nutricionista' => $id_usuario];
        $result = $this->db->select($sql, $params);
        
        echo(json_encode($result));
    }

    // Função para obter status das consultas
    public function getstatus() {
        // Verifica se o usuário está autenticado
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }

        $id_usuario = $_SESSION['ID'];

        // Verifica se o usuário é um nutricionista
        $sql_verifica_nutricionista = "SELECT id FROM stayfit.nutricionistas WHERE id = :id_usuario";
        $params = [':id_usuario' => $id_usuario];
        $result_nutricionista = $this->db->select($sql_verifica_nutricionista, $params);

        if (count($result_nutricionista) === 0) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não é um nutricionista."]));
        }

        // Consulta de status
        $sql = "SELECT s.nome AS Status, COUNT(c.id) AS Total_Consultas 
                FROM consultas c 
                JOIN status_consulta s ON c.id_status = s.id 
                WHERE c.id_nutricionista = :id_nutricionista
                GROUP BY s.nome;";
        
        $params = [':id_nutricionista' => $id_usuario];
        $result = $this->db->select($sql, $params);
        
        echo(json_encode($result));
    }

    // Função para obter gêneros
    public function getgeneros() {
        // Verifica se o usuário está autenticado
        if (!isset($_SESSION['ID'])) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não autenticado."]));
        }

        $id_usuario = $_SESSION['ID'];

        // Verifica se o usuário é um nutricionista
        $sql_verifica_nutricionista = "SELECT id FROM stayfit.nutricionistas WHERE id = :id_usuario";
        $params = [':id_usuario' => $id_usuario];
        $result_nutricionista = $this->db->select($sql_verifica_nutricionista, $params);

        if (count($result_nutricionista) === 0) {
            exit(json_encode(["code" => "0", "msg" => "Usuário não é um nutricionista."]));
        }

        // Consulta de gêneros
        $sql = "SELECT g.descricao AS Genero, COUNT(c.id) AS Total_Consultas 
                FROM consultas c 
                JOIN usuarios u ON c.id_usuario = u.ID 
                JOIN generos g ON u.ID_GENERO = g.id 
                WHERE c.id_nutricionista = :id_nutricionista
                GROUP BY g.descricao;";
        
        $params = [':id_nutricionista' => $id_usuario];
        $result = $this->db->select($sql, $params);
        
        echo(json_encode($result));
    }
}
