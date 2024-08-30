const newLocal = `

<div class="container container-geral" style="max-width: 100%;">
    <p>
        Olá
    </p>
    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Outlined"></ejs-textbox>
 </div>
`;
const AppTemplate = newLocal;
Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
        }
    },
    methods: {
    },
    mounted: function() {
    }

})