const AppTemplate = `
<div class="bg_cadastros">
    <div class="lado_esquerdo" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo">
            <img src="public/images/images-cadastros/salada.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito">
        <div class="div_direita">
            <div class="titulo_lado_direito mb-3">
                <h1>
                    Bem vindo à 
                </h1>
                <img src="public/images/images-cadastros/stayfit_preta.svg" alt="logo" class="logo_stayfit" />
            </div>
            <h4 class="text-center mb-3">
                Pré Anamnese
            </h4>
            <pre_anamnese :tipopre_anamnese="tipopre_anamnese"></pre_anamnese> 
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            tipopre_anamnese: null
        };
    },
    computed: {
    },
    methods: {
    }
});
