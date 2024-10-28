const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div class="div-agendar">
            <h1>Agendar Consulta</h1>
        </div>
        <div class="row mt-2 div-cards">
            <div class="col-md-8 mb-3 d-flex justify-content-between div-cards">
                <div class="div-calendario flex-fill me-5">
                    <div class="p-div">
                        <p class="dias-dispo">Dias disponíveis</p>
                    </div>
                    <div class="col-lg-12 control-section">
                        <div class="control_wrapper calendar-default">
                            <div id="container1" class="d-flex justify-content-center" style="overflow:auto;">
                                <ejs-calendar id="calendar1" :change="onValueChange"></ejs-calendar>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div-calendario flex-fill ms-5">
                    <div class="p-div">
                        <p class="dias-dispo">Horários disponíveis</p>
                    </div>
                    <div class="col-lg-12 control-section">
                        <div class="card col-md-12 horario-card">
                            <div class="horarios-container d-flex flex-wrap justify-content-center">
                                <div class="horario-item m-2" v-for="horario in horariosDisponiveis" :key="horario">
                                    <button class="button_horario" @click="agendarConsulta(horario)">{{ horario }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="linearsegment" style="margin: 20px auto; width: 50%;"></div>
    </div>
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            horariosDisponiveis: [] // Array para armazenar os horários disponíveis
        };
    },
    mounted: function() {
        this.errorProgress = new ej.progressbar.ProgressBar({
            type: 'Linear',
            height: '30',
            segmentCount: 3,
            value: 66.6,
            animation: {
                enable: true,
                duration: 2000,
                delay: 0,
            }
        });
        this.errorProgress.appendTo('#linearsegment');
    },
    methods: {
        onValueChange: function(args) {
            const selectedDate = args.value.toISOString().split('T')[0]; // Formata a data
            this.fetchHorariosDisponiveis(selectedDate);
        },
        fetchHorariosDisponiveis: function(date) {
            const idNutricionista = this.selectedNutricionistaId; // Supondo que você tenha essa variável
            axios.get(`/calendario/getDisponibilidade/${idNutricionista}?date=${date}`)
                .then(response => {
                    this.horariosDisponiveis = response.data; // Ajuste conforme a estrutura da resposta
                })
                .catch(error => {
                    console.error("Erro ao buscar horários disponíveis:", error);
                });
        },        
        agendarConsulta: function(horario) {
            // Implementar a lógica para agendar a consulta com o horário selecionado
            console.log(`Consulta agendada para: ${horario}`);
        }
    }
});
