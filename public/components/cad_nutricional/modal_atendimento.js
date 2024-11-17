Vue.component("modal_atendimento", {
    props: ['tipomodalatendimento'],
    template: `
    <div>
        <button type="button" class="button_modal_atendimento" data-mdb-toggle="modal" data-mdb-target="#atendimentoModal">
            <img src="public/images/images-cadastros/plus.svg" alt="" class="img_button_modal_atendimento radial" />
        </button>
        <!-- Modal -->
        <div class="modal fade" id="atendimentoModal" tabindex="-1" aria-labelledby="atendimentoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="atendimentoModalLabel">Recomendações</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12 control-section">
                            <ejs-grid ref='grid' id='Grid' :dataSource="data" :allowPaging='true' :enableHover="false"
                                      :allowSelection="true" :selectionSettings="selectOptions" :toolbar='toolbar'
                                      :toolbarClick='clickHandler' :allowSorting='true' :allowFiltering='true'
                                      :filterSettings='filterSettings' :editSettings='editSettings'>
                                <e-columns>
                                    <e-column field='id' headerText='ID' width='120' textAlign='Right' :isPrimaryKey='true'></e-column>
                                    <e-column field='nome_alimento' headerText='Alimento' width='150'></e-column>
                                    <e-column field='id_refeicao' headerText='Refeição' width='130'></e-column>
                                    <e-column field='quantidade' headerText='Quantidade' width='120' textAlign='Right' editType='numericedit'></e-column>
                                </e-columns>
                            </ejs-grid>
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
            data: [], // Aqui você vai armazenar os dados da tabela
            selectOptions: { type: 'Single' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            filterSettings: { type: 'Menu' },
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
        };
    },
    methods: {
        clickHandler(args) {
            if (args.item.id === 'Grid_add') {
                // Lógica para adicionar um novo item
            } else if (args.item.id === 'Grid_edit') {
                // Lógica para editar o item selecionado
            } else if (args.item.id === 'Grid_delete') {
                // Lógica para excluir o item selecionado
            }
        },
        loadData() {
            axios.get('/api/recomendacoes_alimentos') // Substitua pela sua API
                .then(response => {
                    this.data = response.data;
                });
        },
    },
    mounted() {
        this.loadData(); // Carregar os dados ao montar o componente
    }
});
