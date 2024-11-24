Vue.component("lista_nutricionista", {
    props: ['tiponutricionista'],
    template: `
<div class="row">
        <div v-if="data.length === 0" class="col-md-12 text-center">
            <h6>Nenhum nutricionista com disponibilidade no momento.</h6>
        </div>
        <div 
            v-for="nutricionista in data" 
            :key="nutricionista.id" 
            :class="data.length === 1 ? 'col-md-12 mb-3' : 'col-md-6 mb-3'">
            <div class="card-profissionais-container">
                <div tabindex="0" class="e-card card-profissionais" role="button">
                    <div class="e-card-header">
                        <div class="e-card-header-caption">
                            <div class="title-agendar">{{ nutricionista.nome }}</div>
                            <div class="e-card-sub-title"><strong>CRN:</strong> {{ nutricionista.crn }}</div>
                            <div class="line-card">
                                <div class="line"></div>
                            </div>
                            <div class="e-card-sub-title">Consulte a clínica sobre os critérios de atendimento</div>
                        </div>
                    </div>
                    <div class="e-card-content"></div>
                    <div class="e-card-actions">
                      <div>
                          <button type="button" class="btn" @click="selecionarNutricionista(nutricionista)" data-mdb-toggle="modal" :data-mdb-target="'#modalInfo' + nutricionista.id" style="background-color: #32794F; color: white;">
                              Selecionar
                          </button>
                          <div class="modal fade" :id="'modalInfo' + nutricionista.id" tabindex="-1" aria-labelledby="modalInfoLabel" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered modal-lg">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <h5 class="modal-title text-danger text-center w-100" id="modalInfoLabel" style="text-transform: uppercase;">Aviso</h5>
                                          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                      </div>

                                      <div class="modal-body text-center" style="font-size: 18px; color: black; line-height: 1.2;">
                                          <p>{{ tipomodalinfo }}</p>
                                          <p>A StayFit é uma plataforma de consulta feita de forma totalmente online.</p>
                                          <p>Para se consultar, escolha a melhor data e horário para marcar a consulta, que será realizada por chamada de vídeo!</p>
                                      </div>

                                      <div class="modal-footer d-flex justify-content-center">
                                          <button type="button" class="btn btn-primary" data-mdb-dismiss="modal" @click="goToCalendar" style="background-color: #32794F; color: white;">Continuar agendamento</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data: function () {
        return {
            data: [],
            tipomodalinfo: 'Você está prestes a selecionar um nutricionista.',
        };
    },
    mounted: function () {
        this.fetchNutricionistas();
    },
    methods: {
        fetchNutricionistas() {
            axios.get(BASE + '/agendarconsulta/listaNutricionista')
                .then((response) => {
                    this.data = response.data;
                })
                .catch((error) => {
                    console.error("Erro ao buscar nutricionistas:", error);
                });
        },

        selecionarNutricionista(nutricionista) {
            this.nutricionista = nutricionista;
        },

        emitirAgendamento() {
            if (this.nutricionista) {
                this.$emit('continuar-agendamento', this.nutricionista);
            } else {
                alert("Por favor, selecione um nutricionista.");
            }
        },
        goToCalendar() {
            this.emitirAgendamento();
        }
    }
});
