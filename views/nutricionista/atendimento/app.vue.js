const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_atendimento">
        <div>
            <h1>Paciente</h1>
        </div>
        <div class="form_atendimento">
            <form>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Nome Completo*" v-model="nome_completo"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-datepicker id="data_nascimento" placeholder="Data de nascimento*" v-model="data_nascimento"></ejs-datepicker>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Idade*" v-model="idade" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Endereço*" v-model="endereco"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-maskedtextbox placeholder="Telefone" mask="(00) 00000-0000" v-model="telefone"></ejs-maskedtextbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Ocupação atual" v-model="ocupacao"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Composição familiar" v-model="composicao_familiar"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Diagnóstico clínico" v-model="diagnostico_clinico"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Medicamentos com prescrição" v-model="medicamentos"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-multiselect placeholder="História familiar (patologias)" v-model="historico_familiar" :dataSource="['Diabetes', 'Obesidade', 'HAS', 'Dislipidemias', 'Câncer']"></ejs-multiselect>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <ejs-dropdownlist :popupHeight="height" placeholder="Objetivo(s) do atendimento nutricional" v-model="objetivo" :dataSource="['Melhorias na estrutura corporal', 'Estética']"></ejs-dropdownlist>
                    </div>
                    <div class="col-md-6">
                        <ejs-multiselect placeholder="Modalidade esportiva" v-model="modalidade" :dataSource="['Musculação', 'Handball']"></ejs-multiselect>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <ejs-textbox floatLabelType="Auto" placeholder="Local de treino" v-model="local_treino"></ejs-textbox>
                    </div>
                    <div class="col-md-6">
                        <ejs-textbox floatLabelType="Auto" placeholder="Especificação (metragem, posição)" v-model="especificacao"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Sensação pós-treino" v-model="sensacao_pos_treino"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Suplementos (quem prescreveu)" v-model="suplementos"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Hábitos alimentares" v-model="habitos_alimentares"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Ingestão hídrica (L/dia)" v-model="ingestao_hidrica"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Ingestão de café (L/dia)" v-model="ingestao_cafe"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Qualidade do sono" v-model="qualidade_sono"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Horas de sono" v-model="horas_sono"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Hábito intestinal (vezes/dia)" v-model="habito_intestinal"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Hábito urinário (vezes/dia)" v-model="habito_urinario"></ejs-textbox>
                    </div>
                    <div class="col-md-6">
                        <ejs-textbox floatLabelType="Auto" placeholder="Situação de estresse" v-model="situacao_estresse"></ejs-textbox>
                    </div>
                                        <div class="col-md-1">
                        <modal_atendimento :tipomodalatendimento="tipomodalatendimento"></modal_atendimento>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 div_botao_atendimento">
                        <ejs-button class="botao_atendimento">Salvar</ejs-button>
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
            tipomodalatendimento:'',
            nome_completo: '',
            data_nascimento: '',
            idade: '',
            endereco: '',
            telefone: '',
            ocupacao: '',
            composicao_familiar: '',
            diagnostico_clinico: '',
            medicamentos: '',
            historico_familiar: [],
            objetivo: '',
            modalidade: [],
            local_treino: '',
            especificacao: '',
            sensacao_pos_treino: '',
            suplementos: '',
            habitos_alimentares: '',
            ingestao_hidrica: '',
            ingestao_cafe: '',
            qualidade_sono: '',
            horas_sono: '',
            habito_intestinal: '',
            habito_urinario: '',
            situacao_estresse: '',
            height: '220px'
        }
    },
    watch: {
        data_nascimento(newDate) {
            if (newDate) {
                this.idade = this.calculaIdade(newDate);
            }
        }
    },
    methods: {
        calculaIdade(dataNascimento) {
            const hoje = new Date();
            const nascimento = new Date(dataNascimento);
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const mes = hoje.getMonth() - nascimento.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }
            return idade;
        }
    },
    mounted: function() {}
});

new Vue({
    el: '#app'
});
