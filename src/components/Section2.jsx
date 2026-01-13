import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Section2 = ({ totalValue, investments, isOverLimit }) => {
  const chartRef1 = useRef(null);
  const chartInstance1 = useRef(null);

  useEffect(() => {
    if (!chartRef1.current) return;

    // 1. Preparar cores dinâmicas
    const originalColors = ['#cc23ff', '#00009c', '#fe9b9e', '#2d2d2d'];
    const darkColors = ['#701b8a', '#020230', '#754648', '#1b1b1b'];
    const grayColors = investments.map(() => '#D3D3D3'); // Cinza para todas as fatias

    const dataValues = investments.map(inv => {
        // Lógica simples: se tiver %, calcula o valor, se não, usa o número
        const val = inv.amount.toString();
        if (val.includes('%')) {
            return (parseFloat(val) / 100) * totalValue;
        }
        return parseFloat(val) || 0;
    });

    // 2. Destruir instância anterior
    if (chartInstance1.current) chartInstance1.current.destroy();

    // 3. Criar gráfico com cor condicional
    const ctx = chartRef1.current.getContext('2d');
    chartInstance1.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: investments.map(i => i.type),
        datasets: [{
          data: dataValues,
          // SE estiver acima do limite, usa cinza. Senão, usa as cores originais.
          backgroundColor: isOverLimit ? grayColors : originalColors,
          hoverBackgroundColor: isOverLimit ? grayColors : darkColors,
          //borderWidth: isOverLimit ? 1 : 2,
        }]
      },
      options: { 
        responsive: true,
        plugins: {
          legend: {
            display: !isOverLimit // Opcional: esconder legenda se estiver em erro
          }
        }
      }
    });

  }, [investments, totalValue, isOverLimit]); // O gráfico reage ao erro aqui

  return (
    <section>
      {/* ... código do calendário ... */}
      
      <div className="all_pizza_container">
        <div className={`pizza_container ${isOverLimit ? 'chart-invalid' : ''}`}>
          <label className="selectDay_label"> Present Day </label>                
          <canvas ref={chartRef1}></canvas>
        </div>
        {/* Repita para os outros gráficos usando suas respectivas Refs */}
      </div>
    </section>
  );
};