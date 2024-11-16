"use client";
import React from "react";
import { Chart } from "react-google-charts";

export function WorldMap({
  stats,
  selectedChartData,
}: {
  stats: any;
  selectedChartData: string;
}) {
  const chartData = [
    ["Country", selectedChartData?.replaceAll("_", " ")],
    ...Object?.entries(stats),
  ];
  console.log({ stats });
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = chartData[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={chartData}
    />
  );
}
