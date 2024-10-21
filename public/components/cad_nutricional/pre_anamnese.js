Vue.component("pre_anamnese", {
    props: ['tipopre_anamnese'],
    template: `
    <div>
        <form>
            <div class="col-lg-12 mb-3 control-section">
                <div class="control-styles">
                    <label class="label-size">Qual o seu principal objetivo?</label>
                    <ejs-multiselect 
                        v-model="respostas.objetivos"
                        ref="refObjetivos" 
                        cssClass="e-specific"
                        :dataSource='dataObjetivos'
                        :fields='selectObjetivos'
                        :mode='mode' 
                        :popupHeight='popHeight' 
                        :showDropDownIcon='true' 
                        :maximumSelectionLength='maxSelection'>
                    </ejs-multiselect>
                </div>
            </div>
            <div class="radio-control mb-3">
                <label class="label-size">Pratica atividades físicas?</label>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radioAtividadeFisica"
                            label="Sim" 
                            name="atividadefisica" 
                            value="sim">
                        </ejs-radiobutton>
                    </div>
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radioAtividadeFisica" 
                            label="Não" 
                            name="atividadefisica" 
                            value="nao"
                            @change="resetFrequencia">
                        </ejs-radiobutton>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 mb-3 control-section" v-show="respostas.radioAtividadeFisica === 'sim'">
                <div class="control-styles">
                    <label class="label-size">Se sim, qual a frequência semanal pratica essas atividades?</label>
                    <ejs-multiselect 
                        v-model="respostas.frequencia"
                        ref="refFrequencia" 
                        cssClass="e-specific"
                        :dataSource='dataFrequencia'
                        :fields='selectFrequencia'
                        :popupHeight='popHeight' 
                        :showDropDownIcon='true' 
                        :maximumSelectionLength='maxSelectionFrequencia'>
                    </ejs-multiselect>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12 mb-3 filled">
                <label class="label-size">Quais atividades você pratica?</label>
                <ejs-textbox 
                    v-model="respostas.atividadesPraticantes"
                    floatLabelType="Auto" 
                    cssClass="e-filled">
                </ejs-textbox>
            </div>            
            <div class="radio-control mb-3">
                <label class="label-size">Você está grávida?</label>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiogravida" 
                            label="Sim" 
                            name="gravida" 
                            value="sim">
                        </ejs-radiobutton>
                    </div>
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiogravida"
                            label="Não" 
                            name="gravida" 
                            value="nao">
                        </ejs-radiobutton>
                    </div>
                </div>
            </div>
            <div class="radio-control mb-3">
                <label class="label-size">Você tem intolerância alimentar?</label>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiointolerancia"
                            label="Sim" 
                            name="intolerancia" 
                            value="sim">
                        </ejs-radiobutton>
                    </div>
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiointolerancia"
                            label="Não" 
                            name="intolerancia" 
                            value="nao">
                        </ejs-radiobutton>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12 mb-3 filled" v-if="respostas.radiointolerancia === 'sim'">
                <label class="label-size">Quais?</label>
                <ejs-textbox 
                    v-model="respostas.intolerancia"
                    floatLabelType="Auto" 
                    cssClass="e-filled">
                </ejs-textbox>
            </div>
            <div class="radio-control mb-3">
                <label class="label-size">Você faz algum uso de medicamento regularmente?</label>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiomedicamento"
                            label="Sim" 
                            name="medicamento" 
                            value="sim">
                        </ejs-radiobutton>
                    </div>
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.radiomedicamento"
                            label="Não" 
                            name="medicamento" 
                            value="nao">
                        </ejs-radiobutton>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12 mb-3 filled" v-if="respostas.radiomedicamento === 'sim'">
                <label class="label-size">Se sim, quais?</label>
                <ejs-textbox 
                    v-model="respostas.medicamento"
                    floatLabelType="Auto" 
                    cssClass="e-filled">
                </ejs-textbox>
            </div>
            <div class="col-lg-12 mb-3 control-section">
                <div class="control-styles">
                    <label class="label-size">Quantas refeições você faz por dia?</label>
                    <ejs-multiselect 
                        v-model="respostas.refeicoes"
                        ref="refRefeicao" 
                        cssClass="e-specific"
                        :dataSource='dataRefeicao'
                        :fields='selectRefeicao'
                        :popupHeight='popHeight' 
                        :showDropDownIcon='true' 
                        :maximumSelectionLength='maxSelectionRefeicao'>
                    </ejs-multiselect>
                </div>
            </div>
            <div class="radio-control mb-3">
                <label class="label-size">Você consome alimentos industrializados com frequência?</label>
                <div class="row">
                    <div class="col-md-2">
                        <ejs-radiobutton    
                            v-model="respostas.consumoalimentos"
                            label="Sim" 
                            name="alimentos" 
                            value="sim">
                        </ejs-radiobutton>
                    </div>
                    <div class="col-md-2">
                        <ejs-radiobutton 
                            v-model="respostas.consumoalimentos"
                            label="Não" 
                            name="alimentos" 
                            value="nao">
                        </ejs-radiobutton>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8" style="display:flex; justify-content: center">
                    <ejs-button v-on:click.native.prevent="cadastrarPreAnamnese" class="btn btn-success">
                        Cadastrar
                    </ejs-button>
                </div>                
                <div class="col-md-2">
                </div>
            </div>
        </form>
    </div>`,
    data() {
        return {
            /* V-MODELS */
            respostas: {
                objetivos: [],
                radioAtividadeFisica: null,
                frequencia: [],
                atividadesPraticantes: '',
                radiogravida: false,
                radiointolerancia: false,
                intolerancia: '',
                radiomedicamento: false,
                medicamento: '',
                refeicoes: [],
                consumoalimentos: false
            },

            /* SELECT OBJETIVOS */
            selectObjetivos: { text: 'descricao', value: 'id' },
            dataObjetivos: [],
            popHeight: '350px',
            mode: 'CheckBox',
            min: 1,
            maxSelection: 3,

            /* SELECT FREQUÊNCIA */
            selectFrequencia: { text: 'descricao', value: 'id' },
            dataFrequencia: [],
            min: 1,
            maxSelectionFrequencia: 1,

            /* SELECT REFEIÇÃO */
            selectRefeicao: { text: 'descricao', value: 'id' },
            dataRefeicao: [],
            min: 1,
            maxSelectionRefeicao: 1
        };
    },
    methods: {
        listaMultiselectObjetivos() {
            axios.post(BASE + "/cadastronutricional/listaMultiselectObjetivos").then((res)=> {
                this.dataObjetivos = res.data;
            })
        },

        listaMultiselectFrequencia() {
            axios.post(BASE + "/cadastronutricional/listaMultiselectFrequencia").then((res)=> {
                this.dataFrequencia = res.data;
            })
        },

        listaMultiselectRefeicao() {
            axios.post(BASE + "/cadastronutricional/listaMultiselectRefeicao").then((res)=> {
                this.dataRefeicao = res.data;
            })
        },

        cadastrarPreAnamnese() {
            const respostas = [
                { id_pergunta: 1, resposta: this.respostas.radioAtividadeFisica ? 'sim' : 'nao' },
                { id_pergunta: 2, resposta: this.respostas.frequencia },
                { id_pergunta: 3, resposta: this.respostas.atividadesPraticantes },
                { id_pergunta: 4, resposta: this.respostas.radiogravida ? 'sim' : 'nao' },
                { id_pergunta: 5, resposta: this.respostas.radiointolerancia ? 'sim' : 'nao' },
                { id_pergunta: 6, resposta: this.respostas.intolerancia },
                { id_pergunta: 7, resposta: this.respostas.radiomedicamento ? 'sim' : 'nao' },
                { id_pergunta: 8, resposta: this.respostas.medicamento },
                { id_pergunta: 9, resposta: this.respostas.refeicoes },
                { id_pergunta: 10, resposta: this.respostas.consumoalimentos ? 'sim' : 'nao' }
            ];

            const data = {
                id_paciente: 1,
                id_usuario_modificacao: 1,
                respostas: respostas
            };

            axios.post(BASE + '/cadastronutricional/cadastrarPreAnamnese', data)
            .then((res) => {
                if (res.data.code === 1) {
                    alert('Respostas salvas com sucesso!');
                    setTimeout(() => {
                        window.location.href="/stayfit/Perfil_usuario"
                    },200)
                } else {
                    console.log('Erro ao salvar respostas: ' + res.data.msg);
                }
            })
            .catch((error) => {
                alert('Erro ao salvar respostas: ' + error.message);
            });
        },

        resetFrequencia() {
            if (this.respostas.radioAtividadeFisica) {
                this.respostas.frequencia = [];
            }
        },
        
        resetIntolerancia() {
            if (this.respostas.radiointolerancia) {
                this.respostas.intolerancia = '';
            }
        },

        resetMedicamento() {
            if (this.respostas.radiomedicamento) {
                this.respostas.medicamento = '';
            }
        }
    
    },
    mounted() {
        this.listaMultiselectObjetivos()
        this.listaMultiselectFrequencia()
        this.listaMultiselectRefeicao()
    }
});
