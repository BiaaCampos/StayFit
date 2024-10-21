
<?php

require_once("util/param.php");

class login_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getInfos(){
        $post = json_decode(file_get_contents('php://input'));
        $result = $this->db->select("
            SELECT
                TU.ID,
                TU.DESCRICAO
            FROM
                STAYFIT.TIPO_USUARIO TU
            ORDER BY 
                TU.id;
        ");
        if (count($result) > 0) {
            $res = $this->db->select("
            SELECT
                G.ID,
                G.DESCRICAO
            FROM
                STAYFIT.GENEROS G
            ORDER BY
                G.ID;
            ");
            
            if (count($res) > 0) {
                $resEspec = $this->db->select("
                SELECT
                    E.ID,
                    E.DESCRICAO
                FROM
                    STAYFIT.ESPECIALIDADES E
                ORDER BY
                    E.ID;
                ");
                if (count($resEspec) > 0) {
                    $dados = array("tipo" => $result, "genero" => $res, "especialidade" => $resEspec);
                    $msg = json_encode(array("code" => 1, "msg" => "success", "data" => $dados));
                } else {
                    $msg = json_encode(array("code" => 0, "msg" => "Não foi possivel fazer a seleção"));
                }
            } else {
                $msg = json_encode(array("code" => 0, "msg" => "Não foi possivel fazer a seleção"));
            }
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Não foi possivel fazer a seleção"));
        }
        echo($msg);
    }

    public function Cadastrar_usuario(){
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post); die;

        $nome = $post->nome;
        $cell = $post->cel;
        $email = $post->email;
        $senha = $post->senha;
        $confirma_senha = $post->confirmaSenha;
        $tipo = $post->tipo;
        $crn = $post->crn;
        $cpf = $post->cpf;
        $genero = $post->genero;

        /* VALIDAR E-MAIL */
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            true;
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "Opss!! E-mail está inválido!!"));
        }

        if($senha != $confirma_senha){
            $msg = json_encode(array("code" => "0", "msg" => "Senha diferentes!!.Por favor, digite novamente."));
        }

        /* DECODIFICAÇAO DA SENHA */
        $senha_hash = hash('sha256', $senha);

        if($nome == null){
            $msg = json_encode(array("code" => "0", "msg" => "Por favor, insira o Nome."));
        }
        if($cell == null){
            $msg = json_encode(array("code" => "0", "msg" => "Por favor, insira o Celular."));
        }
        if($email == null){
            $msg = json_encode(array("code" => "0", "msg" => "Por favor, insira o Email."));
        }
        if($tipo == null){
            $msg = json_encode(array("code" => "0", "msg" => "Por favor, insira o Tipo da conta."));
        }
        if($crn == null && $tipo == "1"){
            $msg = json_encode(array("code" => "0", "msg" => "Por favor, insira o CRN."));
        }

        $nome = strtoupper($nome);
        $email = strtolower($email);

        if($tipo == "1"){
            // ESPECIALIDADE*
            $result = $this->db->insert(
                'stayfit.nutricionistas', 
                array(
                    'NOME' =>$nome, 
                    'EMAIL' => $email, 
                    'SENHA' => $senha_hash, 
                    'CRN' => $crn, 
                    'TIPO_USUARIO' => $tipo,
                    'TELEFONE' => $cell
                )
            );

            if ($result){
                $msg = json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso."));
            } else{
                $msg = json_encode(array("code" => "0", "msg" => "Erro ao inserir."));
            }
        } else {
            // ALTURA*    PESO_ATUAL*    PESO_IDEAL*    ID_OBJETIVO    ID_PLANO*
            $result = $this->db->insert(
                'stayfit.usuarios', 
                array(
                    'NOME' =>$nome, 
                    'SENHA' => $senha_hash, 
                    'ID_GENERO' => $genero,
                    'CPF' => $cpf, 
                    'EMAIL' => $email, 
                    'TELEFONE' => $cell,
                    'ID_TIPO_USUARIO' => $tipo
                )
            );

            if ($result){
                $msg = json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso."));
            } else{
                $msg = json_encode(array("code" => "0", "msg" => "Erro ao inserir."));
            }
        }

        echo($msg);
    }

    function validaCPF($cpf) {
        // Extrai somente os números
        $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
         
        // Verifica se foi informado todos os digitos corretamente
        if (strlen($cpf) != 11) {
            return false;
        }
    
        // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }
    
        // Faz o calculo para validar o CPF
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }
        return true;
    }
}