// import { categorizeByMonth } from "./categorizeByMonth";

// export const prepareChartData = (data: any, chartKeys: any) => {
//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // Categorize data by month for each key
//   const categorizedData = chartKeys?.reduce((acc: any, key: any) => {
//     acc[key] = categorizeByMonth(data[key]);
//     return acc;
//   }, {});

//   // Prepare chart data
//   const chartData = chartKeys?.map((key: any) => {
//     const monthlyCounts = monthNames?.map((month) =>
//       categorizedData[key][month] ? categorizedData[key][month]?.length : 0
//     );
//     return {
//       name: key,
//       data: monthlyCounts,
//     };
//   });

//   return chartData;
// };
import { categorizeByMonth } from "./categorizeByMonth";

export const prepareChartData = (data: any, chartKeys: any) => {
  const monthNames = [
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
  ];

  // Categorize data by month for each key
  const categorizedData = chartKeys?.reduce((acc: any, key: any) => {
    acc[key] = categorizeByMonth(data?.[key] || []);
    return acc;
  }, {});

  // Prepare chart data
  const chartData = chartKeys?.map((key: any) => {
    const monthlyCounts = monthNames?.map(
      (month) => (categorizedData?.[key]?.[month] || []).length
    );
    return {
      name: key,
      data: monthlyCounts,
    };
  });

  return chartData;
};
