Vue.component("lista_calendario", {
    props: ['tipocalendario', 'nutricionistaSelecionado'],
    template: `
    <div>
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
                                  <button 
                                    class="button_horario" 
                                    @click="selecionarHorario(horario)" 
                                    :class="{ 'selected': horarioSelecionado === horario }">
                                    {{ horario }}
                                  </button>
                              </div>
                          </div>
                          <div v-if="mensagem" class="alert alert-warning text-center mt-3">{{ mensagem }}</div>
                      </div>
                  </div>
              </div>
          </div>
      <div class="row mt-2 div-cards">
          <!-- Seu código existente -->
          <div class="text-center mt-3">
                <button 
                class="btn btn-primary" 
                @click="proximaEtapa" 
                :disabled="!horarioSelecionado">
                Próxima Etapa
                </button>
            </div>
      </div>
      </div>
    </div>`,
    data: function () {
      return {
        horariosDisponiveis: [],
        mensagem: '',
        horarioSelecionado: null // Adiciona esta linha
      };
    },
    methods: {
        onValueChange: function(args) {
            const selectedDate = args.value.toISOString().split('T')[0];
            this.selectedDate = selectedDate; // Armazena a data selecionada
            this.fetchHorariosDisponiveis(selectedDate);
        },
        
      fetchHorariosDisponiveis(selectedDate) {
        if (this.nutricionistaSelecionado) {
            axios.get(BASE + `/agendarconsulta/horariosDisponiveis/${this.nutricionistaSelecionado.id}/${selectedDate}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        this.horariosDisponiveis = response.data.map(item => item.horario);
                        this.mensagem = '';
                    } else {
                        this.horariosDisponiveis = [];
                        this.mensagem = 'Não há horários disponíveis para esta data.';
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar horários disponíveis:", error);
                    this.mensagem = 'Erro ao buscar horários disponíveis.';
                });
        } else {
            this.mensagem = 'Selecione um nutricionista antes de escolher a data.';
        }
      },
      selecionarHorario(horario) {
        this.horarioSelecionado = horario; // Armazena o horário selecionado
      },
      proximaEtapa() {
        this.$emit('continuar-para-informacoes', {
            horario: this.horarioSelecionado,
            nutricionista: this.nutricionistaSelecionado
        });
    }
    }
});
