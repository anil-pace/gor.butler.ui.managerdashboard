import moment from 'moment';
import 'moment-timezone';

export function checkMomentCalendar(timeOffset, createdOnDate, locale) {
  moment.locale(locale);
  const dateToBeChecked = moment.utc(createdOnDate).tz(timeOffset);
  return (
    dateToBeChecked.calendar(null, {
      lastDay: '[Yesterday][,]hh:mm',
      sameDay: '[Today][,]hh:mm',
      lastWeek: 'DD MMM YYYY, h:mm',
      sameElse: 'DD MMM YYYY, h:mm'
    }) || '--'
  );
}
