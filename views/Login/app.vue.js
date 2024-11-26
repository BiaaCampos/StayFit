const newLocal = `
<div class="bg_login" >
  <div id="spinner">
    <div class="lds-ellipsis">
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
    </div>
    <h3 style="color: #3dae4b">
      Aguarde
    </h3>
  </div>
  <div class="bg_image">
    <img id="plate" src="public/images/Login.svg" alt="Prato saudavel">
  </div>
  <div class="login-container">
    <div class="logo-mobile">
      <img src="public/images/icons-menu/logopreta.svg" alt="" srcset="" class="icones-sidebar" width="200">
    </div>
    <div class="btn-group" id="select_group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary" id="login" @click="selectBtn('login')">Login</button>
      <button type="button" class="btn btn-outline-primary" id="cadastro" @click="selectBtn('cadastro')">Cadastra-se</button>
    </div>
    <!-- Login -->
    <div id="login-form">
      <div v-show="selectedForm === 'login'" style="display: flex; flex-direction: column; align-items: center;">
        <h1>Login</h1>
        <div id="login" style="width: 100%;">
          <div class="input-group mb-3">
            <ejs-dropdownlist 
              id='tipoLogin'
              ref='tipoLogin'
              floatLabelType="Auto"
              cssClass="e-outline"
              :dataSource='listaTipo'
              :fields='Fields'
              @change='LimpaInput()'
              placeholder='Você é usuário ou nutricionista? *'
              v-model='login.tipo'>
            </ejs-dropdownlist>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3" v-show='login.tipo != "1"'>
            <ejs-maskedtextbox
                ref="loginCPF"
                id="loginCPF"
                mask="000.000.000-00"
                floatLabelType="Auto"
                cssClass="e-outline"
                maxlength="11"
                placeholder='CPF *'
                v-model="login.cpf">
            </ejs-maskedtextbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3" v-show='login.tipo == "1"'>
            <ejs-maskedtextbox
                ref="loginCRN"
                id="loginCRN"
                mask="\\CRN/>LL 000000"
                floatLabelType="Auto"
                cssClass="e-outline"
                maxlength="11"
                placeholder='CRN *'
                v-model="login.crn">
            </ejs-maskedtextbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-textbox 
                floatLabelType="Auto"
                ref="senha"
                id="senha"
                v-model="login.senha"
                type="password"
                style="text-transform: unset;"
                maxlength="100"
                cssClass="e-outline"
                placeholder="Senha *">
            </ejs-textbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="login-btns">
            <button class="btn" style="width: 25rem;" @click="enviaForm('login')">Entrar</button>
          </div>
        </div>
      </div>
      <!-- Cadastro -->
      <div v-show="selectedForm === 'cadastro'" style="display: flex; flex-direction: column; align-items: center; padding: 0 20px">
        <h1>Cadastro</h1>
        <div id="cadastro" style="width: 100%;">
          <div class="input-group mb-3">
            <ejs-textbox 
                floatLabelType="Auto"
                ref="nome"
                id="nome"
                v-model="cadastro.nome"
                style="text-transform: unset;"
                maxlength="100"
                cssClass="e-outline"
                placeholder="Nome *">
            </ejs-textbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-maskedtextbox
                ref="celular"
                id="celular"
                mask="(##) #####-####"
                floatLabelType="Auto"
                cssClass="e-outline"
                maxlength="11"
                placeholder='Celular *'
                v-model="cadastro.cel">
            </ejs-maskedtextbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-dropdownlist 
              id='genero' 
              ref='cadGenero'
              floatLabelType="Auto"
              cssClass="e-outline"
              :dataSource='listaGenero'
              :fields='Fields'
              placeholder='Qual gênero você se identifica?'
              v-model='cadastro.genero'>
            </ejs-dropdownlist>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-dropdownlist 
              id='tipo' 
              ref='cadTipo'
              floatLabelType="Auto"
              cssClass="e-outline"
              :dataSource='listaTipo'
              :fields='Fields'
              placeholder='Você é usuário ou nutricionista?'
              v-model='cadastro.tipo'>
            </ejs-dropdownlist>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-textbox 
                floatLabelType="Auto"
                ref="cadEmail"
                id="cadEmail"
                v-model="cadastro.email"
                type="email"
                style="text-transform: unset;"
                maxlength="100"
                cssClass="e-outline"
                placeholder="Email *">
            </ejs-textbox>
            <span class='error-input-msg'></span>
          </div>
          <!-- CRN -->
          <div class="input-group mb-3" v-show='cadastro.tipo == "1"'>
            <ejs-maskedtextbox
                ref="CRN"
                id="CRN"
                mask="\\CRN/>LL 000000"
                floatLabelType="Auto"
                cssClass="e-outline"
                maxlength="11"
                placeholder='CRN *'
                v-model="cadastro.crn">
            </ejs-maskedtextbox>
            <span class='error-input-msg'></span>
          </div>
          <!-- CPF -->
          <div class="input-group mb-3" v-show='cadastro.tipo == "2"'>
            <ejs-maskedtextbox
                ref="CPF"
                id="CPF"
                mask="000.000.000-00"
                floatLabelType="Auto"
                cssClass="e-outline"
                maxlength="11"
                placeholder='CPF *'
                v-model="cadastro.cpf">
            </ejs-maskedtextbox>
            <span class='error-input-msg'></span>
          </div>
          <div class="input-group mb-3">
            <ejs-datepicker 
              floatLabelType="Auto"
              id="nascimento" 
              ref="nascimento"
              v-model="cadastro.dataNascimento"
              cssClass="e-outline"
              format="dd/MM/yyyy"
              :openOnFocus="true"
              placeholder="Data de nascimento*">
            </ejs-datepicker>
            <span class='error-input-msg'></span>
          </div>     
          <div class="input-group mb-3">
            <ejs-textbox 
                floatLabelType="Auto"
                ref="cadSenha"
                id="cadSenha"
                v-model="cadastro.senha"
                type="password"
                style="text-transform: unset;"
                maxlength="100"
                cssClass="e-outline"
                placeholder="Senha *">
            </ejs-textbox>
            <span class='error-input-msg'></span>
          </div>     
          <div class="input-group mb-3">
            <ejs-textbox 
                floatLabelType="Auto"
                ref="cadConfirmaSenha"
                id="confirmaSenha"
                v-model="cadastro.confirmaSenha"
                type="password"
                style="text-transform: unset;"
                maxlength="100"
                cssClass="e-outline"
                placeholder="Confirme sua Senha *">
            </ejs-textbox>
            <span class='error-input-msg'></span>
          </div>
          <ejs-checkbox 
            id="check"
            label='Ao se inscrever, você concorda com a <a href="#">Política de privacidade e Temos</a> da StartFit' 
            :checked="cadastro.conf"
            v-model="cadastro.conf">
          </ejs-checkbox>
          <div class="login-btns" style="margin-top: 1rem">
            <button class="btn" style="width: 25rem;" @click="enviaForm('cadastro')">Cadastrar-se</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const AppTemplate = newLocal;
Vue.component('AppVue', {
  template: AppTemplate,
  data: function() {
    return {
      selectedForm: "login",
      especializacoes: [],
      listaGenero: [],
      listaTipo: [],
      Fields: { text: 'DESCRICAO', value: 'ID' },
      login: {
        tipo: "",
        cpf: "",
        crn: "",
        senha: ""
      },
      cadastro: {
        nome: "",
        cel: "",
        email: "",
        crn: "",
        senha: "",
        confirmaSenha: "",
        conf: false,
        tipo: "",
        genero: "",
        cpf: "",
        dataNascimento: ""
      },
    }
  },
  methods: {
    getInfos(){
      axios.get(BASE + "/Login/getInfos").then((res) => {
        this.listaTipo = res.data.data.tipo
        this.listaGenero = res.data.data.genero
        this.especializacoes = res.data.data.especialidade
      })
    },
    abrirModal() {
      this.$refs.nutriInfos.show();
    },
    fecharModal() {
      this.$refs.nutriInfos.hide();
    },
    selectBtn(args) {
      this.selectedForm = args;

      if (args === 'login'){
        const last = document.getElementById("cadastro");
        last.classList = "btn btn-outline-primary";
        this.LimpaInputCad();
      } else if (args === 'cadastro') {
        const last = document.getElementById("login");
        last.classList = "btn btn-outline-primary";
        this.LimpaInputLog();
      }

      const btn = document.getElementById(args);
      btn.classList = "btn btn-primary"
    },
    enviaForm(args){
      const spinner = document.getElementById('spinner');
      spinner.style.display = 'flex';

      if (args === 'login'){
        if (
          validarInput(this.login.tipo, this.$refs.tipoLogin) &&
          (validarInput(this.login.cpf, this.$refs.loginCPF) || validarInput(this.login.crn, this.$refs.loginCRN)) &&
          validarInput(this.login.senha, this.$refs.senha) 
        ){
          this.LimpaInputCad();
          var crn = this.login.crn.substring(1)
          this.login.crn = crn

          console.log('login')
          axios.post(BASE + "/Login/login", this.login).then((res) => {
            if (res.data.code == 1) {
              setTimeout(() => {
                spinner.style.display = 'none';
                if (res.data.TIPO_USUARIO == 1) {
                  window.location.href = BASE + '/perfil_nutricionista'
                } else {
                  window.location.href = BASE + '/perfil_usuario'
                }
              }, 5000);
            } else {
              mainLayout.sToast(res.data.msg, '', "danger");
              spinner.style.display = 'none';
            }
          })

        } else {
          mainLayout.sToast(`Preencha os campos obricatórios(*)`, '', "warning");
          spinner.style.display = 'none';
        }
      }
      if (args === 'cadastro'){
        if (
          validarInput(this.cadastro.nome, this.$refs.nome) &&
          validarInput(this.cadastro.cel, this.$refs.celular) &&
          validarInput(this.cadastro.tipo, this.$refs.cadTipo) &&
          validarInput(this.cadastro.email, this.$refs.cadEmail) &&
          validarInput(this.cadastro.dataNascimento, this.$refs.nascimento) &&
          (validarInput(this.cadastro.cpf, this.$refs.CPF) ||
          validarInput(this.cadastro.crn, this.$refs.CRN)) &&
          validarInput(this.cadastro.senha, this.$refs.cadSenha) &&
          validarInput(this.cadastro.confirmaSenha, this.$refs.cadConfirmaSenha) &&
          verificaSenha(this.cadastro.senha, this.cadastro.confirmaSenha, this.$refs.cadSenha, this.$refs.cadConfirmaSenha) &&
          validaTermos(this.cadastro.conf)
        ){
          this.LimpaInputLog()
          if (this.cadastro.tipo == "1") {
            var crn = this.cadastro.crn.substring(1)
            this.cadastro.crn = crn
          }
          console.log('cadastro')
          axios.post(BASE + "/Login/Cadastrar_usuario", this.cadastro).then((res) => {
            if(res.data.code === 1) {
              setTimeout(() => {
                mainLayout.sToast(res.data.msg);
                this.selectedForm = 'login';
                spinner.style.display = 'none';
              }, 5000);
            }else{
              mainLayout.sToast(res.data.msg, '', "danger");
              spinner.style.display = 'none';
            }
          })
        } else {
          spinner.style.display = 'none';
        }
      }
    },
    LimpaInputLog(){
      LimpaInput(this.login.cpf, this.$refs.loginCPF);
      LimpaInput(this.login.crn, this.$refs.loginCRN);
      LimpaInput(this.login.senha, this.$refs.senha);
    },
    LimpaInputCad(){
      LimpaInput(this.cadastro.nome, this.$refs.nome);
      LimpaInput(this.cadastro.cel, this.$refs.celular);
      LimpaInput(this.cadastro.email, this.$refs.cadEmail);
      LimpaInput(this.cadastro.cpf, this.$refs.CPF);
      LimpaInput(this.cadastro.crn, this.$refs.CRN);
      LimpaInput(this.cadastro.senha, this.$refs.cadSenha);
      LimpaInput(this.cadastro.confirmaSenha, this.$refs.cadConfirmaSenha);
    },
    confirmaSession() {
      const spinner = document.getElementById('spinner');
      spinner.style.display = 'flex';
      
      axios.get(BASE + "/Login/confirmaSession").then((res) => {
        if(res.data.code == 1) {
          setTimeout(() => {
            if (res.data.TIPO_USUARIO == 1) {
              window.location.href = BASE + '/perfil_nutricionista'
            } else {
              window.location.href = BASE + '/perfil_usuario'
            }
            spinner.style.display = 'none';
          }, 3000);
        } else {
          spinner.style.display = 'none';
        }
      })
    }
  },
  mounted: function() {
    this.selectBtn("login");
    this.getInfos();
    this.confirmaSession();
  }

})