const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_marmitarias">
        <div>
            <h1>Marmitarias Parceiras</h1>
        </div>
        <div class="form_marmitarias">
            <div style="width: 100%;">
                <iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=450&amp;hl=en&amp;q=Av.%20Rio%20Branco,%20471%20-%20Alto%20Cafezal,%20Mar%C3%ADlia%20-%20SP,%2017500-090+(Clean%20Food)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    <a href="https://www.gps.ie/">gps vehicle tracker</a>
                </iframe>
            </div>
        </div>
        <div class="logos_marmitarias" style="width: 100%; overflow: hidden; white-space: nowrap; position: relative;">
            <div class="logos-container" :style="logosContainerStyle">
                <img v-for="logo in duplicatedLogos" :key="logo + Math.random()" :src="logo" alt="Logo de Marmitaria" class="logo-img">
            </div>
        </div>
    </div>
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            logos: [
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png",
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png",
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png",
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png",
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png",
                "public/images/logo_marmitaria1.png",
                "public/images/logo_marmitaria2.png"
            ],
        };
    },
    computed: {
        duplicatedLogos() {
            // Duplicamos automaticamente as imagens para preencher o espaço e criar o loop contínuo
            return [...this.logos, ...this.logos];
        },
        logosContainerStyle() {
            return {
                display: 'inline-flex',
                gap: '10px',
                animation: 'scroll 20s linear infinite'
            };
        }
    }
});
