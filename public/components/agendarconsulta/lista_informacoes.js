Vue.component("lista_informacoes", {
    props: ['tipoinformacoes', 'nutricionistaSelecionado'],
    template: `
<div>
    <div class="row">
        <h6 class="h6-info-consulta">Informações da consulta:</h6>
        <div class="infos_consulta col-md-12">
            <ul class="list-group">
                <li class="list-group-item highlight">
                    <strong class="color-text">Paciente:</strong> <span class="highlight">{{ pacienteNome }}</span>
                </li>
                <li class="list-group-item highlight">
                    <strong class="color-text">Data:</strong> <span class="highlight">{{ tipoinformacoes.data }}</span>
                </li>
                <li class="list-group-item highlight">
                    <strong class="color-text">Horário:</strong> <span class="highlight">{{ tipoinformacoes.horario }}</span>
                </li>
                <li class="list-group-item">
                    <strong class="color-text">Profissional:</strong> {{ nutricionistaSelecionado.nome }}
                </li>
            </ul>            
        </div>
    </div>
    <div class="e-card-actions">
        <div>
            <button type="button" class="btn" data-mdb-toggle="modal" data-mdb-target="#modalConcluir" style="background-color: #32794F; color: white;">
                Agendar
            </button>

            <div class="modal fade" id="modalConcluir" tabindex="-1" aria-labelledby="modalConcluirLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-danger text-center w-100" id="modalConcluirLabel" style="text-transform: uppercase;">Aviso</h5>
                            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body text-center" style="font-size: 18px; color: black; line-height: 1.2;">
                            <p>Confirma o agendamento da consulta?</p>
                            <button @click="agendarConsulta" class="btn btn-success">Confirmar Agendamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    data: function () {
        return {
            tipomodalconcluir: null,
            pacienteNome: 'Nome do Paciente'
        };
    },

    methods: {
        agendarConsulta() {
            const data = {
                'id_nutricionista': this.nutricionistaSelecionado.id,
                'data_consulta': this.tipoinformacoes.data ? new Date(this.tipoinformacoes.data).toISOString().split('T')[0] : null,
                'descricao': "Consulta nutricional",
                'id_status': 1
            };
    
            axios.post(BASE + '/agendarconsulta/agendarConsulta', data)
                .then((res) => {
                    this.resetInput();
                    mainLayout.sToast(res.data.msg, "success");

                    window.location.href = "http://localhost/stayfit/perfil_usuario";
                })
                .catch((error) => {
                    console.error('Erro ao agendar consulta:', error);
                    alert('Ocorreu um erro ao agendar a consulta. Tente novamente.'); 
                });
        },
        resetInput() {
            this.tipoinformacoes.data = '';
            this.nutricionistaSelecionado = null;
        }
    }
    
});
