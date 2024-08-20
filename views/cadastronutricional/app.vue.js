const newLocal = `
<div class="bg_cadastros">
    <div class="lado_esquerdo" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo">
            <img src="public/images/images-cadastros/salada.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito">
        <div class="div_direita">
            <div class="titulo_lado_direito">
                <h1>
                    Bem vindo à 
                </h1>
                <img src="public/images/images-cadastros/stayfit_preta.svg" alt="logo" class="logo_stayfit" />
            </div>
            <form>
                <div class="form-group">
                    <div class="number">
                        1
                    </div>
                    <div>
                        <label for="q1">
                            Qual é o seu nome?
                        </label>
                        <input type="text" id="q1" name="q1">
                    </div>
                    <div>
                        <span class="help-icon">
                            <img src="public/images/images-cadastros/question.svg" alt="logo" />
                            <span class="tooltip">Digite seu nome completo.</span>
                        </span>
                    </div>
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