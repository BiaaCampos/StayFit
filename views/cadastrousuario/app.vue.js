const newLocal = `
<div class="bg_cadastros2">
    <div class="lado_esquerdo2" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo2">
            <img src="public/images/images-cadastros/Images.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito2">
        <div class="div_direita2">
            <div class="titulo_lado_direito2">
                <h1>
                    Preencha os seus dados 
                </h1>
            </div>
            <form>
                <div class="form-group2">
                    <div>
                        <label class="label-cad" for="q1">
                            Nome completo:
                        </label>
                        <input type="text" class="input-nome-form" >
                    </div>
                </div>
                <div class="form-group-cad">
                    <div>
                        <label class="label-cad" for="q1">
                            Gênero:
                        </label>
                        <div class="inputs-generos">
                            <label class="label-cad" for="q1">
                                Feminino:
                            </label>
                            <input type="radio" class="radio-input">
                            <label class="label-cad" for="q1">
                                Masculino:
                            </label>
                            <input type="radio" class="radio-input">
                        </div>
                    </div>
                </div>
                <div class="form-group2 div-data-altura">
                    <div>
                        <label class="label-cad" for="q1">
                            Data de nascimento:
                        </label>
                        <input type="date" class="input-data-nascimento">
                    </div>
                    <div>
                        <label class="label-cad" for="q1">
                            Altura:
                        </label>
                        <input type="number" class="input-altura">
                    </div>
                </div> 
                <div class="form-group2 div-peso">
                    <div>
                        <label class="label-cad" for="q1">
                            Peso atual:
                        </label>
                        <input type="number" class="input-peso-atual">
                    </div>
                    <div>
                        <label class="label-cad" for="q1">
                            Peso desejado:
                        </label>
                        <input type="number" class="input-peso-desejado">
                    </div>
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
