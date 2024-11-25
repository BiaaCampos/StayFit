Vue.component("alimento_tab", {
    props: ['data', 'header', 'refeicao'],
    template: `
    <ejs-dialog 
      ref="RefeicaoDialog"
      :header='header'
      isModal='true'
      v-bind:visible="false"
      :animarionSettings="{ effect: 'None' }"
      :showCloseIcon='true'
      :closeOnEscape='false'
      target="body"
      class="dialog"
      width="80vw"
      height="60vh"
    >
      <!-- Loading -->
      <div id="spinner">
        <div class="lds-ring">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>

      <div id='Template1_content' style='display: none'>
        <ejs-grid
          ref="gridPrincipal"
          :dataSource="data" 
          :allowPaging='true'
        >
          <e-columns>
            <e-column field='ALIMENTO' headerText='Alimento'></e-column>
            <e-column field='CALORIAS' headerText='Cal.'></e-column>
            <e-column field='CARBOIDRATOS' headerText='Carboidratos'></e-column>
            <e-column field='FIBRAS' headerText='Fibras'></e-column>
            <e-column field='GORDURAS' headerText='Gorduras'></e-column>
            <e-column field='GRUPO_ALIMENTAR' headerText='Grupo alimentar'></e-column>
            <e-column field='PROTEINAS' headerText='Proteinas'></e-column>
            <e-column field='QUANTIDADE' headerText='Quantidade'></e-column>
            <e-column field='ID' :template="columnTemplate" headerText='Fav'></e-column>
          </e-columns>
        </ejs-grid>
      </div>

      <div id='Template2_content' style='display: none'>
        <ejs-grid
          :dataSource="dataFavorito" 
          :allowPaging='true'
        >
          <e-columns>
            <e-column field='ALIMENTO' headerText='Alimento' textAlign='Center'></e-column>
            <e-column field='CALORIAS' headerText='Cal.' textAlign='Center'></e-column>
            <e-column field='CARBOIDRATOS' headerText='Carboidratos' textAlign='Center'></e-column>
            <e-column field='FIBRAS' headerText='Fibras' textAlign='Center'></e-column>
            <e-column field='GORDURAS' headerText='Gorduras' textAlign='Center'></e-column>
            <e-column field='GRUPO_ALIMENTAR' headerText='Grupo alimentar' textAlign='Center'></e-column>
            <e-column field='PROTEINAS' headerText='Proteinas'></e-column>
          </e-columns>
        </ejs-grid>
      </div>

      <div id='Template3_content' style='display: none'>
        <div class="tab_content" id='this.data' style='display: flex; flex-direction: row; gap: 2rem; justify-content: center;'>
          <div class="dual-list-groupa" style="width: 25vw;">
              <h4>Alimento Sugerido</h4>
              <ejs-listbox 
                :dataSource="data" 
                :fields="fields"
                height="330px"
                @change="getSubstituicoes()"
                :selectionSettings="selectionSettings"
                scope="#connected-listbox"
                v-model='alimentoIdSub'
                >
              </ejs-listbox>
            </div>
            <div class="dual-list-groupb" style="width: 25vw;">
              <h4>Possiveis Substitiuções</h4>
              <ejs-listbox 
                id="connected-listbox" 
                :dataSource="dataSub"
                height="330px"
                noRecordsTemplate="Selecione um item"
                :itemTemplate="templateList"
                :fields="fields">
              </ejs-listbox>
            </div>
        </div>
      </div>

      <ejs-tab @selecting="openLoad()" ref="tab" id="tab_default" heightAdjustMode='Auto'>
        <e-tabitems>
          <e-tabitem :header="headerText0" :content="Template1"></e-tabitem>
          <e-tabitem :header='headerText1' :content="Template2"></e-tabitem>
          <e-tabitem :header='headerText2' :content="Template3"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </ejs-dialog>
    `,
    data() {
      return {
        selectedTab: 0,
        dataFavorito: [],
        dataSub: [],
        Template1: '#Template1_content',
        Template2: '#Template2_content',
        Template3: '#Template3_content',
        headerText0: { text: "Recomendado" },
        headerText1: { text: "Favoritos" },
        headerText2: { text: "Substituições" },
        fields: { text: 'ALIMENTO', value: 'ID'},
        selectionSettings: { mode: "Single" },
        alimentoIdSub: '',
        // dlgButtons: [
        //   {
        //     click: this.dlgBtnClick,
        //     buttonModel: {
        //       isPrimary:'true',
        //       content: 'alterar'
        //     }
        //   }
        // ],
        templateList: function () {
          return {
              template: Vue.component('templateList',{
                  template: `
                  <li class="list-group-item" id='subList'>
                    <span class="item-name">{{ data.ALIMENTO }}</span>
                    <span class="separator"></span>
                    <span class="item-quantity">{{ data.QUANTIDADE }}</span>
                  </li>`,
                  data: function () {
                      return {}
                  },
                  methods: {}
              })
          }
        },
        columnTemplate: function () {
          return {
              template: Vue.component('columnTemplate',{
                  template: `
                    <span @click="favoritar(data)" style='cursor: pointer;'>
                      <i v-if="data.FAVORITO === 'N'" id="cVazio" class="bx bx-heart"></i> <!-- Ícone vazio -->
                      <i v-else id="cCheio" class="bx bxs-heart"></i> <!-- Ícone preenchido -->
                    </span>
                  `,
                  data: function () {
                      return {}
                  },
                  methods: {
                    favoritar() {
                      const novoEstado = this.data.FAVORITO === 'N' ? 'S' : 'N';
                
                      this.$emit('atualizar-favorito', {
                        ID: this.data.ID,
                        FAVORITO: novoEstado
                      });
                
                      const payload = {
                        ID: this.data.ID,
                        curtiu: novoEstado === 'S' ? 's' : 'n'
                      };
                      
                      axios.post(BASE + "/perfil_usuario/favoritar", payload).then((res) => {
                        if(res.data.code == '1'){
                          mainLayout.sToast(res.data.msg, "", "success");
                        } else {
                          mainLayout.sToast(res.data.msg, '', "error");
                        }
                      })

                      this.data.FAVORITO = novoEstado;
                    }
                  },
                  mounted(){
                  }
              })
          }
        }
      };
    },
    methods: {
      teste(args){
        if (args) {
          console.log(args)
        } else {
          console.log('teste')
        }
      },
      getInfoAlimentos(idRefeicao){
        var data = {
          "idRefeicao": idRefeicao,
        }

        axios.post(BASE + "/perfil_usuario/getInfoAlimentos", data).then((res) => {
          this.dataFavorito = res.data.data;
        })
      },
      getSubstituicoes(){
        var data = {
          "idRefeicao": this.refeicao,
          "alimentoSub": this.alimentoIdSub[0]
        }

        axios.post(BASE + "/perfil_usuario/getSubs", data).then((res) => {
          console.log(res.data.data)
          this.dataSub = res.data.data;
        })
      },
      openLoad(){
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'flex';

        setTimeout(() => {
          this.getInfoAlimentos(this.refeicao);
          spinner.style.display = 'none';
        }, 600);
      }
    },
    mounted() {
    }
});