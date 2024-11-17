# Stayfit

## Introdução

O **Stayfit** foi desenvolvido para auxiliar nutricionistas a realizarem consultas com maior desempenho e agilidade no atendimento. Inicialmente, o projeto foi concebido para consultas online, mas, após feedback de profissionais da área, optou-se por focar em consultas presenciais, uma vez que a coleta de medidas é essencial para um atendimento eficaz.

### Objetivo

O objetivo do Stayfit é proporcionar uma plataforma que facilite o trabalho dos nutricionistas, oferecendo uma interface intuitiva e funcionalidades que atendam às necessidades do dia a dia. A estrutura do software é dividida em três visões principais:

- **Visão do Nutricionista**: Ferramentas para gerenciar consultas, pacientes e relatórios.
- **Visão do Usuário**: Interface amigável para que os pacientes possam agendar consultas e visualizar informações.
- **Visão do Admin**: Controle total sobre o sistema, permitindo a gestão de usuários e configurações.

### Modelo de Negócio

O Stayfit será comercializado para empresas de nutrição e nutricionistas recém-formados que desejam iniciar seu próprio negócio, oferecendo uma solução acessível e eficiente.

## Funcionalidades

### Visão do Nutricionista

- **Login**: Acesso seguro ao sistema.
- **Cadastro do Nutricionista**: Registro de novos nutricionistas na plataforma.
- **Relatórios**: Visualização de métricas como:
  - Meses com maior número de consultas.
  - Consultas canceladas, em andamento e finalizadas.
- **Histórico de Consultas**: Acesso a todas as consultas realizadas.
- **Perfil do Nutricionista**: Gerenciamento de informações pessoais e profissionais.
- **Marmitarias Parceiras**: Listagem de marmitarias que oferecem serviços, gerando uma fonte adicional de receita para o software.

### Visão do Usuário

- **Login**: Acesso seguro à conta do usuário.
- **Cadastro do Usuário**: Registro de novos usuários na plataforma.
- **Agendamento de Consulta**: Ferramenta para marcar consultas com nutricionistas.
- **Tela de Perfil**: Visualização de recomendações alimentares feitas pelo nutricionista, com a possibilidade de editar as recomendações conforme a disponibilidade de alimentos.
- **Histórico de Consultas**: Acesso a todas as consultas realizadas.
- **Marmitarias Parceiras**: Visualização de marmitarias que oferecem serviços, facilitando a escolha de opções de alimentação.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

```
/stayfit
│
├── /banco-dump
│   ├── /bdstayfitgi.sql                     # Para teste mas nao utilizado mais
│   ├── /dump-stayfit-05-11-2024.sql         # Último feito 
│   ├── /dump-stayfit-29-10-2024.sql         # Não completo
│   ├── /dump-stayfit-202409041214.sql       # Não completo
│   └── /ER-diagram.png                      # Visão do banco de dados
├── /controllers
│   ├── /agendarconsulta.php 
│   ├── /atendimento.php         
│   ├── /cadastrousuario.php    
│   ├── /historico.php      
│   ├── /index.php        
│   ├── /index.php        
│   ├── /Login.php         
│   ├── /Logout.php       
│   ├── /marmitarias.php        
│   ├── /pagamento.php       
│   ├── /perfil_nutricionista.php         
│   ├── /perfil_usuario.php         
│   ├── /relatorio.php          
│   └── /telaErro.php
├── /libs
│   ├── /Auth.php          # Classe responsável pela autenticação e gerenciamento de sessão do usuário.
│   ├── /Bootstrap.php     # Classe que inicializa a aplicação, gerencia a URL e carrega os controllers.
│   ├── /Controller.php    # Classe base para controllers, responsável por carregar models e renderizar views.
│   ├── /Database.php      # Classe que estende PDO para gerenciar conexões e operações com o banco de dados.
│   ├── /Model.php         # Classe base para models, que inicializa a conexão com o banco de dados.
│   ├── /Session.php       # Classe para manipulação de sessões, incluindo métodos para iniciar, definir e destruir sessões.
│   └── /View.php          # Classe responsável pela renderização de views, incluindo o título da página. 
├── /models
│   ├── /agendarconsulta_model.php 
│   ├── /atendimento_model.php         
│   ├── /cadastrousuario_model.php    
│   ├── /historico_model.php      
│   ├── /index_model.php
│   ├── /index_model.php
│   ├── /Login_model.php
│   ├── /Logout_model.php
│   ├── /marmitarias_model.php
│   ├── /pagamento_model.php
│   ├── /perfil_nutricionista_model.php         
│   ├── /perfil_usuario_model.php
│   ├── /relatorio_model.php          
│   └── /telaErro_model.php     
│
├── /node_modules
│
├── /public               # Diretório público para arquivos acessíveis via web, como CSS e JS.
├── /util                 # Diretório para funções utilitárias e auxiliares da aplicação.
├── /views                # Diretório para as views (páginas) da aplicação.
├── .htaccess             # Configurações do servidor Apache, incluindo regras de reescrita de URL.
├── builder.php           # Script para gerar automaticamente arquivos de modelos e controladores.
├── config.php            # Arquivo de configuração com constantes de conexão e outras definições.
├── index.php             # Ponto de entrada da aplicação, inicializa o sistema.
├── LICENSE               # Arquivo de licença do projeto, especificando os direitos de uso.
├── package-lock.json     # Arquivo gerado automaticamente que bloqueia as versões das dependências do projeto.
├── package.json          # Arquivo de configuração do npm, listando dependências e informações do projeto.
└── README.md             # Documentação do projeto
```

## Como Usar

1. **Instalação**: Clone o repositório dentro de um software permite criar e gerenciar servidores web locais se e instale as dependências.
   ```bash
   git clone https://github.com/BiaaCampos/StayFit.git
   cd stayfit
   ```
   Pegue o arquivo do db e rode no seu banco de preferência

2. **Execução**: Inicie o servidor de desenvolvimento, ligando o apache e o mysql.

3. **Acessar a Aplicação**: Abra o navegador e acesse `http://localhost/stayfit/atendimento`.


## Imagens/Vídeos estrutura das páginas
Acesse esse link para o vídeo do projeto rodando: 
Acesse esse link para ver as páginas através de imagens: 


## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
