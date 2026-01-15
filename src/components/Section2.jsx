import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Section2 = ({ totalValue, investments, isOverLimit, totalAllocated, enrichedInvestments }) => {
  // Referências para os 4 gráficos
  const chartRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const chartInstances = useRef([]);

  useEffect(() => {
    // Cores e Labels base
    const originalColors = ['#cc23ff', '#00009c', '#fe9b9e', '#2d2d2d'];
    const darkColors = ['#701b8a', '#020230', '#754648', '#1b1b1b'];
    const grayColors = investments.map(() => '#D3D3D3');

    // Função para renderizar cada gráfico
    const renderChart = (index, title, data) => {
      const ctx = chartRefs[index].current.getContext('2d');
      
      // Destruir instância anterior se existir
      if (chartInstances.current[index]) {
        chartInstances.current[index].destroy();
      }

      // Adicionar "Valor não investido" se sobrar dinheiro
      let currentLabels = investments.map(i => i.type || 'Unnamed');
      let currentValues = [...data];
      let currentColors = isOverLimit ? grayColors : [...originalColors];
      let currentHover = isOverLimit ? grayColors : [...darkColors];

      const currentAllocated = data.reduce((a, b) => a + b, 0);
      
      if (totalValue > currentAllocated && !isOverLimit) {
        currentLabels.push('Not invested');
        currentValues.push(totalValue - currentAllocated);
        currentColors.push('#eeeeee');
        currentHover.push('#cccccc');
      }

      chartInstances.current[index] = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: currentLabels,
          datasets: [{
            data: currentValues,
            backgroundColor: currentColors,
            hoverBackgroundColor: currentHover,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: !isOverLimit && index === 0 }, // Legenda só no primeiro para não poluir
            tooltip: {
              callbacks: {
                label: (context) => ` $ ${context.parsed.toLocaleString()}`
              }
            }
          }
        }
      });
    };

    // --- 1. Dados do Presente (Valores Atuais) ---
    const presentData = enrichedInvestments.map(inv => inv.investedAmount);
    renderChart(0, "Present Day", presentData);

    // --- 2. Projeção 6 Meses ---
    const data6m = enrichedInvestments.map(inv => {
      const rate = parseFloat(inv.tax6Rate) / 100 || 0;
      return inv.investedAmount * (1 + rate);
    });
    renderChart(1, "6 Months Rate", data6m);

    // --- 3. Projeção 12 Meses ---
    const data12m = enrichedInvestments.map(inv => {
      const rate = parseFloat(inv.tax12Rate) / 100 || 0;
      return inv.investedAmount * (1 + rate);
    });
    renderChart(2, "12 Months Rate", data12m);

    // --- 4. Projeção 3 Meses ---
    const data3m = enrichedInvestments.map(inv => {
      const rate = parseFloat(inv.tax3Rate) / 100 || 0;
      return inv.investedAmount * (1 + rate);
    });
    renderChart(3, "3 Months Rate", data3m);

  }, [investments, totalValue, isOverLimit, enrichedInvestments]);

  return (
    <section>
      <div className="all_pizza_container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className={`pizza_container ${isOverLimit ? 'chart-invalid' : ''}`}>
          <label className="selectDay_label"> Present Day </label>                
          <canvas ref={chartRefs[0]}></canvas>
        </div>

        <div className={`pizza_container ${isOverLimit ? 'chart-invalid' : ''}`}>
          <label className="selectDay_label"> 6 Months Projection </label>                
          <canvas ref={chartRefs[1]}></canvas>
        </div>

        <div className={`pizza_container ${isOverLimit ? 'chart-invalid' : ''}`}>
          <label className="selectDay_label"> 12 Months Projection </label>                
          <canvas ref={chartRefs[2]}></canvas>
        </div>

        <div className={`pizza_container ${isOverLimit ? 'chart-invalid' : ''}`}>
          <label className="selectDay_label"> 3 Months Projection </label>                
          <canvas ref={chartRefs[3]}></canvas>
        </div>
      </div>
    </section>
  );
};