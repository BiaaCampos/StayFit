Vue.component("modal_concluir", {
    props: ['tipomodalconcluir'],
    template: `
    <div>
        <button type="button" class="btn" data-mdb-toggle="modal" data-mdb-target="#modalConcluir" style="background-color: #32794F; color: white;">
            Agendar
        </button>

        <div class="modal fade" id="modalConcluir" tabindex="-1" aria-labelledby="modalConcluirLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- Adicionado modal-lg para tamanhos maiores -->
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger text-center w-100" id="modalConcluirLabel" style="text-transform: uppercase;">Aviso</h5> <!-- id ajustado -->
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body text-center" style="font-size: 18px; color: black; line-height: 1.2;">
                        <p>{{ tipomodalconcluir }}</p> <!-- Usando a prop corretamente -->
                        <p>Sua consulta foi agendada com sucesso!</p>
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
    methods: {}
});
