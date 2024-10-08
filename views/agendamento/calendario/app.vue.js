const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div>
            <h1>Agendar Consulta</h1>
            <h6>Confira os profissionais</h6>
        </div>

        <!-- Card Section -->
        <div class="row"> <!-- Usar a row do Bootstrap -->
        
        </div>
        <!-- Linear Progress Bar -->
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
            data: [],
            pageSettings: { pageCount: 5 },
            toolbar: ["Search"],
            currentPage: 0,
            totalPages: 3,
            errorProgress: null,
            tipomodalinfo: null,
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
    }
});
