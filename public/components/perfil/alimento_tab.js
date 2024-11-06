Vue.component("alimento_tab", {
    props: ['data', 'header', 'refeicao'],
    template: `
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
      width="60vw"
      height="30vw"
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
          :dataSource="data" 
          :allowPaging='true'
        >
          <e-columns>
              <e-column field='ALIMENTO' headerText='Alimento' textAlign='Right' ></e-column>
              <e-column field='CALORIAS' headerText='Cal.'></e-column>
              <e-column field='CARBOIDRATOS' headerText='Carboidratos' textAlign='Right'></e-column>
              <e-column field='FIBRAS' headerText='Fibras' textAlign='Right'></e-column>
              <e-column field='GORDURAS' headerText='Gorduras' textAlign='Right'></e-column>
              <e-column field='GRUPO_ALIMENTAR' headerText='Grupo alimentar'></e-column>
              <e-column field='PROTEINAS' headerText='Proteinas'></e-column>
              <e-column field='QUANTIDADE' headerText='Quantidade'></e-column>
              <e-column field='REFEICAO' headerText='Refeição'></e-column>
          </e-columns>
        </ejs-grid>
      </div>

      <div id='Template2_content' style='display: none'>
        <ejs-grid
          :dataSource="data" 
          :allowPaging='true'
        >
          <e-columns>
              <e-column field='ALIMENTO' headerText='Alimento' textAlign='Right' ></e-column>
              <e-column field='CALORIAS' headerText='Cal.'></e-column>
              <e-column field='CARBOIDRATOS' headerText='Carboidratos' textAlign='Right'></e-column>
              <e-column field='FIBRAS' headerText='Fibras' textAlign='Right'></e-column>
              <e-column field='GORDURAS' headerText='Gorduras' textAlign='Right'></e-column>
              <e-column field='GRUPO_ALIMENTAR' headerText='Grupo alimentar'></e-column>
              <e-column field='PROTEINAS' headerText='Proteinas'></e-column>
              <e-column field='QUANTIDADE' headerText='Quantidade'></e-column>
              <e-column field='REFEICAO' headerText='Refeição'></e-column>
          </e-columns>
        </ejs-grid>
      </div>

      <div id='Template3_content' style='display: none'>
        <div class="tab_content" id='this.data'>
          <ejs-grid
            :dataSource="data" 
            :allowPaging='true'
          >
            <e-columns>
                <e-column field='ALIMENTO' headerText='Alimento' textAlign='Right' ></e-column>
                <e-column field='CALORIAS' headerText='Cal.'></e-column>
                <e-column field='CARBOIDRATOS' headerText='Carboidratos' textAlign='Right'></e-column>
                <e-column field='FIBRAS' headerText='Fibras' textAlign='Right'></e-column>
                <e-column field='GORDURAS' headerText='Gorduras' textAlign='Right'></e-column>
                <e-column field='GRUPO_ALIMENTAR' headerText='Grupo alimentar'></e-column>
                <e-column field='PROTEINAS' headerText='Proteinas'></e-column>
                <e-column field='QUANTIDADE' headerText='Quantidade'></e-column>
                <e-column field='REFEICAO' headerText='Refeição'></e-column>
            </e-columns>
          </ejs-grid>
        </div>
      </div>

      <ejs-tab ref="tab" @select="onTabSelect" id="tab_default" heightAdjustMode='Auto'>
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
          Template1: '#Template1_content',
          Template2: '#Template2_content',
          Template3: '#Template3_content',
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

          //templates
          // Template1: function (dataS) {
          //   return {
          //     template: {
          //       template: `
                  
          //       `,
          //       data() {
          //         return {
                    
          //         };
          //       },
          //       methods: {
          //         getInfoAlimentos(idRefeicao){
          //           axios.get(BASE + "/perfil_usuario/getInfoAlimentos", idRefeicao).then((res) => {
          //             // const data = res.data.data;
          //             console.log(res)
          //           })
          //         },
          //       }
          //     }
          //   }
          // },
        };
    },
    methods: {
      teste(){
        console.log('teste')
      },
      onTabSelect(args) {
        // Atualiza o índice da aba selecionada
        this.selectedTab = args.selectedIndex;
      }
    },
    watch: {
      selectedTab(newIndex) {
        // Ação específica para cada aba
        if (newIndex === 0) {
          console.log("Aba 'Recomendado' selecionada");
        } else if (newIndex === 1) {
          console.log("Aba 'Favoritos' selecionada");
        } else if (newIndex === 2) {
          console.log("Aba 'Substituições' selecionada");
        }
      }
    },
    mounted() {
      this.selectedTab = this.$refs.tab.selectedIndex;
    }
});