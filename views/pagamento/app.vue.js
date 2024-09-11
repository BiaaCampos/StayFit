const newLocal = `
<div class="bg_cadastros2">
    <div class="lado_esquerdo2" style="background-image:url('public/images/back-green.svg')">
        <div class="img_lado_esquerdo2">
            <img src="public/images/images-cadastros/Images.svg" alt="salada" />
        </div>
    </div>
    <div class="lado_direito2">
        <div class="div_direita2">
            <div class="text-center mb-4">
                <h1>Pagamento</h1>
            </div>
            <form>
                <div style="display: flex; gap: 20px;">
                    <div class="form-group" style="width: 50%;">
                        <label for="nome" class="inputs-cartao">Nome completo:</label>
                        <input type="text" class="form-control input" id="nome" placeholder="Nome completo">
                    </div>
                    <div class="form-group" style="width: 50%; position: relative;">
                        <label for="formaPagamento" class="inputs-cartao">Forma de pagamento:</label>
                        <select class="form-control forma-pagamento input" id="formaPagamento">
                            <option value="credito">Cartão de Crédito</option>
                            <option value="debito">Cartão de Débito</option>
                            <option value="boleto">Boleto Bancário</option>
                            <option value="pix">PIX</option>
                        </select>
                        <i class="fa fa-chevron-down" style="position: absolute; right: 10px; top: 75%; transform: translateY(-50%); pointer-events: none;"></i>
                    </div>
                </div>
                <div class="mb-1 text-center detalhesCartao">
                    <h1>Detalhes do Cartão</h1>
                </div>
                <div class="form-group" id="detalhesCartao">
                    <div class="form-group">
                        <label for="numeroCartao" class="inputs-cartao">Número do cartão:</label>
                        <input type="text" class="form-control input" id="numeroCartao" maxlength="19" placeholder="0000 0000 0000 0000">
                    </div>
                    <div class="form-group">
                        <label for="nomeCartao" class="inputs-cartao">Nome no cartão:</label>
                        <input type="text" class="form-control input-nome-cartao" id="nomeCartao" placeholder="Nome no cartão">
                    </div>
                    <div style="display: flex; gap: 20px;">
                        <div class="form-group" style="width: 50%;">
                            <label for="validadeCartao" class="inputs-cartao">Validade:</label>
                            <input type="text" class="form-control input" id="validadeCartao" maxlength="5" placeholder="MM/AA">
                        </div>
                        <div class="form-group" style="width: 50%;">
                            <label for="cvvCartao" class="inputs-cartao">CVV:</label>
                            <input type="text" class="form-control input" id="cvvCartao" maxlength="4" placeholder="000">
                        </div>
                    </div>
                </div>
                <div class="input-button">
                    <button class="button_cadastronutricional" type="submit">Finalizar</button>
                </div>
            </form>
        </div>
    </div>
</div>
`;

const AppTemplate = newLocal;
Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            formaPagamento: 'credito'
        }
    },
    methods: {
        mostrarDetalhesCartao() {
            const detalhesCartao = document.getElementById('detalhesCartao');
            detalhesCartao.style.display = (this.formaPagamento === 'credito' || this.formaPagamento === 'debito') ? 'block' : 'none';
        },
        formatarNumeroCartao(event) {
            const input = event.target;
            let valor = input.value.replace(/\D/g, '');
            if (valor.length > 16) valor = valor.slice(0, 16);
            input.value = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
        },
        formatarValidade(event) {
            const input = event.target;
            let valor = input.value.replace(/\D/g, '');
            if (valor.length > 4) valor = valor.slice(0, 4);
            input.value = valor.replace(/(\d{2})(?=\d)/, '$1/');
        },
        formatarCVV(event) {
            const input = event.target;
            let valor = input.value.replace(/\D/g, '');
            if (valor.length > 4) valor = valor.slice(0, 4);
            input.value = valor;
        }
    },
    watch: {
        formaPagamento() {
            this.mostrarDetalhesCartao();
        }
    },
    mounted: function() {
        this.mostrarDetalhesCartao();
        document.getElementById('numeroCartao').addEventListener('input', this.formatarNumeroCartao);
        document.getElementById('validadeCartao').addEventListener('input', this.formatarValidade);
        document.getElementById('cvvCartao').addEventListener('input', this.formatarCVV);
    }
});
