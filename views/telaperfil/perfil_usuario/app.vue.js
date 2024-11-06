const newLocal = `
<div style="display: flex; flex-direction: row;">
  <div class="body-div">
    <div class="central">
      <div class="row" style="gap: 2rem; margin-top: 2rem;">
        <!-- Água -->
        <div class="col-md-auto">
          <div class="card col" style="width: 18rem;">
            <div class="card-body">
              <div class="div-head-card">
                <img src="public/images/agua-icon.svg" alt="">
                <div>
                  <h5 class="card-title">Água</h5>
                  <p class="card-subtitle">recomendado: 3L</p>
                </div>
              </div>
              <div class="water-count">
                <div>
                  <h1 style="font-size: 38px;">{{ consumoAgua[0].TOTAL_CONSUMIDO }}L</h1>
                  <h3 style="font-size: 24px;">({{ consumoAgua[0].PORCENTAGEM_CONSUMO }})</h3>
                </div>
                <p>espaço reservado</p>
              </div>
              <div class="add-center">
                <ejs-button
                  iconCss="e-btn-sb-icons e-add-icon"
                  cssClass="e-round" 
                  aria-label="button"
                  class="add-btn"
                  @click.native="addAgua('-')"
                >
                  <i class="fas fa-minus"></i>
                </ejs-button>
                <ejs-numerictextbox 
                  id="numeric" 
                  ref="numeric_instance" 
                  format="### ml"
                  decimals="0"
                  :value="value" 
                  :step="step" 
                  :min="min" 
                  :max="max"
                  style="width: 8rem; border: 0;"
                  v-model="qntAgua"
                ></ejs-numerictextbox>
                <ejs-button
                  cssClass="e-round" 
                  aria-label="button"
                  class="add-btn"
                  @click.native="addAgua('+')"
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
                <ul class="list-group">
                  <template v-if="itemCardapio.CafeDaManha.length > 0">
                      <li v-for="item in itemCardapio.CafeDaManha.slice(0, 2)" :key="item.id" class="list-group-item">
                          <span class="item-name">{{ item.ALIMENTO }}</span>
                          <span class="separator"></span>
                          <span class="item-quantity">{{ item.QUANTIDADE }}</span>
                      </li>
                  </template>
                  
                  <li v-else class="list-group-item">
                      <span class="item-name">Alimentos não identificado</span>
                  </li>
                </ul>
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
                <ul class="list-group">
                  <template v-if="itemCardapio.Almoco.length > 0">
                      <li v-for="item in itemCardapio.Almoco.slice(0, 2)" :key="item.id" class="list-group-item">
                          <span class="item-name">{{ item.ALIMENTO }}</span>
                          <span class="separator"></span>
                          <span class="item-quantity">{{ item.QUANTIDADE }}</span>
                      </li>
                  </template>
                  
                  <li v-else class="list-group-item">
                      <span class="item-name">Alimentos não identificado</span>
                  </li>
                </ul>
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
                <ul class="list-group">
                  <template v-if="itemCardapio.CafeDaTarde.length > 0">
                      <li v-for="item in itemCardapio.CafeDaTarde.slice(0, 2)" :key="item.id" class="list-group-item">
                          <span class="item-name">{{ item.ALIMENTO }}</span>
                          <span class="separator"></span>
                          <span class="item-quantity">{{ item.QUANTIDADE }}</span>
                      </li>
                  </template>
                  
                  <li v-else class="list-group-item">
                      <span class="item-name">Alimentos não identificado</span>
                  </li>
                </ul>
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
                <ul class="list-group">
                  <template v-if="itemCardapio.Jantar.length > 0">
                      <li v-for="item in itemCardapio.Jantar.slice(0, 2)" :key="item.id" class="list-group-item">
                          <span class="item-name">{{ item.ALIMENTO }}</span>
                          <span class="separator"></span>
                          <span class="item-quantity">{{ item.QUANTIDADE }}</span>
                      </li>
                  </template>
                  
                  <li v-else class="list-group-item">
                      <span class="item-name">Alimentos não identificado</span>
                  </li>
                </ul>
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
                <ul class="list-group">
                  <template v-if="itemCardapio.Ceia.length > 0">
                      <li v-for="item in itemCardapio.Ceia.slice(0, 2)" :key="item.id" class="list-group-item">
                          <span class="item-name">{{ item.ALIMENTO }}</span>
                          <span class="separator"></span>
                          <span class="item-quantity">{{ item.QUANTIDADE }}</span>
                      </li>
                  </template>
                  
                  <li v-else class="list-group-item">
                      <span class="item-name">Alimentos não identificado</span>
                  </li>
                </ul>
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
      <div style="gap: 2rem; display: flex; flex-direction: column; padding-bottom: 2rem;">
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
          <p>{{ userData[0].NOME }}</p>
        </div>
        <div class="divisor">
          <div>
            <h5>CELULAR</h5>
            <p>{{ userData[0].TELEFONE }}</p>
          </div>
          <div style="display: flex; right: 88px; position: relative; flex-direction: column;">
            <h5>EMAIL</h5>
            <p>{{ userData[0].EMAIL }}</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>DATA DE NASCIMENTO</h5>
            <p>{{ userData[0].NASCIMENTO }}</p>
          </div>
          <div style="display: flex; right: 144px; position: relative; flex-direction: column;">
            <h5>GÊNERO</h5>
            <p>{{ userData[0].GENERO }}</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>PESO ATUAL</h5>
            <p>{{ userData[0].PESO_ATUAL }}</p>
          </div>
          <div style="display: flex; right: 68px; position: relative; flex-direction: column;">
            <h5>PESO DESEJADO</h5>
            <p>{{ userData[0].PESO_IDEAL }}</p>
          </div>
        </div>
        <div class="divisor">
          <div>
            <h5>ALTURA</h5>
            <p>{{ userData[0].ALTURA }}</p>
          </div>
          <div style="display: flex; right: 77px; position: relative; flex-direction: column;">
            <h5>IDENTIFICAÇÃO</h5>
            <p>{{ userData[0].ID }}</p>
          </div>
        </div>
        <div>
          <h5>METAS</h5>
          <p>{{ userData[0].OBJETIVO }}</p>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 15vh;">
          <ejs-button 
            id="editBtn"
            cssClass="e-success">
            Editar informações
          </ejs-button>
        </div>
      </div>
    </div>
  </div>

  <alimento_tab ref="alimento_tab" :data="tabData" :header="header" :refeicao="typeRefeicao"></alimento_tab>

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
      min: 0,
      max: 1000,
      step: 50,
      value: 0,
      header: '',
      userData: [],
      consumoAgua: [],
      tabData: [],
      typeRefeicao: '',
      itemCardapio: {
        CafeDaManha: [],
        Almoco: [],
        CafeDaTarde: [],
        Jantar: [],
        Ceia: [],
      },
      qntAgua: '',
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
    getInfos(){
      axios.get(BASE + "/perfil_usuario/getInfos").then((res) => {
        this.userData = res.data.data;
      })
    },
    getAgua(){
      axios.get(BASE + "/perfil_usuario/getAgua").then((res) => {
        this.consumoAgua = res.data.data;
      })
    },
    addAgua(args){
      const agua = {
        "qntd": this.qntAgua,
        "tipo": args
      }

      axios.post(BASE + "/perfil_usuario/addAgua", agua).then((res) => {
        console.log(res)
        if (res.data.code == 1) {
          mainLayout.sToast(res.data.msg, "","success");
          this.getAgua();
        } else {
          mainLayout.sToast(res.data.msg, "","warning");
        }
      })
    },
    getRefeicoes(){
      axios.get(BASE + "/perfil_usuario/getRefeicoes").then((res) => {
        const data = res.data.data;
        
        if (res.data.code == 1) {
          data.forEach(item => {
            switch (item.refeicao) {
              case 'cafe da manha':
                this.itemCardapio.CafeDaManha = item.alimento;
                this.typeRefeicao = 1;
                
                break;
                case 'almoco':
                  this.itemCardapio.Almoco = item.alimento;
                  this.typeRefeicao = 2;
                  break;
                  case 'janta':
                    this.itemCardapio.Jantar = item.alimento;
                    this.typeRefeicao = 3;
                    break;
                    case 'cafe da tarde':
                      this.itemCardapio.CafeDaTarde = item.alimento;
                      this.typeRefeicao = 4;
                      break;
                      case 'ceia':
                        this.typeRefeicao = 5;
                        this.itemCardapio.Ceia = item.alimento;
                        break;
            }
          });
        }
      })
    },
    AbrirModal(args) {
      this.header = args
      console.log(args)
      switch (args) {
        case 'Café da Manhã':
            this.tabData = this.itemCardapio.CafeDaManha
          break;
        case 'Almoço':
            this.tabData = this.itemCardapio.Almoco
          break;
        case 'Café da Tarde':
            this.tabData = this.itemCardapio.CafeDaTarde
          break;
        case 'Jantar':
            this.tabData = this.itemCardapio.Jantar
          break;
        case 'Ceia':
            this.tabData = this.itemCardapio.Ceia
          break;
      }
      console.log(this.tabData)
      this.$refs.alimento_tab.$refs.RefeicaoDialog.show();
    },
    AbrirModalRelatorio(args) {
      this.header = args
      this.$refs.RelatorioDialog.show();
    },
    dlgBtnClick() {
      console.log('enviando')
    },
  },
  mounted: function() {
    this.getInfos()
    this.getRefeicoes()
    this.getAgua()
  }

})
