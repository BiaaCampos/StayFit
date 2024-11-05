
<?php

require_once("util/param.php");

class login_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getInfos()
    {
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

    public function Cadastrar_usuario()
    {
        $post = json_decode(file_get_contents('php://input'));

        $nome = $post->nome;
        $cell = $post->cel;
        $email = $post->email;
        $senha = $post->senha;
        $confirma_senha = $post->confirmaSenha;
        $tipo = $post->tipo;
        $crn = $post->crn;
        $cpf = $post->cpf;
        $genero = $post->genero;
        $nascimento = date_format(new DateTimeImmutable($post->dataNascimento), 'Y/m/d');

        /* VALIDAR E-MAIL */
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            true;
        } else{
            $msg = json_encode(array("code" => "0", "msg" => "O E-mail está inválido!!"));
        }

        /* VALIDAR CPF */
        if ($tipo == "2"){$valid_cpf = validaCPF($cpf);
        if($valid_cpf == false){
            exit(json_encode(array("code" => "0", "msg" => "O CPF é inválido!!")));
        }}

        /* VALIDAR SENHA */
        if($senha != $confirma_senha){
            $msg = json_encode(array("code" => "0", "msg" => "Senha diferentes, Por favor, digite novamente."));
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
        
        try {
            if ($tipo == "1") {
                $seq = $this->db->select("CALL stayfit.PROC_GETSEQUENCIA('nutricionistas')");
                $result = $this->db->insert(
                    'stayfit.nutricionistas', 
                    array(
                        'ID' => $seq[0]->SEQ,
                        'NOME' => $nome, 
                        'EMAIL' => $email, 
                        'SENHA' => $senha_hash, 
                        'CRN' => $crn, 
                        'TIPO_USUARIO' => $tipo,
                        'TELEFONE' => $cell,
                        'DATA_NASCIMENTO' => $nascimento
                    )
                );
            } else {
                $seq = $this->db->select("CALL stayfit.PROC_GETSEQUENCIA('usuarios')");
                $result = $this->db->insert(
                    'stayfit.usuarios', 
                    array(
                        'ID' => $seq[0]->SEQ,
                        'NOME' => $nome, 
                        'SENHA' => $senha_hash, 
                        'ID_GENERO' => $genero,
                        'CPF' => $cpf, 
                        'EMAIL' => $email, 
                        'TELEFONE' => $cell,
                        'TIPO_USUARIO' => $tipo,
                        'DATA_NASCIMENTO' => $nascimento
                    )
                );
            }
    
            // Consultar usuário cadastrado para verificar sucesso
            $dados = array(':par_id' => $seq[0]->SEQ);
            $res = $this->db->select("SELECT * FROM " . ($tipo == "1" ? "STAYFIT.nutricionistas" : "STAYFIT.usuarios") . " WHERE id = :par_id", $dados);
    
            if ($res > 0) {
                $msg = json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.", "SEQ" => $seq[0]->SEQ));
            } else {
                $msg = json_encode(array("code" => "0", "msg" => "Erro ao inserir."));
            }
        } catch (PDOException $e) {
            // Captura do código de erro SQLSTATE e mensagem de erro
            $sqlState = $e->getCode();
            $errorMsg = $e->getMessage();
            $pos = strpos($errorMsg, ' ERRO:');
            if ($pos !== false) {
                $errorMsg = substr($errorMsg, $pos + 7);
            }

            $msg = json_encode(array("code" => "0", "sqlstate" => $sqlState, "msg" => "Erro ao inserir: $errorMsg"));
        }

        echo($msg);
    }

    public function login()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        $cpf = $post->cpf;
        $crn = $post->crn;
        $senha = $post->senha;
        $tipo = $post->tipo;

		if ($tipo == 1) {
            $dados=array(
                ':CRN' => $crn,
                ':SENHA' => $senha
            );
            
            $result = $this->db->select("
                SELECT
                    N.ID,
                    N.NOME,
                    N.EMAIL,
                    N.SENHA,
                    N.CRN,
                    N.TELEFONE,
                    N.TIPO_USUARIO
                FROM
                    STAYFIT.nutricionistas n
                WHERE 
                    N.CRN = :CRN
                    AND N.SENHA = SHA2(:SENHA, 256)
                    AND N.ATIVO = 'S';", $dados
            );

            if (count($result) > 0) {
                // login
                Session::init();
                Session::set('ID', $result[0]->ID);
                Session::set('NOME', $result[0]->NOME);
                Session::set('CRN', $result[0]->CRN);
                Session::set('TELEFONE', $result[0]->TELEFONE);
                Session::set('EMAIL', $result[0]->EMAIL);
                Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
                Session::set('logado', true);
                
                $msg = array("code" => 1,"msg" => "success", "TIPO_USUARIO" => $result[0]->TIPO_USUARIO);
            }
            else{
                $msg = array("code" => "0", "msg" => "Usuário não encontrado, reveja seus dados e tente novamente");
            }
        } elseif ($tipo == 2){
            $dados=array(
                ':CPF' => $cpf,
                ':SENHA' => $senha
            );

            $result = $this->db->select("
                SELECT
                    U.ID,
                    U.NOME,
                    U.SENHA,
                    U.TIPO_USUARIO,
                    U.CPF,
                    U.EMAIL,
                    U.TELEFONE,
                    U.ATIVO
                FROM
                    STAYFIT.USUARIOS U
                WHERE 
                    U.CPF = :CPF
                    AND U.SENHA = SHA2(:SENHA, 256)
                    AND U.ATIVO = 'S';", $dados
            );
            
            if (count($result) > 0) {
                // login
                Session::init();
                Session::set('ID', $result[0]->ID);
                Session::set('NOME', $result[0]->NOME);
                Session::set('CPF', $result[0]->CPF);
                Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
                Session::set('EMAIL', $result[0]->EMAIL);
                Session::set('TELEFONE', $result[0]->TELEFONE);
                Session::set('logado', true);

                $msg = array("code" => 1,"msg" => "success", "TIPO_USUARIO" => $result[0]->TIPO_USUARIO);
            }
            else{
                $msg = array("code" => "0", "msg" => "Usuário não encontrado, reveja seus dados e tente novamente");
            }
        }
        echo(json_encode($msg));
    }

    public function confirmaSession()
    {
        @session_start();
        // var_dump($_SESSION); die;
        if(isset($_SESSION) && !empty($_SESSION)){
            $user = session::get("TIPO_USUARIO");
            $msg = json_encode(array("code" => "1", "msg" => "Sessão encontrada", 'TIPO_USUARIO' => $user));
        } else {
            $msg = json_encode(array("code" => "0", "msg" => "sem sessão"));
        }

        echo($msg);
    }
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