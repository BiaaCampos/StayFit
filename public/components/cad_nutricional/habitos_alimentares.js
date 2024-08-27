Vue.component("habitos_alimentares", {
    props: ['tipohabitos_alimentares'],
    template: `
<div>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <div>
                <label for="q">
                    teste
                </label>
                <input type="text" id="q" name="q">
            </div>
        </div>
    </form>
</div>`,
    methods: {
        submitForm() {
            // Aqui você pode adicionar validação, se necessário
            this.$emit('next');
        }
    }
});