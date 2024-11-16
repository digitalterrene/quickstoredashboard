import { useGlobalStates } from "@/context";
import { prepareSeriesDataWithGoals } from "@/utils/prepareSeriesDataWithGoals";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function ColumnChartWithMarkers({
  chartKeys,
  chartData,
  monthlyGoals,
}) {
  const { selectedAnalyicsMonth } = useGlobalStates();
  const preparedSeries = prepareSeriesDataWithGoals(
    chartData,
    chartKeys,
    monthlyGoals,
    selectedAnalyicsMonth
  );
  const [series, setSeries] = useState([]);
  useEffect(() => {
    setSeries(preparedSeries);
  }, [chartData, chartKeys, monthlyGoals, selectedAnalyicsMonth]);
  console.log({ series });

  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 600,
            },
          },
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [selectedAnalyicsMonth], // Set x-axis categories as the chart keys
    },

    yaxis: {
      show: false,
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      showForSingleSeries: true,
      customLegendItems: ["Actual", "Expected"],
      markers: {
        fillColors: ["#00E396", "#775DD0"],
      },
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="bar" height={325} />
    </div>
  );
}
