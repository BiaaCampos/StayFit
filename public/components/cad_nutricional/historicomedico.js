Vue.component("historicomedico", {
    props: ['tipohistoricomedico'],
    template: `
<div>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <div class="number">
                1
            </div>
            <div>
                <label for="q1">
                    Qual é o seu nome?
                </label>
                <input type="text" id="q1" name="q1">
            </div>
            <div>
                <span class="help-icon">
                    <img src="public/images/images-cadastros/question.svg" alt="logo" />
                    <span class="tooltip">Digite seu nome completo.</span>
                </span>
            </div>
        </div>
    </form>
</div>`,
    methods: {
        submitForm() {
            this.$emit('next');
        }
    }
});