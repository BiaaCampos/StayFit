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
                :dataSource="data">
                <e-columns>
                    <e-column clipMode='EllipsisWithTooltip' field="id_audio" width="3" textAlign="Center" headerText="Id"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="tituloAudio" headerText="Título"></e-column>
                    <e-column clipMode='EllipsisWithTooltip' width="10" field="descricaoAudio" headerText="Descrição"></e-column>
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
    },
    mounted: function() {
    }

})