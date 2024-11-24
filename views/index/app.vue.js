const newLocal = `
    <div class="">
        <div class="container container_home">
            <header_home :tipoheaderhome="tipoheaderhome"></header_home>        
            <section class="first_section">
                <div class="right">
                    <h1>
                        Nutrição sob medida 
                        <p class="p_h1">
                            Para cada estilo de vida
                        </p>
                    </h1>
                    <p class="p_first_section">
                        Nossa função é te orientar para o melhor estado físico e mental
                        a partir da nutrição.
                    </p>
                    <div class="div_button_first_section">
                        <a href="#nutricionista" class="button_first_section">
                            Veja nossos nutricionistas
                        </a>
                    </div>
                    
                </div>
                <div class="left">
                    <img src="public/images/gif_morangos.gif" alt="" srcset="" class="gif_morangos"/>
                </div>
            </section>        
            <section id="servicos" class="second_section" data-aos="fade-in">
                <div class="top">
                    <h1>
                        Nossos Serviços
                    </h1>
                    <p class="p_second_section">
                        Confira
                    </p>
                </div>
                <div class="bottom">
                    <div class="cards">
                        <div class="card">
                            <div class="icon_card">
                                <img src="public/images/home/doctor.svg" alt="" srcset="" class="icon_card_svg"/>
                            </div>
                            Melhores nutricionistas
                        </div>
                        <div class="card">
                            <div class="icon_card">
                                <img src="public/images/home/chat.svg" alt="" srcset="" class="icon_card_svg"/>
                            </div>
                            Agende sua consulta online
                        </div>
                        <div class="card">
                            <div class="icon_card">
                                <img src="public/images/home/suporte.svg" alt="" srcset="" class="icon_card_svg"/>
                            </div>
                            Suporte
                        </div>
                    </div>
                </div>
            </section>
            <section id="nutricionista" class="third_section" data-aos="fade-left">
                <div class="top">
                    <h1>
                        Conheça nossos Nutricionistas
                    </h1>
                </div>
                <div class="bottom_third">
                    <div class="row cards cards-row">
                        <div v-for="nutricionista in data" :key="nutricionista.id" class="card col-md-6">
                            <div class="nutri_card">
                                <p>
                                    {{ nutricionista.nome }}
                                </p>
                            </div>
                            <p>
                                CRN: {{ nutricionista.crn }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>        
            <section class="second_section" data-aos="fade-in">
                <div class="top">
                    <h1>
                        Oferecemos apenas o melhor para você
                    </h1>
                    <p class="p_second_section">
                        Desenvolvido a partir de suas necessidades
                    </p>
                </div>
            </section>   
        </div>
        <footer_home :tipofooterhome="tipofooterhome"></footer_home> 
    </div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            data: [],
            tipoheaderhome: null,
            tipofooterhome: null,
        };
    },
    mounted() {
        this.fetchNutricionistas();
    },
    methods: {
        fetchNutricionistas() {
            axios
                .get(BASE + '/index/listaNutricionista')
                .then((response) => {
                    this.data = response.data;
                })
                .catch((error) => {
                    console.error("Erro ao buscar nutricionistas:", error);
                });
        },
    },
});
