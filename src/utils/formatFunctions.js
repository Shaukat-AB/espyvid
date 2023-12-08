import moment from "moment/min/moment.min";

const formatCount = (count) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(count || 0);

const formatDate = (date) => moment(date).fromNow();

const formatDuration = (duration) => {
  const seconds = moment.duration(duration).asSeconds();
  const utcDuration = moment.utc(seconds * 1000).format("mm:ss");
  return utcDuration;
};

export { formatCount, formatDate, formatDuration };
