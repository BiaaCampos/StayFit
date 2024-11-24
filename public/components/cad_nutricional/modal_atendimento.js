Vue.component("modal_atendimento", {
    props: ['tipomodalatendimento', 'idPaciente'],
    template: `
    <div>
        <button type="button" class="button_modal_atendimento" @click="abrirModalRecomendacoes">
            <img src="public/images/images-cadastros/plus.svg" alt="" class="img_button_modal_atendimento radial" />
        </button>
        <div class="modal fade" id="atendimentoModal" tabindex="-1" aria-labelledby="atendimentoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="atendimentoModalLabel">Recomendações</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12 control-section">
                            <ejs-grid ref="grid" id="Grid" :dataSource="data" :allowPaging="true" :allowSelection="true" 
                                :selectionSettings="selectOptions" :toolbar="toolbar" :toolbarClick="toolbarClick" 
                                :allowSorting="true" :allowFiltering="true" :filterSettings="filterSettings">
                                <e-columns>
                                    <e-column field="alimento_nome" headerText="Alimento" width="150"></e-column>
                                    <e-column field="refeicao_nome" headerText="Refeição" width="130"></e-column>
                                    <e-column field="quantidade" headerText="Quantidade (g)" width="120" textAlign="Right"></e-column>
                                </e-columns>
                            </ejs-grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="novoRegistroModal" tabindex="-1" aria-hidden="true" style="z-index: 1056;">
            <div class="modal-dialog modal-dialog-2">
                <div class="modal-content modal-content-2">
                    <div class="modal-header">
                        <h5 class="modal-title">Novo Registro</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ejs-dropdownlist id="alimentoDropdown" placeholder="Selecione um Alimento" 
                            :dataSource="alimentos" :fields="dropdownFields" v-model="novoRegistro.alimento"></ejs-dropdownlist>
                        <ejs-dropdownlist id="refeicaoDropdown" placeholder="Selecione uma Refeição" 
                            :dataSource="refeicoes" :fields="dropdownFields" v-model="novoRegistro.refeicao"></ejs-dropdownlist>
                        <ejs-textbox id="quantidadeTextbox" placeholder="Quantidade (g)" v-model="novoRegistro.quantidade"></ejs-textbox>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-salvar" @click="salvarRecomendacao">Salvar</button>
                        <button type="button" class="btn btn-fechar" data-mdb-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editarRegistroModal" tabindex="-1" aria-hidden="true" style="z-index: 1056;">
            <div class="modal-dialog modal-dialog-2">
                <div class="modal-content modal-content-2">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Registro</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ejs-dropdownlist id="alimentoEditDropdown" placeholder="Selecione um Alimento" 
                            :dataSource="alimentos" :fields="dropdownFields" v-model="registroEdicao.alimento"></ejs-dropdownlist>
                        <ejs-dropdownlist id="refeicaoEditDropdown" placeholder="Selecione uma Refeição" 
                            :dataSource="refeicoes" :fields="dropdownFields" v-model="registroEdicao.refeicao"></ejs-dropdownlist>
                        <ejs-textbox id="quantidadeEditTextbox" placeholder="Quantidade (g)" 
                            v-model="registroEdicao.quantidade"></ejs-textbox>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-salvar" @click="atualizarRecomendacao">Atualizar</button>
                        <button type="button" class="btn btn-fechar" data-mdb-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            data: [],
            selectOptions: { type: 'Single' },
            toolbar: [
                { text: "Novo", prefixIcon: "fas fa-plus", id: "Adicionar" },
                { text: "Editar", prefixIcon: "fas fa-edit", id: "Editar" },
                { text: "Excluir", prefixIcon: "fas fa-trash", id: "Excluir" }
            ],
            filterSettings: { type: 'Menu' },
            alimentos: [],
            refeicoes: [],
            dropdownFields: { text: 'nome', value: 'id' },
            novoRegistro: { alimento: null, refeicao: null, quantidade: null },
            registroEdicao: { id: null, alimento: null, refeicao: null, quantidade: null }
        };
    },
    methods: {
        abrirModalRecomendacoes() {
            const atendimentoModal = new mdb.Modal(document.getElementById('atendimentoModal'));
            atendimentoModal.show();
            this.carregarDados();
        },
        toolbarClick(args) {
            if (args.item.id === 'Adicionar') this.abrirModalNovoRegistro();
            if (args.item.id === 'Editar') this.editarRegistro();
            if (args.item.id === 'Excluir') this.excluirRecomendacao();
        },
        abrirModalNovoRegistro() {
            const novoRegistroModal = new mdb.Modal(document.getElementById('novoRegistroModal'));
            novoRegistroModal.show();
            this.novoRegistro = { alimento: null, refeicao: null, quantidade: null };
        },
        salvarRecomendacao() {
            if (!this.novoRegistro.alimento || !this.novoRegistro.quantidade || !this.idPaciente) {
                mainLayout.sToast("Preencha todos os campos antes de salvar", "warning");
                return;
            }
            axios.post(BASE + '/atendimento/salvarRecomendacao', { ...this.novoRegistro, id_paciente: this.idPaciente })
                .then(response => {
                    this.carregarDados();
                    mainLayout.sToast(response.data.msg, "success");
                    mdb.Modal.getInstance(document.getElementById('novoRegistroModal')).hide();
                });
        },
        editarRegistro() {
            const selecionados = this.$refs.grid.getSelectedRecords();
            if (selecionados.length === 0) {
                mainLayout.sToast("Selecione um registro para editar", "warning");
                return;
            }
        
            const registroSelecionado = selecionados[0];
            this.registroEdicao.id = registroSelecionado.regime_id;
            this.registroEdicao.alimento = registroSelecionado.id_alimento;
            this.registroEdicao.refeicao = registroSelecionado.id_refeicao;
            this.registroEdicao.quantidade = registroSelecionado.quantidade;
                    
            const editarRegistroModal = new mdb.Modal(document.getElementById('editarRegistroModal'));
            editarRegistroModal.show();
        },        
        atualizarRecomendacao() {
            if (!this.registroEdicao.alimento || !this.registroEdicao.quantidade || !this.idPaciente) {
                mainLayout.sToast("Preencha todos os campos antes de atualizar.", "success");
                return;
            }           
            axios.post(BASE + '/atendimento/editarRegimeUsuario', { ...this.registroEdicao, id_paciente: this.idPaciente })
                .then(response => {
                    this.carregarDados();
                    mainLayout.sToast(response.data.msg, "success");
                    mdb.Modal.getInstance(document.getElementById('editarRegistroModal')).hide();
                });
        },        
        excluirRecomendacao() {
            const selecionados = this.$refs.grid.getSelectedRecords();
            if (!selecionados.length) {
                mainLayout.sToast("Selecione um registro para excluir", "warning");
                return;
            }
            axios.post(BASE + '/atendimento/excluirRegimeUsuario', {
                id: selecionados[0].regime_id,
                id_paciente: this.idPaciente
            }).then(response => {
                this.carregarDados();
                mainLayout.sToast(response.data.msg, "success");
            });
        },
        carregarDados() {
            axios.post(BASE + '/atendimento/listaRecomendacao', { id_paciente: this.idPaciente })
                .then(response => {
                    this.data = response.data.data || [];
                    this.novoRegistro = { alimento: null, refeicao: null, quantidade: null };
                    this.registroEdicao = { id: null, alimento: null, refeicao: null, quantidade: null };
                });
        },
        loadAlimentos() {
            axios.get(BASE + '/atendimento/loadAlimentos').then(response => {
                this.alimentos = response.data;
            });
        },
        loadRefeicoes() {
            axios.get(BASE + '/atendimento/loadRefeicoes').then(response => {
                this.refeicoes = response.data;
            });
        }
    },
    mounted() {
        this.loadAlimentos();
        this.loadRefeicoes();
    }
});
