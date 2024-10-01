Vue.component("modal_info", {
    props: ['tipomodalinfo'],
    template: `
    <div id="target" class="col-lg-8 control-section" style="height:350px;">
    <div style="position:relative; top:10px; left:10px;">
        <!-- Button to open the modal Dialog -->
        <button id="dialogBtn" type="button">Open</button>
    </div>
    <!-- Initialize modal Dialog -->
    <div id="modalDialog">
    </div>
    </div>


    <div class="col-lg-4 property-section">
        <table id="property" title="Properties">
            <tr>
                <td style="width:60%;">
                    <div style="font-size: 13px;">Close on overlay click</div>
                </td>
                <td>
                    <!-- Checkbox to enable / disable the overlay click -->
                    <input type="checkbox" id="checkbox" class="checkbox" />
                </td>
            </tr>
        </table>
    </div>`,
    data() {
        return {
            isModal: true,
            animationSettings: { effect: 'Zoom' },
            headerText0: { text: "Café da manhã" },
            headerText1: { text: "Almoço" }, 
            headerText2: { text: "Café da tarde" },
            headerText3: { text: "jantar" },
            headerText4: { text: "Café da noite" },
            content0: ' teste 1 ',
            content1: ' teste 2',            
            content2: ' teste 3',
            content3: ' teste 4',
            content4: ' teste 5',
            }
    },
    methods: {
    }
});
