Vue.component("teste", {
    props: ['tipomodalteste'],
    template: `
    <div>
        <button type="button" class="teste" data-mdb-toggle="modal" data-mdb-target="#teste">
            <img src="public/images/images-cadastros/plus.svg" alt="" srcset="" class="img_button_modal_atendimento radial" />
        </button>
        <!-- Modal -->
        <div class="modal fade" id="teste" tabindex="-1" aria-labelledby="testeLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="testeLabel">Café da manhã</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <div class="control-section e-tab-section">
                            <div class="e-sample-resize-container">
                                <ejs-tab id="tab_default" heightAdjustMode='Auto'>
                                    <e-tabitems>
                                        <e-tabitem :header='headerText0' :content='content0'></e-tabitem>
                                        <e-tabitem :header='headerText1' :content='content1'></e-tabitem>
                                        <e-tabitem :header='headerText2' :content='content2'></e-tabitem>
                                        <e-tabitem :header='headerText3' :content='content3'></e-tabitem>
                                        <e-tabitem :header='headerText4' :content='content4'></e-tabitem>
                                    </e-tabitems>
                                </ejs-tab>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            isModal: true,
            animationSettings: { effect: 'Zoom' },
            headerText0: { text: "Café da manhã" },
            headerText1: { text: "Almoço" }, 
            headerText2: { text: "Café da tarde" },
            headerText3: { text: "jantar" },
            headerText4: { text: "Café da noite" },
            content0: ' teste 1 ',
            content1: ' teste 2',            
            content2: ' teste 3',
            content3: ' teste 4',
            content4: ' teste 5',
            }
    },
    methods: {
    }
});
