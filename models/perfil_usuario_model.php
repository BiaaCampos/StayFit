<?php

require_once("util/param.php");
class Perfil_usuario_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getInfos()
    {
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

    public function getInfoAlimentos()
    {
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        
        $dados = array(
            ':PAR_ID' => $id
        );

        $resultFav = $this->db->select("
            SELECT
                A.ID,
                A.NOME AS ALIMENTO,
                A.CALORIAS,
                A.PROTEINAS,
                A.CARBOIDRATOS,
                A.GORDURAS,
                A.FIBRAS,
                GA.NOME AS 'GRUPO_ALIMENTAR',
                FA.FAVORITO
            FROM
                STAYFIT.FAVORITOS_ALIMENTOS FA 
            JOIN 
                STAYFIT.ALIMENTOS A 
                ON FA.ALIMENTO_ID = A.ID
            JOIN 
                STAYFIT.GRUPOS_ALIMENTARES GA 
                ON A.ID_GRUPO_ALIMENTICIO = GA.ID
            WHERE 
                FA.USUARIO_ID = :PAR_ID
                AND FA.FAVORITO = 'S'", $dados);
            

        if(count($resultFav) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => $resultFav));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }

        echo($msg);
    }

    public function getRefeicoes()
    {
        $id = session::get('ID');
        
        $cardapio = [];
        
        for ($i=1; $i <= 5; $i++) { 
            $dados = array(
                ':PAR_ID' => $id,
                ':PAR_REFEICAO' => $i
            );

            $result = $this->db->select("
                SELECT
                    A.ID,
                    A.NOME AS ALIMENTO,
                    R.NOME AS REFEICAO,
                    CONCAT(RU.QUANTIDADE, 'g') AS QUANTIDADE,
                    A.CALORIAS,
                    A.PROTEINAS,
                    A.CARBOIDRATOS,
                    A.GORDURAS,
                    A.FIBRAS,
                    GA.NOME AS 'GRUPO_ALIMENTAR',
                    CASE 
                        WHEN FA.FAVORITO = 'S' THEN 'S'
                        ELSE 'N'
                    END AS 'FAVORITO'
                FROM
                    USUARIOS U
                JOIN
                    REGIME_USUARIO RU 
                    ON RU.ID_USUARIO = U.ID
                JOIN 
                    ALIMENTOS A 
                    ON RU.ID_ALIMENTO = A.ID
                JOIN 
                    REFEICOES R 
                    ON RU.ID_REFEICAO = R.ID
                JOIN GRUPOS_ALIMENTARES GA 
                    ON A.ID_GRUPO_ALIMENTICIO = GA.ID
                LEFT JOIN 
                    STAYFIT.FAVORITOS_ALIMENTOS FA 
                    ON A.ID = FA.ALIMENTO_ID 
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
                        $cardapio_item->refeicao = "cafe da tarde";
                        $cardapio_item->alimento = $result;
                        $cardapio[] = $cardapio_item;
                        break;
                        
                    case 4:
                        $cardapio_item->refeicao = "janta";
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
    
    public function getSubs()
    {
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        
        $dados = array(
            ':PAR_ID' => $id,
            ':PAR_ALIMENTO' => $post->alimentoSub,
        );
        
        $result = $this->db->select("
            SELECT
                A.ID,
                A.NOME AS ALIMENTO,
                R.NOME AS REFEICAO,
                CONCAT(RU.QUANTIDADE, 'g') AS QUANTIDADE,
                A.CALORIAS,
                A.PROTEINAS,
                A.CARBOIDRATOS,
                A.GORDURAS,
                A.FIBRAS,
                GA.ID AS 'ID_GRUPO',
                GA.NOME AS 'GRUPO_ALIMENTAR'
            FROM
                STAYFIT.USUARIOS U
            JOIN
                STAYFIT.REGIME_USUARIO RU 
                ON RU.ID_USUARIO = U.ID
            JOIN 
                STAYFIT.ALIMENTOS A 
                ON RU.ID_ALIMENTO = A.ID
            JOIN 
                STAYFIT.REFEICOES R 
                ON RU.ID_REFEICAO = R.ID
            JOIN 
                STAYFIT.GRUPOS_ALIMENTARES GA 
                ON A.ID_GRUPO_ALIMENTICIO = GA.ID
            WHERE 
                U.ID = :PAR_ID
                AND GA.ID = (
                    SELECT
                        A2.ID_GRUPO_ALIMENTICIO AS GRUPO
                    FROM
                        STAYFIT.ALIMENTOS A2
                    WHERE 
                        A2.ID = :PAR_ALIMENTO
                )
            GROUP BY 
                A.ID 
            ORDER BY 
                A.ID;", $dados);

        if (count($result) > 0) {
            $msg = json_encode(array("code" => "1", "msg" => "Seleção concluida", 'data' => $result));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }

        echo($msg);
    }

    public function favoritar()
    {
        $post = json_decode(file_get_contents('php://input'));
        $id = session::get('ID');
        // var_dump($post); die;
        
        if ($post->curtiu == 's') {
            try {
                // Tenta inserir o registro na tabela
                $result = $this->db->insert(
                    'stayfit.favoritos_alimentos',
                    array(
                        "usuario_id" => $id,
                        "alimento_id" => $post->ID
                    )
                );
        
                if ($result) {
                    // Sucesso na inserção
                    $msg = json_encode(array("code" => "1", "msg" => "Favorito Adicionado"));
                } else {
                    // Falha na execução (caso raro, apenas para consistência)
                    $msg = json_encode(array("code" => "0", "msg" => "Não foi possível favoritar o item"));
                }
            } catch (PDOException $e) {
                // Verifica se o erro é devido a duplicidade (SQLSTATE 23000 para UNIQUE/PRIMARY KEY)
                if ($e->getCode() == '45000') {
                    try {
                        // Faz o update para alternar o estado de favorito no registro existente
                        $updateResult = $this->db->update(
                            'stayfit.favoritos_alimentos',
                            array(
                                "favorito" => 'S',
                                "data_favorito" => date('Y-m-d H:i:s')
                            ),
                            "usuario_id = $id and alimento_id = $post->ID"
                        );
        
                        if ($updateResult) {
                            $msg = json_encode(array("code" => "1", "msg" => "Favorito Atualizado"));
                        } else {
                            $msg = json_encode(array("code" => "0", "msg" => "Não foi possível atualizar o favorito"));
                        }
                    } catch (PDOException $updateError) {
                        // Caso ocorra algum erro na atualização
                        $msg = json_encode(array("code" => "0", "msg" => "Erro ao atualizar favorito: " . $updateError->getMessage()));
                    }
                } else {
                    // Outros erros do banco de dados
                    $msg = json_encode(array("code" => "0", "msg" => "Erro ao inserir favorito: " . $e->getMessage()));
                }
            }
        } elseif ($post->curtiu == 'n'){
            $result = $this->db->update(
                'stayfit.favoritos_alimentos',
                array('favorito' => 'N'),
                "usuario_id = $id and alimento_id = $post->ID"
            );

            if ($result) {
                $msg = json_encode(array("code" => "1", "msg" => "Favorito removido"));
            } else {
                $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel desfavoritar o item"));
            }
        }

       

        echo($msg);
    }

    public function getAgua()
    {
        // $post = json_decode(file_get_contents('php://input'));
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

    public function addAgua()
    {
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