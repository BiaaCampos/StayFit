const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div>
            <h1>Agendar Consulta</h1>
            <h6>Confira os profissionais</h6>
        </div>
        <!-- Card Section -->
        <div class="col-lg-12 control-section card-control-section basic_card_layout">
            <div class="e-card-resize-container">       
                <div class='row'>
                    <div class="row card-layout">
                        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <!-- Basic Card Layout -->
                            <div class="card-profissionais-container">
                                <div tabindex="0" class="e-card card-profissionais" id="basic_card" role="button">
                                    <div class="e-card-header">
                                        <div class="e-card-header-caption">
                                            <div class="title-agendar">Dr(a) Teste Unimar</div>
                                            <div class="e-card-sub-title"><strong>CRN:</strong> 00000 - <strong>RQE</strong> Nº </div>
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
                                        <button class="e-btn e-outline e-primary" role="button">
                                            Selecionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
        <!-- End Card Section -->
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
        }
    },
    methods: {
    },
    mounted: function() {
    }
});
