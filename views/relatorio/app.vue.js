const newLocal = `
<div class="container container-geral" style="max-width: 100%;">
    <div class="fundo_historico">
        <div>
            <h1>
                Relatório
            </h1>
        </div>
        <div class="relatorio">
            <!-- Gráfico de Barras -->
            <canvas id="barChart" width="600" height="400"></canvas>

            <!-- Gráfico de Pizza -->
            <canvas id="pieChart" width="400" height="400"></canvas>
        </div>
    </div>    
</div>
`;

const AppTemplate = newLocal;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            // Dados para o gráfico de barras
            chartData: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
                values: [50, 70, 90, 60, 80]
            },
            // Dados para o gráfico de pizza
            pieData: {
                labels: ['Homens', 'Mulheres', 'Gestantes', 'Esportistas'],
                values: [50, 30, 10, 10] // Valores exemplo para os grupos
            }
        };
    },
    mounted: function() {
        this.drawBarChart(); // Chama a função para desenhar o gráfico de barras
        this.drawPieChart(); // Chama a função para desenhar o gráfico de pizza
    },
    methods: {
        drawBarChart: function() {
            var canvas = document.getElementById('barChart');
            var ctx = canvas.getContext('2d');
            var data = this.chartData;

            var barWidth = 50;
            var barSpacing = 20;
            var chartHeight = 300;
            var chartWidth = canvas.width - 50;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenhar as barras
            for (var i = 0; i < data.values.length; i++) {
                var barHeight = data.values[i] * 3;
                var x = (i * (barWidth + barSpacing)) + 50;
                var y = chartHeight - barHeight;

                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(x, y, barWidth, barHeight);

                ctx.fillStyle = '#000';
                ctx.font = '16px Arial';
                ctx.fillText(data.values[i], x + (barWidth / 2) - 10, y - 10);

                ctx.fillText(data.labels[i], x + (barWidth / 2) - 10, chartHeight + 20);
            }
        },

        drawPieChart: function() {
            var canvas = document.getElementById('pieChart');
            var ctx = canvas.getContext('2d');
            var data = this.pieData;

            var total = data.values.reduce(function(sum, value) {
                return sum + value;
            }, 0);

            var startAngle = 0;
            var colors = ['#FF5733', '#33FF57', '#3357FF', '#F5A623']; // Cores para cada setor

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

            // Desenhar os setores do gráfico de pizza
            for (var i = 0; i < data.values.length; i++) {
                var sliceAngle = (data.values[i] / total) * (Math.PI * 2); // Calcula o ângulo de cada setor
                ctx.fillStyle = colors[i];

                // Desenha o setor
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2, canvas.height / 2); // Move para o centro do canvas
                ctx.arc(canvas.width / 2, canvas.height / 2, 150, startAngle, startAngle + sliceAngle); // Desenha o arco
                ctx.closePath();
                ctx.fill();

                // Atualiza o ângulo de início para o próximo setor
                startAngle += sliceAngle;

                // Adicionar as legendas na pizza
                var middleAngle = startAngle - sliceAngle / 2; // Posição média do setor
                var x = canvas.width / 2 + Math.cos(middleAngle) * 100; // Calcula a posição x
                var y = canvas.height / 2 + Math.sin(middleAngle) * 100; // Calcula a posição y
                ctx.fillStyle = '#000';
                ctx.font = '16px Arial';
                ctx.fillText(data.labels[i], x - 30, y); // Exibe o nome do grupo no gráfico
            }
        }
    }
});
