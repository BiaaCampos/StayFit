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
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Id*"></ejs-textbox>
                    </div>
                    <div class="col-md-5">
                        <ejs-textbox floatLabelType="Auto" placeholder="Nome*"></ejs-textbox>
                    </div>
                    <div class="col-md-5">
                        <ejs-textbox floatLabelType="Auto" placeholder="Sobrenome*"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Email*"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-datepicker id="datepicker" placeholder="Data de nascimento*"></ejs-datepicker>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Idade*"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-multiselect :placeholder='civil'></ejs-multiselect>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-maskedtextbox placeholder='CEP*' mask="00000-000">
		                </ejs-maskedtextbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Endereço*"></ejs-textbox>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Número*"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Complemento*"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Bairro*"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <ejs-dropdownlist :popupHeight='height' :placeholder='blood'></ejs-dropdownlist>
                    </div>
                    <div class="col-md-8">
                        <ejs-textbox floatLabelType="Auto" placeholder="Observações"></ejs-textbox>
                    </div>
                    <div class="col-md-1">
                        <modal_atendimento :tipomodalatendimento="tipomodalatendimento"></modal_atendimento> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4 div_botao_atendimento">
                        <ejs-button class="botao_atendimento" >Salvar</ejs-button>
                    </div>
                    <div class="col-md-4">
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
            tipomodalatendimento: null,
        }
    },
    methods: {
    },
    mounted: function() {
    }

})