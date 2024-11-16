import { categorizeByMonth } from "./categorizeByMonth";

export const prepareSeriesDataWithGoals = (
  data: any,
  chartKeys: any,
  monthlyGoals: any,
  selectedMonth: any
) => {
  // Categorize data by month for each key
  const categorizedData = chartKeys?.reduce((acc: any, key: any) => {
    acc[key] = categorizeByMonth(data[key]);
    return acc;
  }, {});
  // Prepare series data for the selected month
  const seriesData = chartKeys?.map((key: any) => {
    const actualCount = categorizedData[key][selectedMonth]
      ? categorizedData[key][selectedMonth].length
      : 0;
    const expectedCount = monthlyGoals[key][selectedMonth] || 0;
    // if the key
    return {
      name: key,
      data: [
        {
          x: key, // Set x value as the chart key
          y: actualCount,
          goals: [
            {
              name: "Expected",
              value: expectedCount,
              strokeHeight: 5,
              strokeWidth: 14,
              strokeLineCap: "round",
              strokeColor: "#775DD0",
              borderRadius: 10,
            },
          ],
        },
      ],
    };
  });
  return seriesData;
};
