const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
  <div class="div-nutri-perfil">
    <div class="card" >
      <ejs-calendar 
        style="height: 19rem; margin: 2rem 0 0 2rem;" 
        id="calendar" 
        v-model='dataCalendar'
        @change="recebeData($event)" 
      >
      </ejs-calendar>

      <ejs-grid 
      style="width: 80vw; margin: 2rem;"
      ref='grid'
      locale='pt-BR'
      :dataSource="dataSource"
      :allowSelection="true"
      :toolbar='toolbar'
      :toolbarClick="toolbarFunc"
      v-model='selectedRow'
      >
        <e-columns>
          <e-column field="NOME" headerText="Paciente" textAlign="Center"></e-column>
          <e-column field='DESCRICAO' headerText='Consulta' textAlign='Center'></e-column>
          <e-column field='DATA_CONSULTA' headerText='Data da Consulta' textAlign='Center'></e-column>
          <e-column field='HORA_CONSULTA' headerText='Hora da Consulta' textAlign='Center'></e-column>
          <e-column field='SITUACAO' headerText='Situação da Consulta' textAlign='Center'></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  </div>

  <ejs-dialog 
    ref="dialog"
    :header='header'
    isModal='true'
    v-bind:visible="false"
    :animarionSettings="{ effect: 'None' }"
    :closeOnEscape='false'
    :buttons='dlgButtons'
    target="body"
    class="dialog"
  >
    <div class="input-group mb-3">
      <ejs-dropdownlist 
        ref='passiente'
        cssClass="e-outline"
        floatLabelType="Auto"
        :fields='fields'
        allowObjectBinding='true'
        :dataSource='dropPacientes' 
        placeholder='Paciente *'
        v-model="data.NOME">
      </ejs-dropdownlist>
      <span class='error-input-msg'></span>
    </div> 
    <div class="input-group mb-3">
      <ejs-textbox
        ref='descricao'
        floatLabelType="Auto" 
        cssClass="e-outline" 
        placeholder="Descrição da consulta *"
        v-model="data.DESCRICAO">
      </ejs-textbox>
      <span class='error-input-msg'></span>
    </div> 
    <div class="input-group mb-3" style="display: flex; gap: 10%;">
      <div class="input-group mb-3" style="width: 45%;">
        <ejs-datepicker 
          ref="dataConsulta" 
          cssClass="e-outline"
          floatLabelType="Auto"
          :change='getDropHorario'
          format="dd/MM/yyyy"
          placeholder="Data da consulta *"
          v-model="data.DATA_CONSULTA">
        </ejs-datepicker>
        <span class='error-input-msg'></span>
      </div>
      <div class="input-group mb-3" style="width: 45%;">
        <ejs-dropdownlist 
          ref='horario'
          cssClass="e-outline"
          floatLabelType="Auto"
          :dataSource='dropHoraConsulta'
          :fields='fieldsHora'
          :enabled='habilitado'
          :value='val'
          placeholder='Horario da consulta *'
          v-model="data.HORA_CONSULTA">
        </ejs-dropdownlist>
        <span class='error-input-msg'></span>
      </div>
    </div>
    <div class="input-group mb-3">
      <ejs-dropdownlist 
        ref='sitConsulta'
        cssClass="e-outline"
        :fields='fields'
        allowObjectBinding='true'
        floatLabelType="Auto"
        :dataSource='dropSituacao' 
        placeholder='Status da consulta *'
        v-model="data.SITUACAO">
      </ejs-dropdownlist>
      <span class='error-input-msg'></span>
    </div>
  </ejs-dialog>
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
  template: AppTemplate,
  data: function() {
    return {
      selectedRow: [],
      toolbar: [
        {
          id:"adicionar",
          text:"Adicionar",
          prefixIcon:"fas fa-plus"
        },
      ],
      habilitado: false,
      val: '',
      fields: { value: 'ID', text: 'NOME' },
      fieldsHora: { value: 'HORARIO', text: 'HORARIO', disabled: 'STATE' },
      dropPacientes: [],
      dropHoraConsulta: [],
      dropSituacao: [],
      dataSource: [],
      dataCalendar: new Date(),
      header: '',
      data: {
        NOME: '',
        DESCRICAO: '',
        DATA_CONSULTA: '',
        HORA_CONSULTA: null,
        SITUACAO: '',
      },
      filterSettings: { type: 'Menu' },
      dlgButtons: [
        {
          click: this.enviaForm,
          buttonModel: {
            isPrimary:'true',
            content: 'Salvar'
          }
        },
        {
          click: this.fecharModal,
          buttonModel: {
            isPrimary:'true',
            content: 'Fechar'
          }
        },
      ],
      metodo: '',
    }
  },
  methods: {
    getDrops(){
      axios.get(BASE + "/perfil_nutricionista/getDrops").then((res) => {
        if (res.data.code == 1) {
          this.dropPacientes = res.data.data.users[0];
          this.dropSituacao = res.data.data.status[0];
        }
      })
    },
    getDropHorario(args){
      this.habilitado = true;
      
      const data = {
        data: this.data.DATA_CONSULTA
      }

      axios.post(BASE + "/perfil_nutricionista/getDropHorario", data).then((res) => {
        if (res.data.code == 1) {
          this.dropHoraConsulta = res.data.data
        }
      })
    },
    recebeData(args){
      if (args) {
        this.dataCalendar = args.value;
        const data = {
          data: this.dataCalendar.toLocaleDateString('pt-BR')
        }
        
        axios.post(BASE + "/perfil_nutricionista/recebeData", data).then((res) => {
          this.dataSource = res.data.data
        })
      } else {
        axios.post(BASE + "/perfil_nutricionista/recebeData").then((res) => {
          this.dataSource = res.data.data
        })
      }
    },
    toolbarFunc(args){
      this.header = args.item.id + ' consulta'
      this.metodo = args.item.id
      this.abrirModal();
    },
    enviaForm(){
      if (
        validarInput(this.data.NOME, this.$refs.passiente) &&
        validarInput(this.data.DESCRICAO, this.$refs.descricao) &&
        validarInput(this.data.DATA_CONSULTA, this.$refs.dataConsulta) &&
        validarInput(this.data.HORA_CONSULTA, this.$refs.horario) &&
        validarInput(this.data.SITUACAO, this.$refs.sitConsulta)
      ) {
        axios.post(BASE + "/perfil_nutricionista/enviaForm", this.data).then((res) => {
        if (res.data.code == 1) {
          mainLayout.sToast(res.data.msg, '', "success");
          this.fecharModal();
          this.recebeData(new Date());
        }
      })
      }
    },
    abrirModal(){
      this.$refs.dialog.show()
    },
    fecharModal(){
      this.$refs.dialog.hide()
      LimpaInput(this.data.NOME, this.$refs.passiente);
      LimpaInput(this.data.DESCRICAO, this.$refs.descricao);
      LimpaInput(this.data.DATA_CONSULTA, this.$refs.dataConsulta);
      LimpaInput(this.data.HORA_CONSULTA, this.$refs.horario);
      LimpaInput(this.data.SITUACAO, this.$refs.sitConsulta);
    },
    limpadados(){
      this.data.NOME = null
      this.data.DESCRICAO = '',
      this.data.DATA_CONSULTA = '',
      this.data.HORA_CONSULTA = null
      this.data.SITUACAO = null
    },
    organizaInput(dados, local) {
      if (typeof dados !== 'string') {
        console.warn('O valor de dados não é uma string:', dados);
        local = dados;
      } else {
        const format = dados.split(' - ');
        if (dados.split(' - ').length > 1) {
          return parseInt(format[1]);
        } else {
          local = dados;
        }
      }
    }
    
  },
  mounted: function() {
    this.getDrops();
    this.recebeData();
    
  }

})
