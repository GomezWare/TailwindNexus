// import dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Function to convert a timestamp to script using user timezone
 *
 * @param {*} unixTimestamp
 * @param {*} timeZone
 * @return {*}
 */
const convertUnixTimestampToLocalTime = (unixTimestamp, timeZone) => {
  // Convert UNIX timestamp to utc dayjs instance
  const utcTime = dayjs.unix(unixTimestamp).utc();

  // Convert time to user timezone
  const localTime = utcTime.tz(timeZone);

  // Format date in a ISO String to show the date properly
  const isoFormattedDate = localTime.format("YYYY-MM-DD HH:mm:ss");

  return isoFormattedDate;
};

export { convertUnixTimestampToLocalTime };
