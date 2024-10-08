const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div>
            <h1>Agendar Consulta</h1>
            <h6>Confira os profissionais</h6>
        </div>

        <!-- Card Section -->
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card-profissionais-container">
                    <div tabindex="0" class="e-card card-profissionais" id="basic_card" role="button">
                        <div class="e-card-header">
                            <div class="e-card-header-caption">
                                <div class="title-agendar">Dr(a) Teste Unimar</div>
                                <div class="e-card-sub-title"><strong>CRN:</strong> 00000</div>
                                <div class="line-card">
                                    <div class="line"></div> <!-- Linha fininha -->
                                </div>
                                <div class="e-card-sub-title">Consulte a clínica sobre os critérios de atendimento</div>
                            </div>
                        </div>
                        <div class="e-card-content">
                            <!-- Card content can be added here -->
                        </div>
                        <div class="e-card-actions">
                            <modal_info ref="modal" :tipomodalinfo="tipomodalinfo"></modal_info>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-3"> <!-- Card 2 -->
                <div class="card-profissionais-container">
                    <div tabindex="0" class="e-card card-profissionais" id="basic_card" role="button">
                        <div class="e-card-header">
                            <div class="e-card-header-caption">
                                <div class="title-agendar">Dr(a) Teste Unimar</div>
                                <div class="e-card-sub-title"><strong>CRN:</strong> 00000</div>
                                <div class="line-card">
                                    <div class="line"></div> <!-- Linha fininha -->
                                </div>
                                <div class="e-card-sub-title">Consulte a clínica sobre os critérios de atendimento</div>
                            </div>
                        </div>
                        <div class="e-card-content">
                            <!-- Card content can be added here -->
                        </div>
                        <div class="e-card-actions">
                            <modal_info ref="modal2" :tipomodalinfo="tipomodalinfo"></modal_info>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-3"> <!-- Card 2 -->
                <div class="card-profissionais-container">
                    <div tabindex="0" class="e-card card-profissionais" id="basic_card" role="button">
                        <div class="e-card-header">
                            <div class="e-card-header-caption">
                                <div class="title-agendar">Dr(a) Teste Unimar</div>
                                <div class="e-card-sub-title"><strong>CRN:</strong> 00000</div>
                                <div class="line-card">
                                    <div class="line"></div> <!-- Linha fininha -->
                                </div>
                                <div class="e-card-sub-title">Consulte a clínica sobre os critérios de atendimento</div>
                            </div>
                        </div>
                        <div class="e-card-content">
                            <!-- Card content can be added here -->
                        </div>
                        <div class="e-card-actions">
                            <modal_info ref="modal2" :tipomodalinfo="tipomodalinfo"></modal_info>
                        </div>
                    </div>
                </div>
            </div>
            
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
            value: 33.3,
            animation: {
                enable: true,
                duration: 2000,
                delay: 0,
            }
        });
        this.errorProgress.appendTo('#linearsegment');
    }
});
