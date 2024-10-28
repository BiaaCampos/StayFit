<?php

require_once("util/param.php");

class Calendario_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDisponibilidade($data, $id_nutricionista) 
    {
        // Consulta SQL para obter os horários disponíveis para uma data específica
        $sql = "SELECT horario 
                FROM disponibilidade_nutricionistas 
                WHERE data = :data 
                AND id_nutricionista = :id_nutricionista 
                AND id_status_disponibilidade = 1"; // 1 para 'disponível'
    
        // Preparar a consulta
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':data', $data);
        $stmt->bindParam(':id_nutricionista', $id_nutricionista);
        $stmt->execute();
    
        // Obter os resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Retornar os resultados em formato JSON
        header('Content-Type: application/json');
        echo json_encode($result);
    }
    
    
}
