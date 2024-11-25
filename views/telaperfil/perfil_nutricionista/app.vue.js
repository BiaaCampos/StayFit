const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
  <div id='div-nutri' class="div-nutri-perfil">
    <div class="card" style="height: 100%;">
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
      autoFit='false'
      :toolbarClick="toolbarFunc"
      v-model='selectedRow'
      >
        <e-columns>
          <e-column field="NOME" headerText="Paciente" textAlign="Center" minWidth='60' width='60'></e-column>
          <e-column field='DESCRICAO' headerText='Consulta' textAlign='Center' minWidth='60' width='60'></e-column>
          <e-column field='DATA_CONSULTA' headerText='Data da Consulta' textAlign='Center' minWidth='60' width='60'></e-column>
          <e-column field='HORA_CONSULTA' headerText='Hora da Consulta' textAlign='Center' minWidth='60' width='60'></e-column>
          <e-column field='SITUACAO' headerText='Situação da Consulta' textAlign='Center' minWidth='60' width='60'></e-column>
        </e-columns>
      </ejs-grid>

      <ejs-tooltip ref="tooltip" position="LeftCenter" content="Adicionar disponibilidade" cssClass="tooltip-custom" style="position: fixed; bottom: 150px; right: 95px;">
          <button type="button" class="button_modal_atendimento" @click="abrirModalDisp">
            <img src="public/images/images-cadastros/plus.svg" alt="" class="img_button_modal_atendimento radial" />
          </button>
      </ejs-tooltip>
      
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
  <ejs-dialog 
    ref="dialogDisp"
    header='Adicionar horarios disponiveis'
    isModal='true'
    v-bind:visible="false"
    :animarionSettings="{ effect: 'None' }"
    :closeOnEscape='false'
    :buttons='dispBtn'
    target="body"
    class="dialog"
  >
    <div style="display: flex; gap: 4rem;">
      <div class="input-group mb-3">
        <ejs-datepicker 
            ref="dataDisponivel" 
            cssClass="e-outline"
            floatLabelType="Auto"
            :change='getDropHorario'
            format="dd/MM/yyyy"
            fullScreenMode="true"
            openOnFocus="true"
            placeholder="Data disponivel *"
            v-model="dataDisp.DATA_CONSULTA">
          </ejs-datepicker>
        <span class='error-input-msg'></span>
      </div> 
      <div class="input-group mb-3">
        <ejs-timepicker 
          ref="horaDisponivel"  
          placeholder="Informe um horario *" 
          cssClass="e-outline"
          floatLabelType="Auto"
          :value='value' 
          :step='interval'
          openOnFocus="true"
          :format='customFormat'
          v-model='dataDisp.HORA_CONSULTA'>
        </ejs-timepicker>
        <span class='error-input-msg'></span>
      </div> 
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
      value: new Date(),
      interval: 30,
      customFormat: "HH:mm",
      header: '',
      data: {
        NOME: '',
        DESCRICAO: '',
        DATA_CONSULTA: '',
        HORA_CONSULTA: null,
        SITUACAO: '',
      },
      dataDisp: {
        DATA_CONSULTA: '',
        HORA_CONSULTA: null,
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
      dispBtn: [
        {
          click: this.enviaFormDisp,
          buttonModel: {
            isPrimary:'true',
            content: 'Salvar'
          }
        },
        {
          click: this.fecharModalDisp,
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
    abrirModalDisp(){
      this.$refs.dialogDisp.show()
    },
    fecharModalDisp(){
      this.$refs.dialogDisp.hide()
      LimpaInput(this.dataDisp.DATA_CONSULTA, this.$refs.dataDisponivel);
      LimpaInput(this.dataDisp.HORA_CONSULTA, this.$refs.horaDisponivel);
    },
    enviaFormDisp(){
      if (
        validarInput(this.dataDisp.DATA_CONSULTA, this.$refs.dataDisponivel) &&
        validarInput(this.dataDisp.HORA_CONSULTA, this.$refs.horaDisponivel)
      ) {
        axios.post(BASE + "/perfil_nutricionista/enviaFormDisp", this.dataDisp).then((res) => {
        if (res.data.code == 1) {
          mainLayout.sToast(res.data.msg, '', "success");
          this.fecharModalDisp();
          this.recebeData(new Date());
        }
      })
      }
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
