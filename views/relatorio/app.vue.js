const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_historico">
        <div>
            <h1>Relatório</h1>
        </div>
        <div class="relatorio">
            <div class="graficos" v-if="hasData">
                <div>
                    <h2>Gráfico de Consultas Mensais</h2>
                    <canvas id="barChart" width="600" height="400"></canvas>
                </div>
                <div>
                    <h2>Gráfico de Gêneros</h2>
                    <canvas id="genderBarChart" width="600" height="400"></canvas>
                </div>
                <div>
                    <h2>Gráfico de Status das Consultas</h2>
                    <canvas id="pieChart" width="400" height="400"></canvas>
                </div>
            </div>
            <div v-else>
                <p>Ainda não há nenhuma consulta registrada.</p>
            </div>
        </div>
        <div class="dadosgerais" v-if="totalConsultas !== null && statusConsultas !== null">
            <p>Total de Consultas Agendadas no Ano: {{ totalConsultas }}</p>
            <p>Status das Consultas: {{ statusConsultas }}</p>
        </div>

    </div>    
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            chartData: {
                labels: [],
                values: [] 
            },
            pieData: {
                labels: [],
                values: [] 
            },
            genderChartData: {
                labels: [],
                values: [] 
            },
            hasData: true,
            totalConsultas: null, // Adiciona a variável para total de consultas
            statusConsultas: null 
        };
    },
    
    mounted: function() {
        this.fetchMonthlyConsultations();
        this.fetchConsultationStatus();
        this.fetchConsultationGenres();
    },
    
    methods: {
        fetchMonthlyConsultations: function() {
            axios.get(BASE + '/relatorio/getmensais')
                .then((response) => {
                    const data = response.data;
                    const monthMap = {
                        'January': 'Janeiro',
                        'February': 'Fevereiro',
                        'March': 'Março',
                        'April': 'Abril',
                        'May': 'Maio',
                        'June': 'Junho',
                        'July': 'Julho',
                        'August': 'Agosto',
                        'September': 'Setembro',
                        'October': 'Outubro',
                        'November': 'Novembro',
                        'December': 'Dezembro'
                    };
                    this.chartData.labels = data.map(item => monthMap[item.Mes] || item.Mes);
                    this.chartData.values = data.map(item => item.Total_Consultas);
                    this.totalConsultas = this.chartData.values.reduce((sum, value) => sum + value, 0); // Calcula a soma total
                    this.updateHasData();
                    this.drawBarChart();
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados mensais:", error);
                });
        },
        
        fetchConsultationStatus: function() {
            axios.get(BASE + '/relatorio/getstatus')
                .then((response) => {
                    const data = response.data;
                    this.pieData.labels = data.map(item => item.Status); 
                    this.pieData.values = data.map(item => item.Total_Consultas);
                    this.statusConsultas = data.map(item => `${item.Status}: ${item.Total_Consultas}`).join(', '); // Formata o status das consultas
                    this.updateHasData();
                    this.drawPieChart();
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados de status:", error);
                });
        },
        
        
        fetchConsultationGenres: function() {
            axios.get(BASE + '/relatorio/getgeneros') 
                .then((response) => {
                    const data = response.data;
                    this.genderChartData.labels = data.map(item => item.Genero);
                    this.genderChartData.values = data.map(item => item.Total_Consultas);
                    this.updateHasData();
                    this.drawGenderBarChart();
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados de gêneros:", error);
                });
        },
        
        updateHasData: function() {
            // Verifica se há dados em pelo menos um dos gráficos
            this.hasData = this.chartData.values.length > 0 || this.pieData.values.length > 0 || this.genderChartData.values.length > 0;
        },
        
        drawGenderBarChart: function() {
            var canvas = document.getElementById('genderBarChart');
            var ctx = canvas.getContext('2d');
            var data = this.genderChartData;
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            var barWidth = 50;
            var barSpacing = 20;
            var chartHeight = 300;
        
            // Desenhar as barras
            for (var i = 0; i < data.values.length; i++) {
                var barHeight = data.values[i] * 3; // Ajuste a escala conforme necessário
                var x = (i * (barWidth + barSpacing)) + 50;
                var y = chartHeight - barHeight;
        
                ctx.fillStyle = '#4CAF50'; // Cor das barras
                ctx.fillRect(x, y, barWidth, barHeight);
        
                ctx.fillStyle = '#000';
                ctx.font = '18px Arial';

                // Centraliza o valor acima da barra
                var valueText = data.values[i].toString();
                var valueTextWidth = ctx.measureText(valueText).width;
                ctx.fillText(valueText, x + (barWidth / 2) - (valueTextWidth / 2), y - 10); // Centraliza o valor
        
                // Centraliza a legenda abaixo da barra
                var labelText = data.labels[i];
                var labelTextWidth = ctx.measureText(labelText).width;
                ctx.fillText(labelText, x + (barWidth / 2) - (labelTextWidth / 2), chartHeight + 20); // Centraliza a legenda
            }
        },        
        
        drawBarChart: function() {
            var canvas = document.getElementById('barChart');
            var ctx = canvas.getContext('2d');
            
            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            var data = this.chartData;
            var barWidth = 50;
            var barSpacing = 20;
            var chartHeight = 300;
        
            // Animação
            let animationDuration = 1000; // Duração da animação em ms
            let startTime = null;
        
            const animateBars = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < data.values.length; i++) {
                    var barHeight = data.values[i] * 3 * progress; // Ajuste a escala conforme necessário
                    var x = (i * (barWidth + barSpacing)) + 50;
                    var y = chartHeight - barHeight;
        
                    ctx.fillStyle = '#4CAF50';
                    ctx.fillRect(x, y, barWidth, barHeight);
        
                    // Desenha o valor acima da barra
                    ctx.fillStyle = '#000';
                    ctx.font = '18px Arial';
                    var valueText = data.values[i].toString();
                    var valueTextWidth = ctx.measureText(valueText).width;
                    ctx.fillText(valueText, x + (barWidth / 2) - (valueTextWidth / 2), y - 10); // Centraliza o valor
        
                    // Desenha a legenda abaixo da barra
                    var labelText = data.labels[i];
                    var labelTextWidth = ctx.measureText(labelText).width;
                    ctx.fillText(labelText, x + (barWidth / 2) - (labelTextWidth / 2), chartHeight + 20); // Centraliza a legenda
                }
        
                if (progress < 1) {
                    requestAnimationFrame(animateBars);
                }
            };
        
            requestAnimationFrame(animateBars);
        },        
        
        drawPieChart: function() {
            var canvas = document.getElementById('pieChart');
            var ctx = canvas.getContext('2d');
            
            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            var data = this.pieData;
            var total = data.values.reduce((sum, value) => sum + value, 0);
            var startAngle = 0;
            var colors = ['#FF5733', '#33FF57', '#3357FF', '#F5A623'];
        
            // Animação
            let animationDuration = 1000; // Duração da animação em ms
            let startTime = null;
        
            const animatePieSlices = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let currentStartAngle = 0;
        
                for (var i = 0; i < data.values.length; i++) {
                    var sliceAngle = (data.values[i] / total) * (Math.PI * 2) * progress;
                    ctx.fillStyle = colors[i % colors.length];
        
                    ctx.beginPath();
                    ctx.moveTo(canvas.width / 2, canvas.height / 2);
                    ctx.arc(canvas.width / 2, canvas.height / 2, 150, currentStartAngle, currentStartAngle + sliceAngle);
                    ctx.closePath();
                    ctx.fill();
        
                    // Adiciona as legendas
                    var middleAngle = currentStartAngle + sliceAngle / 2;
                    var x = canvas.width / 2 + Math.cos(middleAngle) * 100;
                    var y = canvas.height / 2 + Math.sin(middleAngle) * 100;
                    ctx.fillStyle = '#000';
                    ctx.fillText(data.labels[i], x - 30, y);
                    ctx.fillText(data.values[i], x - 30, y + 20); // Coloca a quantidade abaixo do nome
                    ctx.font = '18px Arial'; // Define o tamanho da fonte

                    currentStartAngle += sliceAngle;
                }
        
                if (progress < 1) {
                    requestAnimationFrame(animatePieSlices);
                }
            };
        
            requestAnimationFrame(animatePieSlices);
        }
        
    }
});
