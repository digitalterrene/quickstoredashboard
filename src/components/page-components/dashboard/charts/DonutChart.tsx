"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
export default function DonutChart() {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    legend: {
      show: false,
    },
  });

  const [series, setSeries] = useState([44, 55, 41, 17, 15]);
  return (
    <div className="w-72 mx-auto ">
      <Chart options={options} series={series} type="donut" height={320} />
    </div>
  );
}
