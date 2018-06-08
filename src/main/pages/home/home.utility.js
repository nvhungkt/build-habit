const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const COMPARE_EQUAL = 0;
const DATE_STEP = 1;

export const formatDate = date => `${date.getDate()} ${months[date.getMonth()]}`;

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

export const isYesterday = date => {
  return compareDates(
    new Date(),
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + DATE_STEP)
  ) === COMPARE_EQUAL;
};

export const isToday = date => {
  return compareDates(
    new Date(),
    date
  ) === COMPARE_EQUAL;
};

export const isTomorrow = date => {
  return compareDates(
    new Date(),
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - DATE_STEP)
  ) === COMPARE_EQUAL;
};
