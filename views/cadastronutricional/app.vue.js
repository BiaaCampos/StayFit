const AppTemplate = `
<div class="bg_cadastros">
    <div class="lado_esquerdo" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo">
            <img src="public/images/images-cadastros/salada.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito">
        <div class="div_direita">
            <div class="titulo_lado_direito">
                <h1>
                    Bem vindo à 
                </h1>
                <img src="public/images/images-cadastros/stayfit_preta.svg" alt="logo" class="logo_stayfit" />
            </div>
            <div class="button-container">
                <component :is="currentComponent" @submit-form="handleSubmitForm"></component>
                <div class="around-arrow">
                    <div class="around-arrow-prev">
                        <button v-if="currentIndex > 0" class="button_cadastronutricional" @click="prevStep">
                            <img src="public/images/images-cadastros/arrow.svg" alt="seta" class="arrow-left" />
                        </button>
                    </div>
                    <div class="around-arrow-next">
                        <button v-if="currentIndex < steps.length - 1" class="button_cadastronutricional" @click="nextStep">
                            <img src="public/images/images-cadastros/arrow.svg" alt="seta" class="arrow-right" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            steps: ['historicomedico', 'habitos_alimentares'],
            currentIndex: 0
        };
    },
    computed: {
        currentStep() {
            return this.steps[this.currentIndex];
        },
        currentComponent() {
            return this.currentStep;
        }
    },
    methods: {
        nextStep() {
            if (this.currentIndex < this.steps.length - 1) {
                this.currentIndex++;
            }
        },
        prevStep() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        handleSubmitForm() {
            this.nextStep();
        }
    }
});
