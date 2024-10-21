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
                                <div class="horario-item m-2">
                                    <button class="button_horario" type="submit">13:00</button>
                                </div>
                                <div class="horario-item m-2">
                                    <button class="button_horario" type="submit">14:00</button>
                                </div>
                                <div class="horario-item m-2">
                                    <button class="button_horario" type="submit">15:00</button>
                                </div>
                                <div class="horario-item m-2">
                                    <button class="button_horario" type="submit">16:00</button>
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
        }
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
          document.getElementById("date_label").textContent =
            "Selected Value: " + args.value.toLocaleDateString();
        }
      } 
});
