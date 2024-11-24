<?php

require_once("util/param.php");
class Perfil_usuario_model extends Model
{
    public function __construct()
    {
        parent::__construct();
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
                U.NOME,
                CASE
                    WHEN U.ALTURA IS NULL THEN "NÃO INFORMADO"
                    ELSE U.ALTURA
                END AS ALTURA,
                CASE
                    WHEN U.PESO_ATUAL IS NULL THEN "NÃO INFORMADO"
                    ELSE U.PESO_ATUAL
                END AS PESO_ATUAL,
                CASE
                    WHEN U.PESO_IDEAL IS NULL THEN "NÃO INFORMADO"
                    ELSE U.PESO_IDEAL
                END AS PESO_IDEAL,
                CASE
                    WHEN UO.ID_OBJETIVO IS NULL THEN "NÃO INFORMADO"
                    ELSE GROUP_CONCAT( DISTINCT O.DESCRICAO ORDER BY O.DESCRICAO DESC SEPARATOR ", ")
                END AS OBJETIVO,
                CASE
                    WHEN U.EMAIL IS NULL THEN "NÃO INFORMADO"
                    ELSE U.EMAIL
                END AS EMAIL,
                CASE 
                    WHEN DATE_FORMAT(U.DATA_NASCIMENTO, "%d/%m/%Y") IS NULL THEN "NÃO INFORMADO"
                    ELSE U.DATA_NASCIMENTO
                END AS NASCIMENTO,
                G.DESCRICAO AS GENERO,
                CASE
                    WHEN U.TELEFONE IS NULL THEN "NÃO INFORMADO"
                    ELSE U.TELEFONE
                END AS TELEFONE
            FROM
                STAYFIT.USUARIOS U
            JOIN 
                STAYFIT.GENEROS G 
                ON
                U.ID_GENERO = G.ID
            LEFT JOIN
                STAYFIT.USUARIO_OBJETIVOS UO
                ON
                U.ID = UO.ID_USUARIO
            LEFT JOIN 
                STAYFIT.OBJETIVOS_NUTRICIONAIS O
                ON
                UO.ID_OBJETIVO = O.ID
            WHERE
                U.ID = :PAR_ID;', $dados);
        if (count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "seleção concluida", 'data' => $result));
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        echo($msg);
    }

    public function getInfoAlimentos(){
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        var_dump($post); die;
        
        $dados = array(
            ':PAR_ID' => $id,
            // ':PAR_REFEICAO' => 
        );

        $result = $this->db->select("
            SELECT
                A.NOME AS ALIMENTO,
                R.NOME AS REFEICAO,
                CONCAT(RU.QUANTIDADE, 'g') AS QUANTIDADE,
                A.CALORIAS,
                A.PROTEINAS,
                A.CARBOIDRATOS,
                A.GORDURAS,
                A.FIBRAS,
                GA.NOME AS 'GRUPO_ALIMENTAR'
            FROM
                STAYFIT.USUARIOS U
            JOIN
                STAYFIT.REGIME_USUARIO RU
                ON U.ID = RU.ID_USUARIO
            JOIN 
                STAYFIT.ALIMENTOS A 
                ON RU.ID_ALIMENTO = A.ID
            JOIN 
                STAYFIT.ALIMENTOS_REFEICOES AR 
                ON A.ID = AR.ID_ALIMENTO
            JOIN 
                STAYFIT.REFEICOES R 
                ON AR.ID_REFEICAO = R.ID
            JOIN 
                STAYFIT.GRUPOS_ALIMENTARES GA 
                ON A.ID_GRUPO = GA.ID
            WHERE 
                U.ID = :PAR_ID
                AND R.ID = :PAR_REFEICAO
            ORDER BY 
                r.id;", $dados);
        

        if(empty($cardapio)) {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        } else {
            $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => $cardapio));
        }

        echo($msg);
    }

    public function getRefeicoes(){
        $id = session::get('ID');
        
        $cardapio = [];
        
        for ($i=1; $i <= 5; $i++) { 
            $dados = array(
                ':PAR_ID' => $id,
                ':PAR_REFEICAO' => $i
            );

            $result = $this->db->select("
                SELECT
                    A.NOME AS ALIMENTO,
                    R.NOME AS REFEICAO,
                    CONCAT(RU.QUANTIDADE, 'g') AS QUANTIDADE,
                    A.CALORIAS,
                    A.PROTEINAS,
                    A.CARBOIDRATOS,
                    A.GORDURAS,
                    A.FIBRAS,
                    GA.NOME AS 'GRUPO_ALIMENTAR'
                FROM
                    STAYFIT.USUARIOS U
                JOIN
                    STAYFIT.REGIME_USUARIO RU
                    ON U.ID = RU.ID_USUARIO
                JOIN 
                    STAYFIT.ALIMENTOS A 
                    ON RU.ID_ALIMENTO = A.ID
                JOIN 
                    STAYFIT.ALIMENTOS_REFEICOES AR 
                    ON A.ID = AR.ID_ALIMENTO
                JOIN 
                    STAYFIT.REFEICOES R 
                    ON AR.ID_REFEICAO = R.ID
                JOIN 
                    STAYFIT.GRUPOS_ALIMENTARES GA 
                    ON A.ID_GRUPO = GA.ID
                WHERE 
                    U.ID = :PAR_ID
                    AND R.ID = :PAR_REFEICAO
                ORDER BY 
	                r.id;", $dados);
            if (count($result) > 0) {
                $cardapio_item = new stdClass;
                switch ($i) {
                    case 1:
                        $cardapio_item->refeicao = "cafe da manha";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                    
                    case 2:
                        $cardapio_item->refeicao = "almoco";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                    
                    case 3:
                        $cardapio_item->refeicao = "janta";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                            
                    case 4:
                        $cardapio_item->refeicao = "cafe da tarde";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                    
                    case 5:
                        $cardapio_item->refeicao = "ceia";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                }
            }

            if(empty($cardapio)) {
                $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
            } else {
                $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => $cardapio));
            }
        }

        echo($msg);
    }

    public function getAgua(){
        $id = session::get('ID');

        $dados = array(
            ':PAR_ID' => $id
        );
        $result = $this->db->select("
            SELECT 
                COALESCE (CASE 
                    WHEN FLOOR(SUM(IA.QUANTIDADE_ML) / 1000) % 10 = 0 THEN 
                        ROUND(SUM(IA.QUANTIDADE_ML) / 1000, 2)  -- Se for uma dezena, apresenta em litros
                    ELSE 
                        SUM(IA.QUANTIDADE_ML)                   -- Caso contrário, apresenta em mililitros
                END, 0) AS TOTAL_CONSUMIDO,
                CONCAT(COALESCE(ROUND((SUM(IA.QUANTIDADE_ML) / 3000) * 100, 2), 0), '%') AS PORCENTAGEM_CONSUMO
            FROM
                STAYFIT.USUARIOS U
            JOIN
                STAYFIT.INGESTAO_AGUA IA 
                ON U.ID = IA.ID_USUARIO
            WHERE
                DATE(IA.DATA) = CURRENT_DATE()
                AND U.ID = :PAR_ID;", $dados);

        if (count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "seleção concluida", 'data' => $result));
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        
        echo($msg);
    }

    public function addAgua(){
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');

        $qnt = $post->qntd;
        $tipo = $post->tipo;

        $ins = $tipo == "+" ? $qnt : $tipo . $qnt;
        
        $result = $this->db->insert(
            'STAYFIT.INGESTAO_AGUA', 
            array(
                'id_usuario' => $id,
                'quantidade_ml' => $ins
            )
        );

        if ($result) {
            $msg = json_encode(array("code" => "1", "msg" => "Adição feita com Sucesso"));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Erro ao inserir, tente novamente mais tarde"));
        }
        
        echo($msg);
    }
}