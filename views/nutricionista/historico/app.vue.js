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
                :dataSource="data"
                :allowEditing="false"  
                :allowAdding="false"   
                :allowDeleting="false" 
                :allowSelection="false"
                :rowDataBound="rowDataBound"
                class="grid-scroll"
                >
                <e-columns class="grid-scroll">
                    <e-column clipMode='EllipsisWithTooltip' width="80" field="id_consulta" textAlign="Left" headerText="ID Consulta"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="150" field="nome_usuario" headerText="Nome Usuário"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="120" field="nome_nutricionista" headerText="Nome Nutricionista"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="120" field="data_consulta" headerText="Data da Consulta"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="180" field="descricao" headerText="Descrição"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="80" field="nome_status" headerText="Status"></e-column>
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
        },
        rowDataBound: function(args) {
            const status = args.data.nome_status; // Obtém o status da linha
            switch (status) {
                case 'agendada':
                    args.row.style.backgroundColor = '#ffeb3b'; // Amarelo
                    args.row.style.color = '#000'; // Preto
                    break;
                case 'cancelada':
                    args.row.style.backgroundColor = '#2196f3'; // Azul
                    args.row.style.color = '#fff'; // Branco
                    break;
                case 'realizada':
                    args.row.style.backgroundColor = '#4caf50'; // Verde
                    args.row.style.color = '#fff'; // Branco
                    break;
                default:
                    args.row.style.backgroundColor = '#ffffff'; // Branco padrão
                    args.row.style.color = '#000'; // Preto padrão
            }
        }
    },
    mounted: function() {
        this.fetchHistoricoData();
    }
})
