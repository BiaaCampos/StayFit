Vue.component("historicomedico", {
    props: ['tipohistoricomedico'],
    template: `
    <div>
        <form @submit.prevent="submitForm">
            <div v-for="(pergunta, index) in perguntas" :key="pergunta.id" class="form-group">
                <label :for="'pergunta-' + pergunta.id">{{ pergunta.texto_pergunta }}</label>
                <ejs-textbox 
                    v-model="respostas[pergunta.id]" 
                    :id="'pergunta-' + pergunta.id" 
                    floatLabelType="Auto" 
                    placeholder="Resposta"
                ></ejs-textbox>
            </div>
            <div class="around-arrow-next">
                <button class="button_cadastronutricional" type="submit">Salvar</button>
            </div>
        </form>
    </div>`,
    data() {
        return {
            perguntas: [],
            respostas: {},
            tipo_id: 1,
        };
    },
    methods: {
        listaPerguntasHistorico() {            
            axios.post(BASE + "/cadastronutricional/listaPerguntasHistorico", { tipo_id: this.tipo_id })
            .then((res) => {
                this.perguntas = res.data;
                this.perguntas.forEach(pergunta => {
                    this.$set(this.respostas, pergunta.id, '');
                });
            })
            .catch((error) => {
                console.error('Erro ao buscar perguntas:', error);
            });
        },
        submitForm() {
            const data = {
                id_paciente: 1,
                respostas: Object.keys(this.respostas).map(id => ({
                    id_pergunta: id,
                    resposta: this.respostas[id]
                })),
                id_usuario_modificacao: 1
            };
        
            console.log('Dados enviados para o backend:', data);
        
            axios.post(BASE + '/cadastronutricional/salvarRespostas', data)
            .then((res) => {
                if (res.data.code === 1) {
                    this.$emit('submit-form');
                } else {
                    alert('Erro ao salvar respostas.');
                }
            })
            .catch((error) => {
                console.error('Erro ao salvar respostas:', error);
            });
        }
        
    },
    mounted() {
        this.listaPerguntasHistorico(); 
    }
});
