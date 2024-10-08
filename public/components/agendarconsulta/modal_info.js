Vue.component("modal_info", {
    props: ['tipomodalinfo'],
    template: `
    <div>
        <button type="button" class="btn" data-mdb-toggle="modal" data-mdb-target="#modalInfo" style="background-color: #32794F; color: white;">
            Selecionar
        </button>

        <div class="modal fade" id="modalInfo" tabindex="-1" aria-labelledby="modalInfoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- Adicionado modal-lg para tamanhos maiores -->
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger text-center w-100" id="modalInfoLabel" style="text-transform: uppercase;">Aviso</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body text-center" style="font-size: 18px; color: black; line-height: 1.2;">
                        <p>{{ tipomodalinfo }}</p>
                        <p>A StayFit é uma plataforma de consulta feita de forma totalmente online.</p>
                        <p>Para se consultar, escolha a melhor data e horário para marcar a consulta, que será realizada por chamada de vídeo!</p>
                    </div>

                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-primary" data-mdb-dismiss="modal" style="background-color: #32794F; color: white;">Continuar agendamento</button>
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
