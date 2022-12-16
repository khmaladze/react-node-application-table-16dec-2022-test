import React from "react";
import ApexCharts from "apexcharts";
import { IUser, useTableStore } from "../../store/tableStore";

const Chart: React.FC = () => {
  const table = useTableStore((state) => state.table);
  const citys = table.map((row: IUser) => row.address && row.address.city);
  const uniqueCity = [...new Set(citys)];
  const cityLabels = uniqueCity.map((row: any) => row);
  const counts: any = {};
  const citysArray: any = citys;
  citysArray.forEach(function (x: any) {
    counts[x] = (counts[x] || 0) + 1;
  });
  const optionsSeriesArray = [];
  for (const [key, value] of Object.entries(counts)) {
    optionsSeriesArray.push(Number(`${value}`));
  }
  const cityValues = optionsSeriesArray;

  const options = {
    series: cityValues,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: cityLabels,
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 700,
          },
          legend: {
            position: "bottom",
          },
        },
      },

      {
        breakpoint: 480,
        options: {
          chart: {
            width: 1200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  return <div id="chart"></div>;
};

export default Chart;
