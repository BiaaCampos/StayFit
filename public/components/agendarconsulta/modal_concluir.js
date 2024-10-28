Vue.component("modal_concluir", {
    props: ['tipomodalconcluir'],
    template: `
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
                        <p>{{ tipomodalconcluir }}</p>
                        <p>Sua consulta foi agendada com sucesso!</p>
                        <button @click="agendarConsulta" class="btn btn-success">Confirmar Agendamento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            isModal: true,
        }
    },
    methods: {
        agendarConsulta() {
            const data = {
                id_usuario: 1, // Substitua pelo ID do usuário logado
                id_nutricionista: this.tipomodalconcluir.nutricionista.id,
                data_consulta: this.tipomodalconcluir.data,
                descricao: "Consulta nutricional", // Descrição opcional
                id_status: 1 // Substitua pelo ID do status desejado
            };
    
            axios.post(BASE + '/agendarconsulta', data)
                .then((res) => {
                    console.log(res.data);
                    this.resetInput();
                })
                .catch((error) => {
                    console.error('Erro ao agendar consulta:', error);
                });
        },
    }
});
