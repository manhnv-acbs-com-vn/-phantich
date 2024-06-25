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
    events: {
      updated: function (chartContext, op) {
        const data = op.config.series[0].data[0].custom.item_id;
        console.log(data,"updated")
        

      },
      dataPointSelection: function (event, chartContext, op) {
        const data =  op.w.config.series[op.seriesIndex].data[op.dataPointIndex]; 
        console.log(data,"dataPointSelection")
      }
    }
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
      const data = op.w.config.series[op.seriesIndex].data[op.dataPointIndex];
      return [text, data.custom.mass + "%"]
    },

    offsetY: 0,
    offsetX: 0
  },
  stroke: {
    show: true,
    width: 0.2,
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




function showChartTreeMap() {
  const dataChartY = [0.27, 0.19, 0.03, -0.18, 0.17, -0.16, 0.15, -0.14, -0.13, -0.12, -0.11, -0.09, -0.08, -0.07, -0.06, -0.05, -0.04, -0.03, -0.02, -0.01, -0.009]
  if (getstockcode.result_code === 0) {
    const data = getstockcode.data.data
    const transformedData = data.map((item, index) => ({
      x: item.item_code,
      y: dataChartY[index],
      fillColor: formatApexchartsTreemapRectFill(item.mass),
      custom: {
        item_id: item.item_id,
        fullName: item.full_name,
        full_name_vn: item.full_name_vn,
        current_price: item.current_price,
        targe_price: item.target_price,
        recommend_date: item.recommend_date,
        mass: item.mass
      },

    }));
    chart.updateSeries([
      {
        data: transformedData
      }
    ]);
  }
}

function formatApexchartsTreemapRectFill(number) {
  if (number < -10) {
    return "rgba(240, 75, 65, 1)";
  } else if (number >= -10 && number <= 10) {
    return "rgba(247, 236, 15, 1)";
  } else if (number > 10) {
    return "rgba(32, 201, 151,1)";
  } else {
    return number;
  }
}

function handleShowDetailedStockInformation(data) {
  return `<div class="layout-show-detailed-stock-information">
                        <div class="card-show-detailed-stock-information ">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="font-normal fs-6  w-160">Khuyến nghị</div>
                                <div class="fs-6 font-semibold command">109,095</div>
                            </div>
                            <div class="d-flex w-100 justify-content-between w-160 ">
                                <div class="font-normal fs-6  w-160">Sàn/Mã</div>
                                <div class="font-semibold fs-6 command">109,095</div>
                            </div>
                        </div>
                        <div class="card-show-detailed-stock-information">
                            <div class="d-flex w-100 justify-content-between w-160 ">
                                <div class="font-normal fs-6  w-160">Ngành</div>
                                <div class="font-semibold fs-6 command">109,095</div>
                            </div>
                            <div class="d-flex w-100 justify-content-between w-160 ">
                                <div class="font-normal fs-6  w-160">Tỷ lệ tăng giá</div>
                                <div class="font-semibold fs-6">109,095</div>
                            </div>
                        </div>
                        <div class="card-show-detailed-stock-information">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="font-normal fs-6  w-160">Giá mục tiêu (VND)</div>
                                <div class="font-semibold fs-6">100</div>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <div class="font-normal fs-6">Giá hiện tại (VND)</div>
                                <div class="font-semibold fs-6">109,095</div>
                            </div>
                        </div>
                        <div class="card-show-detailed-stock-information">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="font-normal fs-6  w-160">Tổng tỷ suất lợi nhuận</div>
                                <div class="font-semibold fs-6">109,095</div>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <div class="font-normal fs-6  w-160">Suất sinh lời cổ tức ký vòng</div>
                                <div class="font-semibold fs-6">109,095</div>
                            </div>
                        </div>
                    </div> `;

}
let chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

showChartTreeMap();

