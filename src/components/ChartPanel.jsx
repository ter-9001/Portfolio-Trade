import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Calendar from './Calendar';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPanel = ({ investments, selectedDate, onDateChange }) => {
  // Dados formatados para o Chart.js
  const chartData = {
    labels: investments.map(i => i.name),
    datasets: [{
      data: investments.map(i => i.value),
      backgroundColor: ['#cc23ff', '#00009c', '#fe9b9e', '#701b8a'],
      borderWidth: 0,
    }]
  };

  const options = {
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  return (
    <section className="panel">
      <Calendar selectedDate={selectedDate} onChange={onDateChange} />
      
      <div className="all_pizza_container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
        <div className="pizza_container">
          <label>Present Distribution</label>
          <div style={{ height: '200px' }}>
            <Pie data={chartData} options={options} />
          </div>
        </div>
        
        {/* Repetir para Pessimistic, Average e Optimistic */}
        <div className="pizza_container">
          <label>Average Projection</label>
          {/* Aqui você passaria dados calculados baseados no tempo */}
        </div>
      </div>
    </section>
  );
};

export default ChartPanel;
