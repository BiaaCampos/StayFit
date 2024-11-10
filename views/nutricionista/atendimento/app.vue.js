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
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Peso (kg)" v-model="peso" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Altura (cm)" v-model="altura" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Circunferência do Braço (cm)" v-model="circunferencia_braco" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Circunferência da Coxa (cm)" v-model="circunferencia_coxa" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Gordura do Quadril (cm)" v-model="gordura_quadril" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                </div>
                <!-- Sexo Input -->
                <div class="row">
                    <div class="col-md-3">
                        <ejs-dropdownlist floatLabelType="Auto" placeholder="Sexo" v-model="sexo" :dataSource="['M', 'F']" @change="atualizarCalculos"></ejs-dropdownlist>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="IMC" v-model="imc" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Necessidades Calóricas (kcal)" v-model="necessidades_caloricas" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Necessidade Hídrica (ml)" v-model="necessidade_hidrica" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="TMB (kcal)" v-model="tmb" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Carboidratos (g)" v-model="carboidratos" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Proteínas (g)" v-model="proteinas" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Gorduras (g)" v-model="gorduras" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Relação Cintura-Quadril" v-model="relacao_cintura_quadril" :enabled="false"></ejs-textbox>
                    </div>
                </div>

                <!-- Outros dados pessoais -->
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Endereço*" v-model="endereco"></ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-maskedtextbox placeholder="Telefone" mask="(00) 00000-0000" v-model="telefone"></ejs-maskedtextbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Ocupação atual" v-model="ocupacao"></ejs-textbox>
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
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <ejs-textbox floatLabelType="Auto" placeholder="Comentários adicionais" v-model="comentarios_adicionais"></ejs-textbox>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Endereço*" v-model="endereco"></ejs-textbox>
                    </div>
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
    data() {
        return {
            tipomodalatendimento: '',
            nome_completo: '',
            data_nascimento: '',
            telefone: '',
            ocupacao:'',
            height: '',
            composicao_familiar:'',
            medicamentos:'',
            diagnostico_clinico:'',
            historico_familiar:'',
            composicao_familiar:'',
            idade: '',
            peso: null,
            altura: null,
            sexo: '',
            endereco: '',
            tmb: null,
            necessidades_caloricas: null,
            necessidade_hidrica: null,
            imc: null,
            carboidratos: null,
            proteinas: null,
            gorduras: null,
            relacao_cintura_quadril: null,
            circunferencia_braco: null,
            circunferencia_coxa: null,
            gordura_quadril: null,
            objetivo: '',
            modalidade: '',
            local_treino: '',
            especificacao: '',
            sensacao_pos_treino: '',
            suplementos: '',
            habitos_alimentares: '',
            ingestao_hidrica: null,
            ingestao_cafe: null,
            qualidade_sono: '',
            horas_sono: '',
            habito_intestinal: null,
            habito_urinario: null,
            situacao_estresse: '',
            comentarios_adicionais: ''
        };
    },
    watch: {
        data_nascimento(newDate) {
            if (newDate) {
                this.idade = this.calculaIdade(newDate);
            }
        },
        peso(newPeso) {
            this.atualizarCalculos();
        },
        altura(newAltura) {
            this.atualizarCalculos();
        },
        idade(newIdade) {
            this.atualizarCalculos();
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
        },
        calcularIMC() {
            if (this.peso && this.altura) {
                this.imc = (this.peso / ((this.altura / 100) ** 2)).toFixed(2);
            }
        },
        atualizarCalculos() {
            this.calcularIMC();
            this.calcularTMB();
            this.calcularNecessidadeHidrica();
            this.calcularNecessidadeCalorica();
            this.calcularMacronutrientes();
            this.calcularRelacaoCinturaQuadril();
        },
        calcularTMB() {
            if (this.sexo === 'M' && this.peso && this.altura && this.idade) {
                this.tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.idade) + 5;
            } else if (this.sexo === 'F' && this.peso && this.altura && this.idade) {
                this.tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.idade) - 161;
            }
        },
        calcularNecessidadeHidrica() {
            if (this.peso) {
                this.necessidade_hidrica = (this.peso * 35).toFixed(0);
            }
        },
        calcularNecessidadeCalorica() {
            if (this.tmb) {
                // Exemplo de cálculo
                this.necessidades_caloricas = (this.tmb * 1.55).toFixed(0); // Atividade moderada
            }
        },
        calcularMacronutrientes() {
            if (this.necessidades_caloricas) {
                this.carboidratos = ((this.necessidades_caloricas * 0.55) / 4).toFixed(0);
                this.proteinas = ((this.necessidades_caloricas * 0.15) / 4).toFixed(0);
                this.gorduras = ((this.necessidades_caloricas * 0.30) / 9).toFixed(0);
            }
        },
        calcularRelacaoCinturaQuadril() {
            if (this.circunferencia_coxa && this.circunferencia_braco) {
                this.relacao_cintura_quadril = (this.circunferencia_coxa / this.circunferencia_braco).toFixed(2);
            }
        }
    }
});
