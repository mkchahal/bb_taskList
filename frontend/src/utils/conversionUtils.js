export const updateDateFormat = (timestamp) => {
  const dateVal = new Date(timestamp);
  return `${dateVal.toLocaleTimeString()} ${dateVal.toLocaleDateString()}`; // use moment.js instead
};
