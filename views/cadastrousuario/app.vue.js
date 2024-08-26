const newLocal = `
<div class="bg_cadastros">
    <div class="lado_esquerdo" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo">
            <img src="public/images/images-cadastros/Images.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito">
        <div class="div_direita">
            <div class="titulo_lado_direito">
                <h1>
                    Preencha os     seus dados 
                </h1>
            </div>
            <form>
                <div class="form-group">
                    <div>
                        <label for="q1">
                            Nome completo:
                        </label>
                        <input type="text" id="q1" name="q1">
                    </div>
                </div>
                <div class="form-group">
                    <div>
                        <label for="q1">
                            Gênero:
                        </label>
                        <div class="inputs-generos">
                            <label for="q1">
                                Feminino:
                            </label>
                            <input type="radio">
                            <label for="q1">
                                Masculino:
                            </label>
                            <input type="radio" id="q1" name="q1">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div>
                        <label for="q1">
                            Data de nascimento:
                        </label>
                        <input type="date" id="q1" name="q1">
                    </div>
                    <div>
                        <label for="q1">
                            Altura:
                        </label>
                        <input type="number" id="q1" name="q1">
                    </div>
                </div> 
                <div class="form-group">
                    <div>
                        <label for="q1">
                            Peso atual:
                        </label>
                        <input type="number" id="q1" name="q1">
                    </div>
                        <label for="q1">
                            Peso desejado:
                        </label>
                        <input type="number" id="q1" name="q1">
                    </div>
                <button class="button_cadastronutricional" type="submit">Criar meu plano</button>
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
