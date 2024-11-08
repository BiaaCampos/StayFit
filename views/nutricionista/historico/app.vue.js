const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_historico">
        <div>
            <h1>
                Histórico
            </h1>
        </div>
        <div class="grid_historico">
            <ejs-grid
                ref="grid"
                :toolbar='toolbar'
                :allowPaging="true" 
                :pageSettings='pageSettings' 
                :allowSorting='true'
                :allowFiltering='true'
                :dataSource="data"
                :allowEditing="false"  
                :allowAdding="false"   
                :allowDeleting="false" 
                :allowSelection="false"
                >
                <e-columns>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="id_consulta" textAlign="Left" headerText="ID Consulta"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="nome_usuario" headerText="Nome Usuário"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="nome_nutricionista" headerText="Nome Nutricionista"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="data_consulta" headerText="Data da Consulta"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="15" field="descricao" headerText="Descrição"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="6" field="nome_status" headerText="Status"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
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
        fetchHistoricoData: function() {
            axios.post(BASE + '/historico/listaHistorico')
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error("Erro ao buscar histórico:", error);
                });
        }
    },
    mounted: function() {
        this.fetchHistoricoData();
    }
})
