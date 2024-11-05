const newLocal = `
<div class="error-page">
    <div class="content">
        <h1 data-text="404">404</h1>
        <h4 data-text="Opa, Pagina não encontrada">Opa, Pagina não encontrada</h4>
        <p>Sinto muito, mas parece que a pagina que está procurando não existe ou você não tem a permissão de acesso necessária</p>
        <div class="btns">
            <a @click="getReturn()">Voltar ao meu posto</a>
        </div>
    </div>
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
           
        };
    },
    methods: {
        getReturn() {
            // console.log("ness");
            axios.get(BASE + "/telaErro/ReturnType").then((res) => {
                if (res.data.data == 0) {
                    window.location.href = BASE + '/'
                } 

                if (res.data.data == 1) {
                    window.location.href = BASE + '/perfil_nutricionista'
                } 
                
                if(res.data.data == 2){
                    window.location.href = BASE + '/perfil_usuario'
                }
            })
        }
    },
});
