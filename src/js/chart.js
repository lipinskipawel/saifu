import Chart from 'chart.js/auto';

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs,
      datasets: [
        {
          label: 'Family gross earnings',
          data: data.grossYs,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Family netto earnings',
          data: data.nettoYs,
          fill: false,
          borderColor: 'rgb(250, 150, 150)',
          tension: 0.1
        },
        {
          label: 'Rent gross',
          data: data.yRent,
          fill: false,
          tension: 0.1
        }]
    },
    options: {
       maintainAspectRatio: false,

    }
  });
}

async function getData() {
  const xs = [];
  const grossYs = [];
  const nettoYs = [];
  const yRent = [];

  const response = await fetch('http://localhost:3000/data.csv')
  const data = await response.text();
  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.split(',');
    const months = columns[0];
    xs.push(months);

    const grossEarnings = Number(columns[2]) + Number(columns[4]);
    grossYs.push(grossEarnings);

    const nettoEarnings = Number(columns[3]) + Number(columns[5]);
    nettoYs.push(nettoEarnings);

    const rentAll = columns[7];
    yRent.push(rentAll);
  });
  return { xs, grossYs, nettoYs, yRent };
}

chartIt();

