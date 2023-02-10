const relativeTime = (oldTimestamp) => {
  const timestamp = new Date().getTime();
  const seconds = Math.floor(timestamp / 1000);

  const difference = seconds - oldTimestamp;
  let output = ``;
  if (difference === 0 || !difference) {
    output = `1 second ago`;
  } else if (difference < 60) {
    // Less than a minute has passed:
    output = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 7200) {
    // Less than 2 hours has passed:
    output = `${Math.floor(difference / 3600)} hour ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 172800) {
    // Less than 2 days has passed:
    output = `${Math.floor(difference / 86400)} day ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 5241600) {
    // Less than 2 months has passed:
    output = `${Math.floor(difference / 2620800)} month ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`;
  }
  return output;
};

export default relativeTime;
