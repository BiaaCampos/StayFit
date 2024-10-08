const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div class="div-agendar">
            <h1>Agendar Consulta</h1>
        </div>
        <div class="row"> 
            <div class="col-md-3 mb-3">
            </div>
            <div class="col-md-6 mb-3">
                <div class="div-calendario">
                    <div class="p-div"><p class="dias-dispo">Dias disponíveis</p></div>
                    <div class="col-lg-12 control-section">
                        <div class="control_wrapper calendar-default">
                            <div id="container" style="overflow:auto">
                                <ejs-calendar id="calendar" :change="onValueChange"></ejs-calendar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
            </div>
        </div>
        <div id="linearsegment" style="margin: 20px auto; width: 50%;">
        </div>
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
