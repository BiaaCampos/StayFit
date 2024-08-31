const newLocal = `
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
                    <a href="#" class="button_first_section">
                        Veja nossos planos
                    </a>
                </div>
                
            </div>
            <div class="left">
                <img src="public/images/gif_morangos.gif" alt="" srcset="" class="gif_morangos"/>
            </div>
        </section>        
        <section class="second_section" data-aos="fade-in">
            <div class="top">
                <h1>
                    Nossos Serviços
                </h1>
                <p class="p_second_section">
                    Nós dedicamos a servir o melhores serviços nutricionais
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
        <section class="third_section" data-aos="fade-left">
            <div class="top">
                <h1>
                    Conheça nossos Nutricionistas
                </h1>
            </div>
            <div class="bottom_third">
                <div class="row cards cards-row">
                    <div class="card col-md-6">
                        <div class="icon_card">
                            <img src="public/images/home/doctor.svg" alt="" srcset="" class="icon_card_svg"/>
                        </div>
                        Melhores nutricionistas
                    </div>
                    <div class="card col-md-6">
                        <div class="icon_card">
                            <img src="public/images/home/chat.svg" alt="" srcset="" class="icon_card_svg"/>
                        </div>
                        Agende sua consulta online
                    </div>
                </div>
                <div class="row cards cards-row">
                    <div class="card col-md-6">
                        <div class="icon_card">
                            <img src="public/images/home/doctor.svg" alt="" srcset="" class="icon_card_svg"/>
                        </div>
                        Melhores nutricionistas
                    </div>
                    <div class="card col-md-6">
                        <div class="icon_card">
                            <img src="public/images/home/chat.svg" alt="" srcset="" class="icon_card_svg"/>
                        </div>
                        Agende sua consulta online
                    </div>
                </div>
            </div>
        </section>

    </div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            tipoheaderhome: null
        };
    },
});
