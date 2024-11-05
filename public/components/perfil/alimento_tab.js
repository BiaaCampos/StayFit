Vue.component("alimento_tab", {
    props: ['data'],
    template: `
    <ejs-tab id="tab_default" heightAdjustMode='Auto'>
      <e-tabitems>
        <e-tabitem :header="headerText0" :content="content0"></e-tabitem>
        <e-tabitem :header='headerText1' ></e-tabitem>
        <e-tabitem :header='headerText2' ></e-tabitem>
      </e-tabitems>
    </ejs-tab>

    <div class="tab_content" id='teste1'>
      <ejs-grid 
      :dataSource="itemCardapio.CafeDaManha" 
      :allowPaging='true'
      >
        <e-columns>
            <e-column field='ALIMENTO' headerText='Alimento' textAlign='Right' ></e-column>
            <e-column field='CALORIAS' headerText='Cal.' width='150'></e-column>
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

    `,
    data() {
        return {
            content0: '#teste1',
            headerText0: { text: "Recomendado" },
            headerText1: { text: "Favoritos" },
            headerText2: { text: "Substituições" },
        };
    },
    methods: {
    },
    mounted() {
    }
});