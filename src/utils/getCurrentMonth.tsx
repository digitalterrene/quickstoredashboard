export const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const monthShortNames = [
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
  return monthShortNames[currentMonthIndex];
};
