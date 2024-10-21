const newLocal = `
<div style="display: flex; position: absolute; height: 82vh; left: 6rem; top: 7rem;">
  <div class="card" style="width: 90vw; display: flex; flex-direction: row;">
    <ejs-calendar style="height: 19rem; margin: 2rem 0 0 2rem;" id="calendar" change=""></ejs-calendar>
    <ejs-grid 
    style="width: 80vw; margin: 2rem;"
    :allowSorting='true' 
    :allowFiltering='true' 
    :filterSettings='filterSettings' 
    :editSettings='editSettings' 
    :toolbar='toolbar'>
      <e-columns>
          <e-column field='ID'></e-column>
            <e-column field='CustomerName'></e-column>
          <e-column field='OrderDate'></e-column>
          <e-column field='Freight'</e-column>
          <e-column field='ShippedDate'></e-column>
          <e-column field='ShipCountry'></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</div>
`;

const AppTemplate = newLocal;
Vue.component('AppVue', {
  template: AppTemplate,
  data: function() {
    return {
      filterSettings: { type: 'Excel' },
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
      toolbar: ['Add', 'Edit', 'Delete']
    }
  },
  methods: {
  },
  mounted: function() {
  }

})
