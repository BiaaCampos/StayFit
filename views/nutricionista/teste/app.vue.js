const newLocal = `

<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_atendimento">
        <div>
            <h1>
                Paciente
            </h1>
        </div>
        <div class="form_atendimento">
            <form>
                <div class="row">
                    <div class="col-md-1">
                        <teste :tipomodalteste="tipomodalteste"></teste> 
                    </div>
                </div>
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
            gender: 'Genêro*',
            blood: 'Tipo sanguíneo*',
            civil: 'Estado civil*',
            height: '220px',
            tipomodalteste: null,
        }
    },
    methods: {
    },
    mounted: function() {
    }

})