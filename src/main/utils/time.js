import {
  months,
  LAST_DAY_OF_LAST_MONTH,
  TWELVE_OCLOCK,
  SIX_PM_OCLOCK,
  DATE_STEP,
  MONTH_GAP,
  INVERT_TIME_ZONE,
  SECONDS_PER_MINUTE,
  MILISECONDS_PER_SECOND
} from '../constant/time';

const COMPARE_EQUAL = 0;
const DECIMAL = 10;

export const formatNumberDisplay = number => {
  return number < DECIMAL ? `0${number}` : `${number}`;
};

export const getOffsetMillis = () =>
  new Date().getTimezoneOffset() * INVERT_TIME_ZONE * SECONDS_PER_MINUTE * MILISECONDS_PER_SECOND;

export const formatDateDisplay = date => `${months[date.getMonth()]} ${formatNumberDisplay(date.getDate())}`;

export const formatFullDate = date =>
  `${formatNumberDisplay(date.getDate())}/${formatNumberDisplay(date.getMonth() + MONTH_GAP)}/${date.getFullYear()}`;

export const formatDateCallApi = date =>
  `${formatNumberDisplay(date.getMonth() + MONTH_GAP)}/${formatNumberDisplay(date.getDate())}/${date.getFullYear()}`;

export const formatDateScheduleCallApi = date =>
  `${formatNumberDisplay(date.getMonth() + MONTH_GAP)}/${formatNumberDisplay(date.getDate())}`;

export const getDateApi = day => {
  const { date, month, year } = day;

  return new Date(year, month - MONTH_GAP, date - MONTH_GAP);
};

export const compareDates = (date1, date2) => {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return COMPARE_EQUAL;
  }

  return date1 - date2;
};

export const isYesterday = date =>
  compareDates(
    new Date(),
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + DATE_STEP)
  ) === COMPARE_EQUAL;

export const isToday = date =>
  compareDates(
    new Date(),
    date
  ) === COMPARE_EQUAL;

export const isTomorrow = date =>
  compareDates(
    new Date(),
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - DATE_STEP)
  ) === COMPARE_EQUAL;

export const isMorning = time => {
  const hour = new Date(time).getHours();

  return hour < TWELVE_OCLOCK;
};

export const isAfternoon = time => {
  const hour = new Date(time).getHours();

  return hour >= TWELVE_OCLOCK && hour < SIX_PM_OCLOCK;
};

export const isEvening = time => {
  const hour = new Date(time).getHours();

  return hour >= SIX_PM_OCLOCK;
};

export const convertDailyTimePoint = (hour, minute) =>
  `${formatNumberDisplay(hour)}:${formatNumberDisplay(minute)}`;

export const getNumberOfDatesInMonth = date => {
  const nextMonth = date.getMonth() + MONTH_GAP;
  const thisYear = date.getFullYear();

  const lastDateOfLastMonth = new Date(thisYear, nextMonth, LAST_DAY_OF_LAST_MONTH);

  return lastDateOfLastMonth.getDate();
};

export const getNumberOfDatesInLastMonth = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const lastDateOfLastMonth = new Date(thisYear, thisMonth, LAST_DAY_OF_LAST_MONTH);

  return lastDateOfLastMonth.getDate();
};
