"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
export default function PermissionsColumnChartCopy({
  _name_,
  permissions,
}: any) {
  const [series, setSeries] = useState([
    {
      name: _name_,
      data: permissions,
    },
  ]);
  var options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false, //removes horizontal lines
    },

    plotOptions: {
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
      toolbar: {
        show: false,
      },
      bar: {
        columnWidth: "70%",
        horizontal: false,
        borderRadius: 4,
        borderTopRadius: 6,
        toolbar: {
          show: false,
        },
      },

      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
    },
    yaxis: {
      lines: {
        show: false, //fghtyh
      },
      show: false, //removes th evertical line
    },
    xaxis: {
      categories: ["df", "wef", "dfwser", "gedrt"], // Set x-axis categories as the chart keys
      tooltip: {
        enabled: false,
      },
      lines: {
        show: false, //fghtyh
      },
    },
  };

  return (
    <div>
      {" "}
      <Chart
        options={options}
        series={series}
        type="bar"
        plotOptions={{
          bar: {
            horizontal: false,
            columnWidth: "55%",
            // endingShape: "rounded",
          },
        }}
        width={"100%"}
        height={320}
      />
    </div>
  );
}
