export const formatDate = (isoString: string | undefined): string => {
  if (!isoString) return "Invalid date";
  const date = new Date(isoString);
  return date.toLocaleDateString(); // or use toLocaleString() for more detail
};
