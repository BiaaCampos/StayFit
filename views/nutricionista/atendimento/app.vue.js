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
                        <ejs-textbox floatLabelType="Auto" placeholder="Id*" v-model="id_usuario"></ejs-textbox>
                    </div>
                    <div class="col-md-5">
                        <ejs-textbox floatLabelType="Auto" placeholder="Nome Completo*"v-model="nome_usuario"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Email*"v-model="email"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-datepicker id="datepicker" placeholder="Data de nascimento*" v-model="data_nascimento"></ejs-datepicker>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Idade*"v-model=""></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-multiselect :placeholder='civil'v-model=""></ejs-multiselect>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <ejs-maskedtextbox placeholder='CEP*' mask="00000-000" v-model="">
		                </ejs-maskedtextbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Endereço*"v-model=""></ejs-textbox>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Número*"v-model=""></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Complemento*"v-model=""></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Bairro*"v-model=""></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <ejs-dropdownlist :popupHeight='height' :placeholder='blood'v-model=""></ejs-dropdownlist>
                    </div>
                    <div class="col-md-8">
                        <ejs-textbox floatLabelType="Auto" placeholder="Observações"v-model=""></ejs-textbox>
                    </div>
                    <div class="col-md-1">
                        <modal_atendimento :tipomodalatendimento="tipomodalatendimento"v-model=""></modal_atendimento> 
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
            tipomodalatendimento: null
        }
    },
    methods: {
    },
    mounted: function() {
    }

})