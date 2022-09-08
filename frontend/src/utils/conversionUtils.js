import moment from "moment";

export const updateDateFormat = (timestamp) => {
  return moment(timestamp, moment.ISO_8601).format('LT L');
};

