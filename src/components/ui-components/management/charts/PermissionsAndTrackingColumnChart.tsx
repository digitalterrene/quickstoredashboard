import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
function formatKey(key: any) {
  return key
    ?.replaceAll("visit", "")
    ?.replaceAll("view", "")
    ?.replaceAll("information", "")
    .split("_")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export default function PermissionsAndTrackingColumnChart({
  tab,
  data,
  categories,
}: any) {
  const [series, setSeries] = useState([
    {
      name: tab,
      data: data,
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: tab,
        data: data,
      },
    ]);
  }, [data, tab]);

  const formattedCategories = categories.map(formatKey);
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: { show: false },
    plotOptions: {
      bar: {
        columnWidth: "70%",
        borderRadius: 4,
        horizontal: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        style: {
          fontSize: "10px", // Make y-axis labels small
        },
      },
    },
    xaxis: {
      categories: formattedCategories,
      labels: {
        style: {
          fontSize: "10px", // Make x-axis labels small
        },
      },
      tooltip: { enabled: false },
    },
    tooltip: {
      y: {
        formatter: (value: any) => {
          return `${value}`;
        },
        style: {
          textTransform: "capitalize",
          fontSize: "10px", // Make tooltip text small
        },
      },
    },
    // legend: {
    //   show:true,
    //   labels: {
    //     style: {
    //       fontSize: "10px", // Make legend text small
    //     },
    //   },
    // },
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={320}
      />
    </div>
  );
}
