// import palette from 'theme';

export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      label: 'This year',
      backgroundColor: '#ff1744',
      data: [18, 5, 19, 27, 29, 19, 20]
    },
    {
      label: 'Last year',
      backgroundColor: '#ffd64d',
      data: [11, 20, 12, 29, 30, 25, 13]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    titleFontColor: 'white',
    bodyFontColor: 'white',
    footerFontColor: 'white'
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: 'black'
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: 'black',
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: 'black',
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: 'black'
        }
      }
    ]
  }
};
