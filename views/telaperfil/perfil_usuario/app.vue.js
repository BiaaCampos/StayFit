const newLocal = `
<div style="display: flex; flex-direction: row;">
  <div class="body-div">
    <div class="row" style="gap: 2rem; margin-top: 2rem;">
      <!-- Água -->
      <div class="col-md-auto">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/agua-icon.svg" alt="">
              <div>
                <h5 class="card-title">Água</h5>
                <p class="card-subtitle">recomendado: 1.4L</p>
              </div>
            </div>
            <div class="water-count">
              <div>
                <h1>0.9L</h1>
                <h3>(75%)</h3>
              </div>
              <p>espaço reservado</p>
            </div>
            <div class="add-center">
              <ejs-button
                iconCss="e-btn-sb-icons e-add-icon"
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
              >
                <i class="fas fa-minus"></i>
              </ejs-button>
              <ejs-numerictextbox 
                id="numeric" 
                ref="numeric_instance" 
                format="#.##L"
                decimals="3"
                :value="value" 
                :step="step" 
                :min="min" 
                :max="max"
                style="width: 8rem; border: 0;"
              ></ejs-numerictextbox>
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Café da Manhã -->
      <div class="col-md-auto">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/Cafe_da_manha.svg">
              <div>
                <h5 class="card-title">Café da Manhã</h5>
                <p class="card-subtitle">recomendado: 447Kcal</p>
              </div>
            </div>
            <div class="food-list">
              
            </div>
            <div class="add-center">
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
                @click.native="AbrirModal('Café da Manhã')"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Almoço -->
      <div class="col-md-auto">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/Almoco.svg">
              <div>
                <h5 class="card-title">Almoço</h5>
                <p class="card-subtitle">recomendado: 447Kcal</p>
              </div>
            </div>
            <div class="food-list">
              
            </div>
            <div class="add-center">
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
                @click.native="AbrirModal('Almoço')"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="gap: 2rem">
      <!-- Café da tarde -->
      <div class="col-md-auto">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/Cafe_da_tarde.svg">
              <div>
                <h5 class="card-title">Café da Tarde</h5>
                <p class="card-subtitle">recomendado: 447Kcal</p>
              </div>
            </div>
           <div class="food-list">
              
            </div>
            <div class="add-center">
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
                @click.native="AbrirModal('Café da Tarde')"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Jantar -->
      <div class="col-md-auto">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/Janta.svg">
              <div>
                <h5 class="card-title">Jantar</h5>
                <p class="card-subtitle">recomendado: 447Kcal</p>
              </div>
            </div>
            <div class="food-list">
              
            </div>
            <div class="add-center">
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
                @click.native="AbrirModal('Jantar')"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Ceia -->
      <div class="col-md-auto">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <div class="div-head-card">
              <img src="public/images/Ceia.svg">
              <div>
                <h5 class="card-title">Ceia</h5>
                <p class="card-subtitle">recomendado: 447Kcal</p>
              </div>
            </div>
            <div class="food-list">
              
            </div>
            <div class="add-center">
              <ejs-button
                cssClass="e-round" 
                aria-label="button"
                class="add-btn"
                @click.native="AbrirModal('Ceia')"
              ><i class="fas fa-plus"></i>
              </ejs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="gap: 2rem; display: flex; flex-direction: column;">
      <div class="card" style="width: 61rem; display: flex; flex-direction: row; align-items: center;">
        <div class="card-body" style="52rem">
          <h5 class="card-title">Histórico Médico</h5>
        </div>
        <i class="fas fa-eye" @click="AbrirModalRelatorio('Histórico Médico')" style="font-size: 3rem;margin: 0 2rem;color: #0fa958; cursor: pointer;"></i>
      </div>
      <div class="card" style="width: 61rem; display: flex; flex-direction: row; align-items: center;">
        <div class="card-body">
          <h5 class="card-title">Avaliação Nutricional</h5>
        </div>
        <i class="fas fa-eye" @click="AbrirModalRelatorio('Avaliação Nutricional')" style="font-size: 3rem;margin: 0 2rem;color: #0fa958; cursor: pointer;"></i>
      </div>
    </div>
  </div>
  <div class="perfil_info">
    <div class="card perfil_card">
      <div class="card-body">
        <div class="card_header">
          <h1 class="card-title">Perfil</h1>
          <img src="public/images/PLATINUM_LOGO.svg" alt="tipo plano">
        </div>
        <div>
          <h5>NOME</h5>
          <p>fulano</p>
        </div>
        <div class="divisor">
          <div>
            <h5>CELULAR</h5>
            <p>1845+78+6198465</p>
          </div>
          <div style="display: flex; right: 88px; position: relative; flex-direction: column;">
            <h5>EMAIL</h5>
            <p>fulano@gmail.com</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>DATA DE NASCIMENTO</h5>
            <p>99/99/9999</p>
          </div>
          <div style="display: flex; right: 144px; position: relative; flex-direction: column;">
            <h5>GÊNERO</h5>
            <p>fulano</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>PESO ATUAL</h5>
            <p>97.5Kg</p>
          </div>
          <div style="display: flex; right: 68px; position: relative; flex-direction: column;">
            <h5>PESO DESEJADO</h5>
            <p>54KG</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>ALTURA</h5>
            <p>1.70</p>
          </div>
          <div style="display: flex; right: 77px; position: relative; flex-direction: column;">
            <h5>IDENTIFICAÇÃO</h5>
            <p>26471189</p>
          </div>
        </div>
        <div>
          <h5>METAS</h5>
        </div>
      </div>
    </div>
  </div>
  <ejs-dialog 
    ref="RefeicaoDialog"
    :buttons='dlgButtons'
    :header='header'
    isModal='true'
    v-bind:visible="false"
    :animarionSettings="{ effect: 'None' }"
    :showCloseIcon='true'
    :closeOnEscape='false'
    target="body"
    width="1000px"
  >
    <ejs-tab id="tab_default" heightAdjustMode='Auto'>
      <e-tabitems>
        <e-tabitem :header="headerText2" :template="'content2'">
        <template v-slot:content2>
          <div>The United States of America (USA or U.S.A.), commonly called the United States (US or U.S.) and America, is a federal republic consisting of fifty states and a federal district. The 48 contiguous states and the federal district of Washington, D.C. are in central North America between Canada and Mexico. The state of Alaska is west of Canada and east of Russia across the Bering Strait, and the state of Hawaii is in the mid-North Pacific. The country also has five populated and nine unpopulated territories in the Pacific and the Caribbean.</div>
        </template>
      </e-tabitem>
        <e-tabitem :header='headerText1' >
          <h1>teste1</h1>
        </e-tabitem>
        <e-tabitem :header='headerText2' >
          <h1>teste1</h1>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  </ejs-dialog>
  <ejs-dialog 
    ref="RelatorioDialog"
    :buttons='dlgButtons'
    :header='header'
    isModal='true'
    v-bind:visible="false"
    :animarionSettings="{ effect: 'None' }"
    :showCloseIcon='true'
    :closeOnEscape='false'
    target="body"
    width="1000px"
  >
    
  </ejs-dialog>
</div>
`;

const AppTemplate = newLocal;
Vue.component('AppVue', {
  template: AppTemplate,
  data: function() {
    return {
      min: 0.0,
      max: 100,
      step: 0.1,
      value: 0,
      header: '',
      headerText0: { text: "Recomendado" },
      headerText1: { text: "Favoritos" },
      headerText2: { text: "Substituições" },
      dlgButtons: [
        {
          click: this.dlgBtnClick,
          buttonModel: {
            isPrimary:'true',
            content: 'alterar'
          }
        }
      ],
    }
  },
  methods: {
    AbrirModal(args) {
      this.header = args
      this.$refs.RefeicaoDialog.show();
    },
    AbrirModalRelatorio(args) {
      this.header = args
      this.$refs.RelatorioDialog.show();
    },
    dlgBtnClick() {
      console.log('enviando')
    }
  },
  mounted: function() {
  }

})
