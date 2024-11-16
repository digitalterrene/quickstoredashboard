import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function ColumnChart({ chart_keys, chart_data }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries(chart_data);
  }, [chart_data]);

  const options = {
    dataLabels: {
      enabled: false,
    },
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              textTransform: "capitalize",
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
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={395} />
    </div>
  );
}
