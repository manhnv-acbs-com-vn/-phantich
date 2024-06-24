let options = {
  series: [
    {
      data: []
    }
  ],
  legend: {
    show: true
  },
  chart: {
    height: 800,
    type: 'treemap',

  },
  title: {
    text: ''
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '11px',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
      colors: ["rgba(0, 0, 0, 1)"]
    },
    formatter: function (text, op) {
      return ["", ""]
    },

    offsetY: 0,
    offsetX: 0
  },
  stroke: {
    show: true,
    width: 0.5,
    colors: ['#000']
  },
  noData: {
    text: 'Loading...'
  },
  plotOptions: {
    treemap: {
      enableShades: false,
      shadeIntensity: 0,
      reverseNegativeShade: false,
      distributed: true,
      useFillColorAsStroke: false,
      dataLabels: {
        format: "scale"
      },
      colorScale: {
        ranges: [
          {
            from: -10,
            to: 10,
            color: 'rgba(247, 236, 15, 1)'
          },
          {
            from: -Infinity,
            to: -0.1,
            color: 'rgba(240, 75, 65, 1)'
          }
        ]
      }
    }
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      var data = w.config.series[seriesIndex].data[dataPointIndex];
      return '<div class="apexcharts-tooltip-title">' + data.x.mck + '</div>' +
        '<div>KL: ' + data.x.KL + '</div>' +
        '<div>Value: ' + data.y + '</div>';
    }
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

function showChartTreeMap() {
  const dataChartY = [0.27, 0.19, 0.03, -0.18, 0.17, -0.16, 0.15, -0.14, -0.13, -0.12, -0.11, -0.09, -0.08, -0.07, -0.06, -0.05, -0.04, -0.03, -0.02, -0.01, -0.009]
  if (getstockcode.result_code === 0) {
    const data = getstockcode.data.data
    const transformedData = data.map((item, index) => ({
      x: item.item_code,
      y: dataChartY[index],
      custom: {
        fullName: item.full_name,
        full_name_vn: item.full_name_vn,
        current_price: item.current_price,
        targe_price: item.target_price,
        recommend_date: item.recommend_date
      },

    }));
    chart.updateSeries([
      {
        data: transformedData
      }
    ]);
  }
}

showChartTreeMap();

