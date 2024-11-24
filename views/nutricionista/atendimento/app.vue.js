const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_atendimento">
        <div>
            <h1>Paciente</h1>
        </div>
        <div class="form_atendimento">
            <form @submit.prevent="salvarAtendimento">
                <!-- Dados Pessoais -->
                <div class="row">
                    <div class="col-md-4">
                        <ejs-textbox 
                            floatLabelType="Auto" 
                            placeholder="CPF*" 
                            v-model="cpf" 
                            @blur="buscarPacientePorCPF">
                        </ejs-textbox>
                    </div>
                    <div class="col-md-4">
                        <ejs-textbox floatLabelType="Auto" placeholder="Nome Completo*" v-model="nome_completo"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-datepicker id="data_nascimento" placeholder="Data de nascimento*" v-model="data_nascimento"></ejs-datepicker>
                    </div>
                    <div class="col-md-1">
                        <ejs-textbox floatLabelType="Auto" placeholder="Idade*" v-model="idade" :enabled="false"></ejs-textbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Peso (kg)" v-model="peso" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Altura (cm)" v-model="altura" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-dropdownlist 
                            placeholder="Selecione o sexo" 
                            v-model="sexo" 
                            :dataSource="generos" 
                            :fields="{ text: 'descricao', value: 'id' }">
                        </ejs-dropdownlist>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="IMC" v-model="imc" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Necessidades Calóricas (kcal)" v-model="necessidades_caloricas" :enabled="false"></ejs-textbox>
                    </div>
                    <div class="col-md-2">
                        <ejs-textbox floatLabelType="Auto" placeholder="Necessidade Hídrica (ml)" v-model="necessidade_hidrica" :enabled="false"></ejs-textbox>
                    </div>
                </div>

                <!-- Medidas Corporais -->
                <div class="row">
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Circunferência do Braço (cm)" v-model="circunferencia_braco" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Circunferência da Coxa (cm)" v-model="circunferencia_coxa" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="Gordura do Quadril (cm)" v-model="gordura_quadril" @input="atualizarCalculos"></ejs-textbox>
                    </div>
                    <div class="col-md-3">
                        <ejs-textbox floatLabelType="Auto" placeholder="TMB (kcal)" v-model="tmb" :enabled="false"></ejs-textbox>
                    </div>
                </div>

                <!-- Contato e Ocupação -->
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

                <!-- Objetivos e Modalidade -->
                <div class="row">
                    <div class="col-md-6">
                        <ejs-multiselect 
                            :popupHeight="height" 
                            placeholder="Objetivo(s) do atendimento nutricional" 
                            v-model="objetivosSelecionados" 
                            :dataSource="objetivosNutricionais" 
                            :fields="{ text: 'descricao', value: 'id' }" 
                            :mode="'delimiter'" 
                            :delimiter="', '">
                        </ejs-multiselect>
                    </div>
                    <div class="col-md-6">
                        <ejs-textbox floatLabelType="Auto" placeholder="Hábitos alimentares" v-model="habitos_alimentares"></ejs-textbox>
                    </div>
                </div>

                <!-- Ingestão e Sono -->
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

                <!-- Hábitos Intestinais e Estresse -->
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

                <!-- Informações Adicionais -->
                <div class="row">
                    <div class="col-md-12">
                        <ejs-textbox floatLabelType="Auto" placeholder="Comentários adicionais" v-model="comentarios_adicionais"></ejs-textbox>
                    </div>
                </div>

                <!-- Histórico e Diagnóstico -->
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

                <!-- Modal e Botão de Salvar -->
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4" style="display:flex; justify-content:center">
                        <modal_atendimento 
                            :tipomodalatendimento="tipomodalatendimento" 
                            :id-paciente="id_paciente">
                        </modal_atendimento>
                    </div>
                    <div class="col-md-4"></div>
                </div>
                <div class="row">
                    <div class="col-md-12 div_botao_atendimento">
                        <ejs-button class="botao_atendimento" type="submit">Salvar</ejs-button>
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
            cpf: '',
            nome_completo: '',
            data_nascimento: '',
            telefone: '',
            ocupacao: '',
            height: '',
            medicamentos: '',
            diagnostico_clinico: '',
            historico_familiar: '',
            idade: '',
            peso: null,
            altura: null,
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
            local_treino: '',
            habitos_alimentares: '',
            ingestao_hidrica: null,
            ingestao_cafe: null,
            qualidade_sono: '',
            horas_sono: '',
            habito_intestinal: null,
            habito_urinario: null,
            situacao_estresse: '',
            comentarios_adicionais: '',
            objetivosNutricionais: [],
            sexo: '', 
            generos: [],
            id_paciente: null, 
            objetivosSelecionados: [],
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
        atualizarCalculos() {
            this.calcularIMC();
            this.calcularNecessidadeHidrica();
            this.calcularNecessidadeCalorica();
        },
        calcularIMC() {
            if (this.peso && this.altura) {
                this.imc = (this.peso / ((this.altura / 100) ** 2)).toFixed(2);

                if (this.sexo) {
                    if (this.imc < 18.5) {
                        this.recomendacao = this.sexo === 'Masculino' ? "Aumentar a ingestão calórica." : "Aumentar a ingestão calórica.";
                    } else if (this.imc >= 18.5 && this.imc < 24.9) {
                        this.recomendacao = "Peso normal. Manter hábitos saudáveis.";
                    } else if (this.imc >= 25 && this.imc < 29.9) {
                        this.recomendacao = this.sexo === 'Masculino' ? "Considerar uma dieta de redução de peso." : "Considerar uma dieta de redução de peso.";
                    } else {
                        this.recomendacao = "Consultar um nutricionista para orientação.";
                    }
                }
            }
        },        
        calcularNecessidadeHidrica() {
            if (this.peso) {
                this.necessidade_hidrica = (this.peso * 35).toFixed(0);
            }
        },
        calcularTMB() {
            if (this.peso && this.altura && this.idade && this.sexo) {
                if (this.sexo === 'masculino') {
                    this.tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.idade) + 5;
                } else {
                    this.tmb = (10 * this.peso) + (6.25 * this.altura) - (5 * this.idade) - 161;
                }
            }
        },
        
        calcularNecessidadeCalorica() {
            this.calcularTMB();
            if (this.tmb) {
                const fatorAtividade = 1.2;
                this.necessidades_caloricas = (this.tmb * fatorAtividade).toFixed(0);
            }
        },
        formatarData(data) {
            if (!data) return '';
            const partes = data.split('-');
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        },
        buscarPacientePorCPF() {
            if (this.cpf) {
                axios.post(BASE + '/atendimento/getPacientePorCPF', { cpf: this.cpf })
                    .then(response => {
                        if (response.data.code === "1") {
                            const paciente = response.data.data[0];
                            this.nome_completo = paciente.NOME || '';
                            this.data_nascimento = paciente.DATA_NASCIMENTO || '';
                            this.telefone = paciente.TELEFONE || '';
                            this.ocupacao = paciente.OCUPACAO || '';
                            this.peso = paciente.peso || '';
                            this.altura = paciente.altura || '';
                            this.sexo = paciente.sexo || '';
                            this.endereco = paciente.ENDERECO || '';
                            this.id_paciente = paciente.ID || null; 
                        } else {
                            alert(response.data.msg);
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao buscar paciente:", error);
                        alert("Erro ao buscar paciente.");
                    });
            }
        },        
        buscarGeneros() {
            axios.get(BASE + '/atendimento/getGeneros')
                .then((response) => {
                    this.generos = response.data;
                })
                .catch((error) => {
                    console.error("Erro ao buscar gêneros:", error);
                });
        },
        buscarObjetivosNutricionais() {
            axios.get(BASE + '/atendimento/getObjetivosNutricionais')
                .then((response) => {
                    this.objetivosNutricionais = response.data;
                })
                .catch((error) => {
                    console.error("Erro ao buscar objetivos nutricionais:", error);
                });
        },
        resetarCampos() {
            this.tipomodalatendimento = '';
            this.cpf = '';
            this.nome_completo = '';
            this.data_nascimento = '';
            this.telefone = '';
            this.ocupacao = '';
            this.medicamentos = '';
            this.diagnostico_clinico = '';
            this.historico_familiar = [];
            this.idade = '';
            this.peso = null;
            this.altura = null;
            this.endereco = '';
            this.tmb = null;
            this.necessidades_caloricas = null;
            this.necessidade_hidrica = null;
            this.imc = null;
            this.circunferencia_braco = null;
            this.circunferencia_coxa = null;
            this.gordura_quadril = null;
            this.habitos_alimentares = '';
            this.ingestao_hidrica = null;
            this.ingestao_cafe = null;
            this.qualidade_sono = '';
            this.horas_sono = '';
            this.habito_intestinal = null;
            this.habito_urinario = null;
            this.situacao_estresse = '';
            this.comentarios_adicionais = '';
            this.objetivosSelecionados = [];
            this.sexo = '';
            this.id_paciente = null;
        },
        salvarAtendimento() {
            const dados = {
                id_paciente: this.id_paciente,
                cpf: this.cpf,
                nome_completo: this.nome_completo,
                data_nascimento: this.data_nascimento,
                telefone: this.telefone,
                ocupacao: this.ocupacao,
                peso: this.peso,
                altura: this.altura,
                sexo: this.sexo,
                endereco: this.endereco,
                objetivo: this.objetivosSelecionados.join(','),
                habitos_alimentares: this.habitos_alimentares,
                ingestao_hidrica: this.ingestao_hidrica,
                ingestao_cafe: this.ingestao_cafe,
                qualidade_sono: this.qualidade_sono,
                horas_sono: this.horas_sono,
                habito_intestinal: this.habito_intestinal,
                habito_urinario: this.habito_urinario,
                situacao_estresse: this.situacao_estresse,
                comentarios_adicionais: this.comentarios_adicionais,
                diagnostico_clinico: this.diagnostico_clinico,
                medicamentos: this.medicamentos,
                historico_familiar: this.historico_familiar.join(','),
                circunferencia_braco: this.circunferencia_braco,
                circunferencia_coxa: this.circunferencia_coxa,
                gordura_quadril: this.gordura_quadril
            };
            axios.post(BASE + '/atendimento/salvarAtendimento', dados)
                .then(response => {
                    if (response.data.code === "1") {
                        
                        mainLayout.sToast(response.data.msg, "success");
                        this.resetarCampos();
                    } else {
                        mainLayout.sToast(response.data.msg, "warning");
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert("Erro ao finalizar consulta.");
                });
        }
    },
    
    mounted() {
        this.buscarObjetivosNutricionais();
        this.buscarGeneros();
    }
});
