export function formatDate(date) {
  const dateFormatted = new Date(date);
  const year = dateFormatted.getFullYear();
  const month = dateFormatted.getMonth();
  const day = dateFormatted.getDate();
  return `${year}-${month}-${day}`;
}

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
