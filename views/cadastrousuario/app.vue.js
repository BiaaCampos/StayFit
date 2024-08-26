const newLocal = `
<div class="bg_cadastro">
    <div class="lado_esquerdo" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo">
            <img src="public/images/images-cadastros/salada.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito">
        <div class="div_direita">
            <div class="titulo_lado_direito">
                <h1>
                    Bem-vindo à 
                </h1>
                <img src="public/images/images-cadastros/stayfit_preta.svg" alt="logo" class="logo_stayfit" />
            </div>
            <form>
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo">
                </div>
                <div class="form-group">
                    <label for="celular">Celular:</label>
                    <input type="tel" id="celular" name="celular" placeholder="Digite seu número de celular">
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail">
                </div>
                <div class="form-group">
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha">
                </div>
                <button class="button_cadastronutricional" type="submit">Próximo</button>
            </form>
        </div>
    </div>
</div>
`;

const AppTemplate = newLocal;
Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
        }
    },
    methods: {
    },
    mounted: function() {
    }

})
