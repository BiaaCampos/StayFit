const newLocal = `

<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_dashboard">
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