"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
export default function ColumnChartWithMarkersCopy() {
  const [series, setSeries] = useState([
    {
      name: "Actual",
      data: [
        {
          x: "2011",
          y: 1292,
          goals: [
            {
              name: "Expected",
              value: 1400,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
              borderRadius: 10,
            },
          ],
        },
        {
          x: "2012",
          y: 4432,
          goals: [
            {
              name: "Expected",
              value: 5400,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2013",
          y: 5423,
          goals: [
            {
              name: "Expected",
              value: 5200,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2014",
          y: 6653,
          goals: [
            {
              name: "Expected",
              value: 6500,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2015",
          y: 8133,
          goals: [
            {
              name: "Expected",
              value: 6600,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2016",
          y: 7132,
          goals: [
            {
              name: "Expected",
              value: 7500,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2017",
          y: 7332,
          goals: [
            {
              name: "Expected",
              value: 8700,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
        {
          x: "2018",
          y: 6553,
          goals: [
            {
              name: "Expected",
              value: 7300,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
            },
          ],
        },
      ],
    },
  ]);
  var options = {
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
        columnWidth: "60%",
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
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
      categories: [
        "jkk",
        "r",
        "asfde",
        "gyutg",
        "dfgrtd",
        "dfgrsdftd",
        "dfgsedtd",
        "drgdrt",
      ],
    },
    yaxis: {
      show: false,
      marks: {
        show: false,
      },
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
    <div className="  w-full">
      <Chart options={options} series={series} type="bar" height={325} />
    </div>
  );
}
