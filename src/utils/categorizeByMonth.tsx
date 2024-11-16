export function categorizeByMonth(entries: any) {
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

  return entries?.reduce((acc: any, entry: any) => {
    const date = new Date(entry?.created_at);
    const monthName = monthNames[date?.getMonth()];

    if (!acc[monthName]) {
      acc[monthName] = [];
    }

    acc[monthName]?.push(entry);
    return acc;
  }, {});
}
