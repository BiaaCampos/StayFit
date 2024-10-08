const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_agendarConsulta">
        <div>
            <h1>Agendar Consulta</h1>
            <h6>Revisão</h6>
        </div>

        <!-- Card Section -->
        <div class="row"> <!-- Usar a row do Bootstrap -->
            <h6 class="h6-info-consulta">Informações da consulta:</h6>
            <div class="infos_consulta col-md-12">
                <ul class="list-group">
                    <li class="list-group-item highlight">
                        <strong class="color-text">Paciente:</strong> <span class="highlight">Teste</span>
                    </li>
                    <li class="list-group-item highlight">
                        <strong class="color-text">Data:</strong> <span class="highlight">10/12/2024</span>
                    </li>
                    <li class="list-group-item highlight">
                        <strong class="color-text">Horário:</strong> <span class="highlight">14:00</span>
                    </li>
                    <li class="list-group-item">
                        <strong class="color-text">Profissional:</strong> Dr(a) Teste Unimar
                    </li>
                    <li class="list-group-item highlight">
                        <strong class="color-text">Valor:</strong> <span class="highlight">R$50,00</span>
                    </li>
                    <li class="list-group-item">
                        <strong class="color-text">Modalidade:</strong> Online
                    </li>
                    <li class="list-group-item">
                        <strong class="color-text">Observação:</strong> Entrar pelo link da consulta 5 minutos antes
                    </li>
                </ul>            
            </div>
        </div>
        <div class="e-card-actions">
            <modal_concluir ref="modal" :tipomodalconcluir="tipomodalconcluir"></modal_concluir>
        </div>

        <!-- Linear Progress Bar -->
        <div id="linearsegment" style="margin: 20px auto; width: 50%;"></div>
    </div>
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            errorProgress: null,
            tipomodalconcluir: null
        }
    },
    mounted: function() {
        this.errorProgress = new ej.progressbar.ProgressBar({
            type: 'Linear',
            height: '30',
            segmentCount: 3,
            value: 100,
            animation: {
                enable: true,
                duration: 2000,
                delay: 0,
            }
        });
        this.errorProgress.appendTo('#linearsegment');
    }
});
