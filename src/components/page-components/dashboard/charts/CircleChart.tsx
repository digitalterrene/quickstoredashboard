"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
export default function CircleChart() {
  var options = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: ["Cricket"],
  };
  const [series, setSeries] = useState([70]);
  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      className="border w-72 shadow-lg flex items-center justify-center   p-6 rounded-lg"
      height={320}
    />
  );
}
