export function checkIfToday(timeOffset, createdOnDate) {
  let todayDate = moment.tz(timeOffset).format('DD/MM/YYYY');

  const dateToBeChecked = moment
    .utc(createdOnDate)
    .tz(timeOffset)
    .format('DD/MM/YYYY');

  if (dateToBeChecked === todayDate) {
    return (
      'Today, ' +
        moment
          .utc(datum.createdOn)
          .tz(timeOffset)
          .format('h:mm') || '--'
    );
  } else {
    return (
      moment
        .utc(datum.createdOn)
        .tz(timeOffset)
        .format('DD MMM YYYY, h:mm') || '--'
    );
  }
}
