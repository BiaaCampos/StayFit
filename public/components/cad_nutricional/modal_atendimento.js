Vue.component("modal_atendimento", {
    props: ['tipomodalatendimento', 'idPaciente'],
    template: `
    <div>
        <button type="button" class="button_modal_atendimento" data-mdb-toggle="modal" data-mdb-target="#atendimentoModal">
            <img src="public/images/images-cadastros/plus.svg" alt="" class="img_button_modal_atendimento radial" />
        </button>
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
                                    <e-column field='alimento' headerText='Alimento' width='150' editType='dropdownedit' :edit='editAlimentoParams'></e-column>
                                    <e-column field='refeicao' headerText='Refeição' width='130' editType='dropdownedit' :edit='editRefeicaoParams'></e-column>
                                    <e-column field='quantidade' headerText='Quantidade (g)' width='120' textAlign='Right' editType='numericedit'></e-column>
                                </e-columns>
                            </ejs-grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            data: [],
            selectOptions: { type: 'Single' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            filterSettings: { type: 'Menu' },
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
            alimentos: [],
            refeicoes: [],
        };
    },
    computed: {
        editAlimentoParams() {
            return {
                params: {
                    dataSource: this.alimentos,
                    fields: { text: 'nome', value: 'id' }
                }
            };
        },
        editRefeicaoParams() {
            return {
                params: {
                    dataSource: this.refeicoes,
                    fields: { text: 'nome', value: 'id' }
                }
            };
        }
    },
    methods: {
        clickHandler(args) {
            if (args.item.id === 'Grid_add') {
                this.addItem();
            } else if (args.item.id === 'Grid_edit') {
                this.editItem();
            } else if (args.item.id === 'Grid_delete') {
                this.deleteItem();
            } else if (args.item.id === 'Grid_update') {
                this.saveData();
            }
        },
        addItem() {
            console.log(this.idPaciente);return;
        },
        editItem() {
            const selectedItem = this.$refs.grid.getSelectedRecords()[0];
            if (selectedItem) {
                selectedItem.quantidade = prompt("Nova quantidade:", selectedItem.quantidade);
                this.saveData(selectedItem);
            }
        },
        deleteItem() {
            const selectedItem = this.$refs.grid.getSelectedRecords()[0];
            if (selectedItem) {
                this.excluirRegimeUsuario(selectedItem.id).then(() => {
                    const index = this.data.indexOf(selectedItem);
                    if (index > -1) {
                        this.data.splice(index, 1);
                    }
                });
            }
        },
        saveData(item) {
            const url = item.id ? BASE + '/atendimento/editarRegimeUsuario' : BASE + '/atendimento/salvarRegimeUsuario';
            const method = item.id ? 'PUT' : 'POST';
            
            axios({
                method: method,
                url: url,
                data: item
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erro ao salvar dados:", error);
            });
        },
        excluirRegimeUsuario(id) {
            return axios.delete(BASE + '/atendimento/excluirRegimeUsuario', { data: { id } })
                .then(response => {
                    console.log("Item excluído:", response.data);
                })
                .catch(error => {
                    console.error("Erro ao excluir item:", error);
                });
        },
        loadAlimentos() {
            axios.get(BASE + '/atendimento/loadAlimentos')
                .then(response => {
                    this.alimentos = response.data;
                })
                .catch(error => {
                    console.error("Erro ao buscar alimentos:", error);
                });
        },
        loadRefeicoes() {
            axios.post(BASE + '/atendimento/loadRefeicoes')
                .then(response => {
                    this.refeicoes = response.data;
                })
                .catch(error => {
                    console.error('Erro ao carregar refeições:', error);
                });
        }
    },
    mounted() {
        this.loadAlimentos();
        this.loadRefeicoes();
    }
});
