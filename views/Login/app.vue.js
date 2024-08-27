const newLocal = `
<div class="bg_login" >
  <div class="bg_image">
    <img id="plate" src="public/images/Login.svg" alt="Prato saldavel">
  </div>
  <div class="login-container">
    <div class="btn-group" id="select_group" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary" id="login" @click="selectBtn('login')">Login</button>
      <button type="button" class="btn btn-outline-primary" id="cadastro" @click="selectBtn('cadastro')">Cadastra-se</button>
    </div>
    <div id="login-form">
      <div v-show="selectedForm === 'login'" style="display: flex; flex-direction: column; align-items: center;">
        <h1>Login</h1>
        <form id="login" style="width: 40rem;">
          <label for="Email" class="form-label">Email</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Exemplo@hotmail.com" aria-label="Email" aria-describedby="basic-addon1" v-model="login.email">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-envelope'></i></span>
          </div>
          <label for="Senha" class="form-label">Senha</label>
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="***********" aria-label="Senha" aria-describedby="basic-addon1" v-model="login.senha">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-lock-alt'></i></span>
          </div>     
          <h6 id="forgot" href="/">Esqueceu sua senha?</h6>
          <div class="login-btns">
            <button class="btn" style="width: 25rem;" @click="enviaForm('login')">Entrar</button>
          </div>
        </form>
      </div>
      <div v-show="selectedForm === 'cadastro'" style="display: flex; flex-direction: column; align-items: center;">
        <h1>Cadastro</h1>
        <form id="cadastro" style="width: 40rem;">
          <label for="Nome" class="form-label">Nome</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="ABC" aria-label="Nome" aria-describedby="basic-addon1" v-model="cadastro.nome">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-user'></i></span>
          </div>
          <label for="Celular" class="form-label">Celular</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="(**) *****-****" aria-label="Celular" aria-describedby="basic-addon1" v-model="cadastro.cel">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-phone'></i></span>
          </div>     
          <label for="Email" class="form-label">Email</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Exemplo@hotmail.com" aria-label="Email" aria-describedby="basic-addon1" v-model="cadastro.email">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-envelope'></i></span>
          </div>  
          <label for="Senha" class="form-label">Senha</label>
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="***********" aria-label="Senha" aria-describedby="basic-addon1" v-model="cadastro.senha">
            <span class="input-group-text" id="basic-addon1"><i class='bx bx-lock-alt'></i></span>
          </div>     
          <div class="login-btns" style="margin-top: 3rem">
            <p id="forgot" href="/">Ao se inscrever, você concorda com a <a href="#">Política de privacidade e Temos</a> da StartFit</p>
            <button class="btn" style="width: 25rem;" @click="enviaForm('cadastro')">Cadastrar-se</button>
          </div>
        </form>
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
      login: {
        email: "",
        senha: ""
      },
      cadastro: {
        nome: "",
        cel: "",
        email: "",
        senha: ""
      }
    }
  },
  methods: {
    selectBtn(args) {
      this.selectedForm = args;

      if (args === 'login'){
        const last = document.getElementById("cadastro");
        last.classList = "btn btn-outline-primary";
      } else if (args === 'cadastro') {
        const last = document.getElementById("login");
        last.classList = "btn btn-outline-primary";
      }

      const btn = document.getElementById(args);
      btn.classList = "btn btn-primary"
    },
    enviaForm(args){
      console.log(args)
      console.log(this.login)
    }
  },
  mounted: function() {
    this.selectBtn("login");
  }

})